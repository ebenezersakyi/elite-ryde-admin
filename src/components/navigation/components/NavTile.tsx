'use client'
import { useRouter } from "next/navigation";
import { Iicon } from "@/utils";
import { Icon } from "@iconify/react";
export default function NavTile({ title, icon, link, active }: Iicon) {
  const router = useRouter()
  return (
    <div className={`flex items-center w-[100%] rounded-sm  p-2 gap-4 cursor-pointer hover:bg-slate-100 duration-500 ${active && 'bg-slate-100 '}`} onClick={() => {
        router.push(link)
    }}>
      <Icon icon={icon} width={25} className={`${active ? 'text-black': 'text-black/40'}`} />
      <p className={`text-[1.1rem] font-[300] ${active ? 'text-black': 'text-black/40'}`}>{title}</p>
    </div>
  );
}
