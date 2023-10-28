import { Icon } from "@iconify/react";
import { InfoCardProps } from "@/utils";
import { useRouter } from "next/navigation";

export default function InfoCard({title, icon, value}:InfoCardProps) {
  const router = useRouter()

  const onClick = () => {
    switch (title) {
      case "Vendors":
        router.push('/dashboard/vendors')
        // console.log("You selected Dashboard");
        break;
        case "Users":
        router.push('/dashboard/users')
        // console.log("You selected Vendors");
        break;
      case "Cars":
        router.push('/dashboard/cars')
        // console.log("You selected Users");
        break;
      default:
        console.log("Title not found");
    }    
  }

  return (
    <div className="rounded-lg p-4 flex flex-col gap-3 bg-slate-100 cursor-pointer" onClick={onClick}>
      <Icon icon={icon} className="self-end" width={30}/>
      <p className="text-[1.15rem] font-[200]">{title}</p>
      <p className="text-[1.4rem] font-[500]">{value}</p>
    </div>
  );
}
