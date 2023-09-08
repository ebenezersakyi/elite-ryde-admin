import Image from "next/image";
import arrow from "../../assets/icons/arrow.png";
export default function DropDown() {
  return (
    <span className="p-2 font-[200] border-[1px] inline-grid grid-cols-2 gap-4 w-max items-center">
      <select className="">
        <option value="Today">Today</option>
      </select>
      <Image
        src={arrow}
        width={15}
        alt="arrow"
        className="justify-self-end  inline-block"
      />
    </span>
  );
}
