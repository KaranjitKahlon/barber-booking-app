import BookCalendar from "@/components/BookCalendar";
import ServiceCard from "@/components/ServiceCard";



export default function BookingPage() {
    return (
        <main className="">
            <section className="flex flex-col items-center text-center [padding:60px_24px]">
                <h1>Services</h1>
                <h2>Book your preferred service.</h2> { /*going to change the title, desc, price from text to variables, interpolation*/ }
                <div className="flex flex-col md:flex-row [gap:24px] mt-8">
                    <ServiceCard title="Haircut With Beard (1 hr)" description="Professional hair cutting service" price="45.00" />
                    <ServiceCard title="Haircut (45 min)" description="Clean fade with precise blending" price="40.00" />
                    <ServiceCard title="Beard Shape Up (20 min)" description="Shape and trim your beard" price="25.00" />
                </div>
            </section>

            <section className="flex flex-col items-center text-center [padding:60px_24px]">
                <h2>Choose Date and Time</h2>
                <BookCalendar className="[transform:scale(1.4)] [margin-top:32px]" />
            </section>
        </main>
    )
}