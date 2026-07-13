"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  return (
    <Card className="[width:100%] [max-width:400px] [padding:8px] [padding-bottom:16px]">
      <CardHeader>
        <CardTitle className="[font-size:20px] [font-weight:600] [padding:16px]">Login to your account</CardTitle>
        <CardDescription className="[font-size:14px] [padding-bottom:16px] [padding-top:16px]">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="[padding:16px]">
        <div className="flex flex-col [gap:16px]">
          <div className="flex flex-col [gap:8px]">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              required
              className="[width:100%] [padding:12px] [font-size:16px] [font-weight:400] [box-sizing:border-box]"
            />
          </div>
          <div className="flex flex-col [gap:8px]">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="[font-size:14px] underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required className="[width:100%] [padding:12px] [font-size:16px] [font-weight:400] [box-sizing:border-box]" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col [gap:12px] [padding-top:16px]">
        <Button type="submit" className="[width:100%] [padding:12px] [font-size:16px] [font-weight:600]">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}