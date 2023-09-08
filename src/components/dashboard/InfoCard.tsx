import { Icon } from "@iconify/react";
import { InfoCardProps } from "@/utils";
export default function InfoCard({title, icon, value}:InfoCardProps) {
  return (
    <div className="rounded-lg p-4 flex flex-col gap-3 bg-slate-100">
      <Icon icon={icon} className="self-end" width={25}/>
      <p className="text-[1.15rem] font-[200]">{title}</p>
      <p className="text-[1.4rem] font-[500]">{value}</p>
    </div>
  );
}
