import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";

type ServiceCardProps = {
    title: string;
    description: string;
    price: string;
    onClick?: () => void;
    selectedService?: boolean;
}

export default function ServiceCard( { title, description, price, onClick, selectedService } : ServiceCardProps) {
  return (
    <Card onClick={onClick} className={`bg-[#DEE2E6] [width:250px] [min-height:100px] [padding:16px] rounded-sm transition-transform hover:[transform:scale(1.05)] cursor-pointer ${selectedService ? "[border:2px_solid_#80ed99] [transform:scale(1.05)]" : ""}`}>
      <CardHeader className="[padding:24px]">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="bg-[#DEE2E6] flex justify-between items-center [padding:24px]">
        <p className="text-[#111821] text-2xl font-bold text-center">${price}</p>
      </CardFooter>
    </Card>

  )
}