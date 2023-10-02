"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
export default function TableRow({
  cols,
  data,
  next,
  id = '1',
  clickable
}: {
  cols: number;
  data: string[] | null;
  next?: string;
  id?: string
  clickable?: boolean
}) {


  const router = useRouter()
  
  return (
    <div
    onClick={() => {
      if(clickable){
        router.push(`dashboard/approvals/${next}?id=${id}`)
      }
    }}
    style={{
      gridTemplateColumns: `repeat(${cols}, 1fr)`
    }}
      className={`w-full grid ${
        "grid-cols-" + cols
      } border-b-[1px] border-l-[1px] border-r-[1px] py-2 cursor-pointer relative`}
    >
      {data?.map((elem, inx) => {
        return (
          <p className="pl-5 font-[200]" key={inx}>
            {elem}
          </p>
        );
      })}
      <Icon icon="bi:three-dots-vertical" className="absolute right-0 top-3" />
    </div>
  );
}
