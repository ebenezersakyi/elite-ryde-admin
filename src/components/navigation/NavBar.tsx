"use client"
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../assets/images/logo.svg";
import { Icon } from "@iconify/react";
import { Iicon, menuItems } from "@/utils";
import NavTile from "./components/NavTile";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function NavBar() {
  const [menuVisible, setMenuVisible] = useState(false);
    const pathName = usePathname()
    const router = useRouter()

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };

    
  return (
    <>
    <div className="hidden lg:flex flex-col col-span-2 p-8 grid grid-rows-6 h-[100vh] sticky top-0 bottom-0 items-center justify-center  ">
      <Image src={logo} alt="logo" width={170} priority className="absolute top-10" />

      <div className="  row-span-6 self-center flex flex-col gap-6 pb-8 ">

        {menuItems.map(({ title, icon, link }: Iicon) => {
            const active = pathName == link
          return <NavTile title={title} icon={icon} link={link} active={active} key={title}/>;
        })}
      </div>

      <a href="/api/auth/logout" className="flex self-end items-center gap-4 w-[100%] cursor-pointer rounded-sm p-2 hover:bg-slate-100 duration-500  outline-[1px] border-slate-200 mt-10" >
        <Icon icon='material-symbols:logout-sharp' width={20} />
        <p className="text-[1.1rem] font-[200]">Log out</p>
      </a>
    </div>

      <div onClick={toggleMenu} className="block absolute top-[25px] border-[1px] left-10 p-[10px] rounded-full lg:hidden">
        <Icon icon='material-symbols:menu' width={20} />
      </div>


      <div className={`lg:hidden flex flex-col col-span-2 p-8 grid grid-rows-6 h-[100vh] absolute top-0 bottom-0 z-10 bg-white items-center justify-center transition-transform transform ${menuVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div onClick={toggleMenu} className="block absolute top-[25px] border-[1px] left-10 p-[10px] rounded-full ">
          <Icon icon='material-symbols:close' width={20} />
        </div>      
        {/* <Image src={logo} alt="logo" width={170} priority className="absolute top-10" /> */}

        <div className="  row-span-6 self-center flex flex-col gap-6 pb-8 ">

          {menuItems.map(({ title, icon, link }: Iicon) => {
              const active = pathName == link
            return <NavTile title={title} icon={icon} link={link} active={active} key={title}/>;
          })}
        </div>

        <a href="/api/auth/logout" className="flex self-end items-center gap-4 w-[100%] cursor-pointer rounded-sm p-2 hover:bg-slate-100 duration-500  outline-[1px] border-slate-200 mt-10" >
          <Icon icon='material-symbols:logout-sharp' width={20} />
          <p className="text-[1.1rem] font-[200]">Log out</p>
        </a>
    </div>
    </>
  );
}
