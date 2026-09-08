import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) { // incoming http request
    const response = NextResponse.next() // continue the response unless something stops it from continuing
    const supabase = createServerClient( // make supabase client for the server side
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: { //cookies used for auth, keeps tabs on user session
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => 
                    response.cookies.set(name, value, options))
                }
            }
        }
    )

    const { data: { session } } = await supabase.auth.getSession() // get auth session from supabase, if there is one
    if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/availability')) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        else {
            return response
        }
    }
}

export const config = {
    matcher: ['/admin/:path*', '/availability/:path*'] // only run middleware on these paths
}

// note to self: middleware checks if user is auth from the server side and uses cookies to keep track of session, we use a basic conditional to check if there is a valid session from supabase or not and we route either to the login or let them continue.
