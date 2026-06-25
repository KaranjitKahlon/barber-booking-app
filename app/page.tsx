import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"




export default function Home() {
  return (
    <main className="">
      <section className="flex flex-col items-center text-center [padding:60px_24px]">
        <h1>Get Fresh Cuts</h1>
        <h2>Book your appointment with ease and style.</h2>
        <Button className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px]">Book Now</Button>
        </section>

      <section className="flex flex-col items-center text-center [padding:60px_24px]">
        <h1>Services</h1>
        <h2>Explore our range of premium barbering services.</h2> { /*going to change the title, desc, price from text to variables, interpolation*/ }
        <div className="flex flex-col md:flex-row [gap:24px] mt-8">
          <ServiceCard title="Haircut With Beard (1 hr)" description="Professional hair cutting service" price="45.00" />
          <ServiceCard title="Haircut (45 min)" description="Clean fade with precise blending" price="40.00" />
          <ServiceCard title="Beard Shape Up (20 min)" description="Shape and trim your beard" price="25.00" />
        </div>
        <Button className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:32px]">Book Now</Button>
        </section>

        <section className="flex flex-col items-center text-center [padding:60px_24px]">
        <h1>Hours & Location</h1>
        <h2>Check out our operating hours.</h2>
        <p className="mt-4 max-w-[600px]">Monday - Friday: 9:00 AM - 7:00 PM</p>
        <p className="mt-2 max-w-[600px]">Saturday: 9:00 AM - 5:00 PM</p>
        <p className="mt-2 max-w-[600px]">Sunday: Closed</p>
        <p className="mt-2 max-w-[600px]">1005 E Pescadero Ave #155, Tracy, CA 95304</p>
      </section>
        
        <section className="flex flex-col items-center text-center [padding:60px_24px]">
        <h1>About Us</h1>
        <h2>Discover the story behind our barbering expertise.</h2>
        <p className="mt-4 max-w-[600px]">At Fresh Cuts, we are passionate about delivering top-notch grooming experiences. Our skilled barbers combine artistry and precision to ensure you leave looking and feeling your best. With a commitment to quality and customer satisfaction, we strive to create a welcoming environment for all our clients.</p>
        <a href="https://www.instagram.com/jsl_barber" target="_blank" rel="noopener noreferrer">
          <Image src="/instagramiconwhite.png" alt="Instagram" width={32} height={32} />
        </a>
      </section>

    </main>
  );
}
