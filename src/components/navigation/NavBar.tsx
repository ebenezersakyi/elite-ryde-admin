"use client"
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../assets/images/logo.svg";
import { Icon } from "@iconify/react";
import { Iicon, menuItems } from "@/utils";
import NavTile from "./components/NavTile";
export default function NavBar() {
    const pathName = usePathname()
    console.log("Pathname: ",pathName);
    
  return (
    <div className="col-span-3 p-8 grid grid-rows-6 h-[100vh] sticky top-0 bottom-0">
      <Image src={logo} alt="logo" width={200} height={200}  />

      <div className="  row-span-6 self-center flex flex-col gap-6 pb-8 ">

        {menuItems.map(({ title, icon, link }: Iicon) => {
            const active = pathName == link
          return <NavTile title={title} icon={icon} link={link} active={active} key={title}/>;
        })}
      </div>

      <span className="flex items-center gap-4 w-[100%] cursor-pointer rounded-sm p-2 hover:bg-slate-100 duration-500  outline-[1px] border-slate-200">
        <Icon icon='material-symbols:logout-sharp' width={20} />
        <p className="text-[1.1rem] font-[200]">Log out</p>
      </span>
    </div>
  );
}
