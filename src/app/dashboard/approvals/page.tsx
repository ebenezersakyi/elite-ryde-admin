"use client"
import Table from "@/components/shared/tables/Table";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchApprovals from "@/hooks/useFetchPendingApprovals";
import { useRouter } from "next/navigation";
import useFetchCars from "@/hooks/useFetchApprovals";
import { useEffect } from "react";
import TableHeader from "@/components/shared/tables/components/TableHeader";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ApprovalsPage() {
  const router = useRouter();
  const {approvals, setApprovalsFunc, vendors} = useData()
  // const {loading, error, data} = useFetchCars()
  const {loading, error, data} = useFetchApprovals()

  // if(data && data !== undefined){
  //   console.log('data-approvals', data)
  // }
  console.log('useFetchApprovals', data)

  const arrayOfObjects = [];


for (let key in data) {
  if (data.hasOwnProperty(key) && key !== "content") {
    arrayOfObjects.push(data[key]);
  }
}

const removeUndefined= arrayOfObjects.filter((item) => {
  return item !== undefined
}).sort((a: any, b: any) => {
  return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
})


useEffect(() => {
  if(removeUndefined[0]?.content){
    const contentObj = JSON.parse(removeUndefined[0]?.content?.replace(/\\n/g, '').replace(/\\"/g, '"'));
    console.log('removeUndefined', contentObj);
  }

  setApprovalsFunc(removeUndefined)
}, [data])

function convertSnakeCaseToTitleCase(inputString:any) {
  const words = inputString.split('_');
  const capitalizedWords = words.map((word:any) => word.charAt(0).toUpperCase() + word.slice(1));
  const titleCaseString = capitalizedWords.join(' ');
  return titleCaseString;
}

const getVendorNameAndEmail = (data: any) => {
  const vendorMatch = vendors?.filter((item:any) => {
    return item._id == data.vendorId
  })
  console.log('vendorMatch', data.vendorId, data)
  return {emai: vendorMatch?.flat(0)[0]?.email, firstName: vendorMatch?.flat(0)[0]?.firstName}
}



  
  if(loading || removeUndefined.length == 0){
    return <Spinner/>
  }

  if(error){
    // return <p>error: {error}</p>
  }
  return (
    <div className="flex flex-col w-full mt-[55px]">
      <div className="flex cursor-pointer" onClick={() => router.back()}>
        <Icon
          icon={'mdi:arrow-left'} width={25} className={'text-black'} />
        <span className="ml-2">back</span>
      </div>  
    <div className="mt-[25px] w-full overflow-x-scroll">
      <TableHeader titles={[
        "Details",
        "Approval type",
        "Date",
        "Location",
      ]} />
      {removeUndefined.map((item, index) => {
        const contentObj = JSON.parse(item.content?.replace(/\\n/g, '').replace(/\\"/g, '"'));

        const createdOnDate = new Date(item.createdOn);
        const formattedDate = `${createdOnDate.getFullYear()}-${String(createdOnDate.getMonth() + 1).padStart(2, '0')}-${String(createdOnDate.getDate()).padStart(2, '0')}`;
        const formattedTime = `${String(createdOnDate.getHours()).padStart(2, '0')}:${String(createdOnDate.getMinutes()).padStart(2, '0')}:${String(createdOnDate.getSeconds()).padStart(2, '0')}`;
        console.log('item',  contentObj)
        return(
          <div
            key={index}
            onClick={() => {
              router.push(`approvals/${item.type}/?id=${item._id}`)
            }}
            style={{
              gridTemplateColumns: `repeat(${4}, 1fr)`
            }}
            className={`w-full grid ${
              "grid-cols-" + 4
            } my-[10px] p-[10px] border-[2px] rounded-lg cursor-pointer relative`}
          >
            <div className="flex">
              {/* {contentObj.idImage || contentObj.photos? (
                <img src={contentObj.idImage || contentObj.photos[0]} alt="" className="w-[45px] h-[45px] rounded-full" />
              ) : ( */}
                <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{contentObj?.firstName?.charAt(0).toUpperCase()}</span>
              {/* )} */}
              <div className="ml-[5px] flex-col justify-center items-center">
                <p className="flex">{contentObj?.firstName || contentObj?.basicInformation?.make} {contentObj?.lastName || contentObj?.basicInformation?.model}</p>
                <p className="text-[10px] text-black">{contentObj?.email || contentObj?.basicInformation?.year}</p>
              </div>
            </div>

            <div className="flex">
              <span className="bg-[#5d7499] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                <Icon icon={`mdi:${item.type == 'add_car'? 'car':'account'}`} width={25} className={'text-white'} />
              </span>
              <div className="ml-[5px] flex-col flex justify-center items-center">
                <p>{convertSnakeCaseToTitleCase(item.type)}</p>
              </div>
            </div>

            <div className="flex">
              <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                <Icon icon={`mdi:calendar`} width={25} className={'text-white'} />
              </span>
              <div className="ml-[5px] flex-col flex justify-center ">
                <p className="text-[14px]">{formattedDate}</p>
                <p className="text-left text-[10px]">{formattedTime}</p>
              </div>
            </div>

            <div className="flex">
              <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                <Icon icon={`mdi:location`} width={25} className={'text-white'} />
              </span>
              <div className="ml-[5px] flex-col flex justify-center ">
                <p className="text-[14px]">{contentObj?.location || contentObj?.additionalInformation?.location}</p>
                {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
              </div>
            </div>
          </div>
        )
      })}


        {/* <Table
          titles={[
            "id",
            "Approval type",
            "Date",
            "Status",
          ]}
          approvalType={1}
          date={4}
          select={[0, 1, 4, 3]}
          data={removeUndefined}
          route={`approvals`}
          clickable={true}
        /> */}
    </div>
    </div>
  );
}
