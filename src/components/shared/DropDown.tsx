import Image from "next/image";
import arrow from "../../assets/icons/arrow.png";
import { useState } from "react";
import { useData } from "@/contexts/DataContext";

export default function DropDown() {
  const [period, setPeriod] = useState('Today')
  const [menuOpen, setMenuOpen] = useState(false)

  const {updateFecentApprovalsFilter, recentApprovalsFilter} = useData()

  return (
    <div className="relative">
      <span 
        className="p-2 font-[200] border-[1px] inline-grid grid-cols-2 gap-4 w-max items-center"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="" >
          <span className="">{recentApprovalsFilter}</span>
        </span>
        {/* <select className="" >
          <option className="" value="Today">{period}</option>
        </select> */}
        <Image
          src={arrow}
          width={15}
          alt="arrow"
          className="justify-self-end  inline-block"
        />
      </span>
      {menuOpen && 
      <div className=" absolute top-10 bg-white shadow z-3">
        {filters.map((item, index) => {
          return(
            <div
            key={index}
              className="cursor-pointer hover:bg-gray-200 py-1 px-4 text-black text-sm"
              onClick={(e) => {
                setPeriod(item); 
                setMenuOpen(false);
                updateFecentApprovalsFilter(item)
              }}
            >
              {item}
            </div>
          )
        })}
        </div>
      }
    </div>
  );
}

const filters = [
  'Today', 'This week', 'All'
]
