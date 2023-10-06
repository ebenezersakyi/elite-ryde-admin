"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function TableRow({
  cols,
  data,
  next,
  id = '1',
  subR = '1',
  clickable,
  route
}: {
  cols: number;
  data: string[] | null;
  next?: string;
  id?: string
  clickable?: boolean,
  route: string,
  subR?: string | any,
}) {


  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState('');

  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    setActiveMenuId(id)
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (action: string, event: React.MouseEvent) => {
    event.stopPropagation();     
    setIsMenuOpen(false); 
  };
  
  return (
    <div
    onClick={() => {
      if(clickable){
        if(route == 'users'){
          router.push(`${route}/user/?id=${id}`)
        }else if(route == 'vendors'){
          router.push(`${route}/vendor/?id=${id}`)
        }else if (route == 'approvals'){
          router.push(`${route}/${subR}/?id=${id}`)
        }
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
          <p className={`pl-5 font-[200] ${elem == 'Rejected' ? 'text-red-500' : elem == 'Pending'? 'text-yellow-500' : elem == 'Approved'? 'text-green-500' : 'text-black'  }`} key={inx}>
            {elem}
          </p>
        );
      })}
      <Icon icon="bi:three-dots-vertical" className="absolute right-0 top-3" onClick={(e) => handleMenuClick(e)}/>

      {activeMenuId == id && isMenuOpen && 
      <div className=" absolute right-3 top-1 bg-white shadow z-3">
          <div
            className="cursor-pointer hover:bg-gray-200 py-1 px-4 text-red-500 text-sm"
            onClick={(e) => handleMenuItemClick("delete", e)}
          >
            Disable
          </div>
        </div>
      }
    </div>
  );
}
