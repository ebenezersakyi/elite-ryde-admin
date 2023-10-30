"use client"
import Table from "@/components/shared/tables/Table";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchFeedback from "@/hooks/useFetchFeedback";
import { useRouter } from "next/navigation";
import useFetchCars from "@/hooks/useFetchApprovals";
import { useEffect, useState } from "react";
import TableHeader from "@/components/shared/tables/components/TableHeader";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function UserFeedbackPage() {
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
  const router = useRouter();
  const {approvals, setApprovalsFunc, vendors} = useData()

  const {loading, error, data} = useFetchFeedback()

  const sorted = data?.sort((a: any, b: any) => {
    return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
  })


//   useEffect(() => {
//     console.log('useFetchApprovals', data)

// }, [data])



  
  if(loading ){
    return <Spinner/>
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
        "User",
        "Subject",
        "Date",
        "Message",
      ]} />

      {sorted?.map((item:any, index:any) => {
        const createdOnDate = new Date(item.createdAt);
        const formattedDate = `${createdOnDate.getFullYear()}-${String(createdOnDate.getMonth() + 1).padStart(2, '0')}-${String(createdOnDate.getDate()).padStart(2, '0')}`;
        const formattedTime = `${String(createdOnDate.getHours()).padStart(2, '0')}:${String(createdOnDate.getMinutes()).padStart(2, '0')}:${String(createdOnDate.getSeconds()).padStart(2, '0')}`;
        return(
            <div
                key={index}
                // onClick={() => {
                // router.push(`approvals/${item.type}/?id=${item._id}`)
                // }}
                style={{
                gridTemplateColumns: `repeat(${4}, 1fr)`
                }}
                className={`w-full grid ${
                "grid-cols-" + 4
                } my-[10px] p-[10px] border-[2px] rounded-lg relative`}
            >
                <div className="flex">
                    <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{item?.name?.charAt(0).toUpperCase()}</span>
                    <div className="ml-[5px] flex-col justify-center items-center">
                        <p className="flex">{item.name} </p>
                        <p className="text-[10px] text-black">{item?.email}</p>
                    </div>
                </div>

                <div className="flex">
                    <span className="bg-[#5d7499] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                        <Icon icon={`mdi:question-mark`} width={25} className={'text-white'} />
                    </span>
                    <div className="ml-[5px] flex-col flex justify-center items-center">
                        <p>{item.subject}</p>
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

                <div 
                    className="flex p-[10px] cursor-pointer rounded-full text-green-800 bg-green-100 text-[14px] justify-center items-center"
                    onClick={() => {
                        setShowMessage(true);
                        setMessage(item.message)
                    }}
                >
                    View Message
                </div>

            </div>
        )
      })}

      </div>
      {showMessage && (
        <div 
            className="fixed flex top-0 left-0 h-full w-full bg-black bg-opacity-80 justify-center items-center" 
            // onClick={() => setSelectedCar({})}
        >
            <span 
                className="absolute top-[10px] cursor-pointer right-[10px] bg-white text-black flex justify-center items-center p-[10px] rounded-full"
                onClick={() => {setShowMessage(false); setMessage('')}}
            >
                X
            </span>
            <div className="flex flex-col bg-white shadow-lg rounded-lg w-[600px] h-[90%] p-[20px] justify-between ">
                <span className="text-[20px] text-black text-left"><p className="text-gray-500 italic text-[10px]">Message: <br/></p>{message}</span>
                <textarea className=" w-[100%] h-[100%] mt-[20px] p-[10px] border-[1px] border-black rounded-lg" placeholder="Please type your message here..." />
                <button className="flex p-[10px] w-[100%] justify-center items-center bg-green-700 text-white mt-[15px] rounded-lg">
                    Send reply
                </button>
            </div>

        </div>
      )}
    </div>
  );
}
