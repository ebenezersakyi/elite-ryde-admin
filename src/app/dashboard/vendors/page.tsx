"use client"
import Table from "@/components/shared/tables/Table";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import TableHeader from "@/components/shared/tables/components/TableHeader";
import { useState } from "react";

const VendorsPage = () => {
  const [searchText, setSearchText] = useState('')
  const router = useRouter();
  const {data, loading, error} = useFetchData("vendors")
  const  {updateVendors}  = useData();

  if(loading){
    return <Spinner/>
  }
  if(error){
    return <p>Error: ${error}</p>
  }

  console.log('data', data)

  updateVendors(data)

  return (
    <div className="flex flex-col w-full mt-[55px]">
      
      <div className="flex items-center">
        <div className="flex cursor-pointer" onClick={() => router.back()}>
          <Icon
            icon={'mdi:arrow-left'} width={25} className={'text-black'} />
          <span className="ml-2">back</span>
        </div> 
        <input type="text" onChange={(e) => setSearchText(e.target.value)} placeholder="Search for a vendor" className="w-[100%] outline-none ml-[20px] border-[1px] border-gray-400 rounded-full p-[5px] px-[10px]" />
      </div>

      <div className="mt-[25px] w-full overflow-x-scroll">
        <TableHeader titles={[
          "Vendor",
          "Company",
          "Location",
          "TIN",
        ]} />

        {data?.filter((item:any, index: any) => {
          if(searchText.length == 0 || searchText == " "){
            return item
          }else{
            return `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchText.toLowerCase())
          }
        }).map((item: any, index: any) => {
          return (
            <div
              key={index}
              onClick={() => {
                router.push(`vendors/vendor/?id=${item._id}`)
              }}
              style={{
                gridTemplateColumns: `repeat(${4}, 1fr)`
              }}
              className={`w-full grid ${
                "grid-cols-" + 4
              } my-[10px] p-[10px] border-[2px] rounded-lg cursor-pointer relative`}
            >
              <div className="flex">
                {/* {contentObj.idImage || contentObj.photos? ( */}
                  {/* <img src={contentObj.idImage || contentObj.photos[0]} alt="" className="w-[45px] h-[45px] rounded-full" /> */}
                {/* ) : ( */}
                <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{item?.firstName?.charAt(0).toUpperCase()}</span>
                {/* )} */}
                <div className="ml-[5px] flex-col justify-center items-center">
                  <p className="flex">{item.firstName} {item.lastName}</p>
                  <p className="text-[10px] text-black">{item.email}</p>
                </div>
              </div>

              <div className="flex">
                <span className="bg-[#5d7499] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                  <Icon icon={`mdi:building`} width={25} className={'text-white'} />
                </span>
                <div className="ml-[5px] flex-col flex justify-center items-center">
                  <p>{item.companyName}</p>
                </div>
              </div>

              <div className="flex">
                <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                  <Icon icon={`mdi:location`} width={25} className={'text-white'} />
                </span>
                <div className="ml-[5px] flex-col flex justify-center ">
                  <p className="text-[14px]">{item.location}</p>
                  {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
                </div>
              </div>

              <div className="flex">
                <span className="bg-[#32a862] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                  <Icon icon={`mdi:pound`} width={25} className={'text-white'} />
                </span>
                <div className="ml-[5px] flex-col flex justify-center ">
                  <p className="text-[14px]">{item.tin}</p>
                  {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
                </div>
              </div>

            </div>
          )
        })}
      </div>
 


      {/* <Table
        titles={["Company Name", "Location", "Name",  "TIN"]}
        select={[1,2, 4, 7]}
        data={data}
        route="vendors"
        clickable={true}
      /> */}
    </div>
  );
};

export default VendorsPage;
