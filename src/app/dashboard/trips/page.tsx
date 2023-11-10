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
import useFetchSessions from "@/hooks/useFetchSessions";
import Image from "next/image";
import arrow from "../../../assets/icons/arrow.png";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserFeedbackPage() {
  const [currentFilter, setCurrentFilter] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const [activeTrip, setActiveTrip] = useState(Object)
  const router = useRouter();
  const {approvals, setApprovalsFunc, vendors} = useData()
  
  const filters = ['All', 'Completed', 'On Going']

  const {loading, error, data} = useFetchSessions()

  console.log('data', data)

//   const sorted = data?.sort((a: any, b: any) => {
//     return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
//   })


  useEffect(() => {
    console.log('useFetchApprovals', data)

}, [data])

const DropDown = () => {
    return(
        <div className="relative z-10 ml-[20px]">
        <span 
          className="p-2 font-[200] border-[1px] inline-grid grid-cols-2 gap-4 w-max items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="" >
            <span className="">{currentFilter}</span>
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
        <div className=" absolute top-10 right-0 bg-white shadow z-3 gap-4 w-max">
          {filters.map((item, index) => {
            return(
              <div
              key={index}
                className="cursor-pointer hover:bg-gray-200 py-1 px-4 text-black text-sm"
                onClick={(e) => {
                    setCurrentFilter(item); 
                  setMenuOpen(false);
                //   updateFecentApprovalsFilter(item)
                }}
              >
                {item}
              </div>
            )
          })}
          </div>
        }
      </div>
    )
}


  
  if(loading ){
    return <Spinner/>
  }

  return (
    <div className="flex flex-col w-full mt-[55px]">

        <div className="justify-between flex">
            <div className="flex cursor-pointer" onClick={() => router.back()}>
                <Icon
                icon={'mdi:arrow-left'} width={25} className={'text-black'} />
                <span className="ml-2">back</span>
            </div>  
            <DropDown/>
        </div>

      <div className="mt-[25px] w-full overflow-x-scroll">
      <TableHeader titles={[
        "Vendor",
        "User",
        "Date",
        "Message",
      ]} />

      {data?.filter((item:any, index:any) => {
        if(currentFilter !== 'All'){
            return (item.status == currentFilter)
        }else{
            return item
        }
      }).map((item:any, index:any) => {
        const createdOnDate = new Date(item.pickupDate);
        const formattedDate = `${createdOnDate.getFullYear()}-${String(createdOnDate.getMonth() + 1).padStart(2, '0')}-${String(createdOnDate.getDate()).padStart(2, '0')}`;

        const createdOnDate2 = new Date(item.returnDate);
        const formattedDate2 = `${createdOnDate2.getFullYear()}-${String(createdOnDate2.getMonth() + 1).padStart(2, '0')}-${String(createdOnDate2.getDate()).padStart(2, '0')}`;

        return(
            <div
                key={index}
                onClick={() => {
                  setActiveTrip(item);
                  setShowPopUp(true)
                }}
                style={{
                gridTemplateColumns: `repeat(${4}, 1fr)`
                }}
                className={`w-full grid ${
                "grid-cols-" + 4
                } my-[10px] p-[10px] border-[2px] rounded-lg relative cursor-pointer`}
            >
                <div className="flex">
                    <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{item?.vendorName?.charAt(0).toUpperCase()}</span>
                    <div className="ml-[5px] flex-col justify-center items-center">
                        <p className="flex">{item.vendorName} </p>
                        <p className="text-[10px] text-black">{item?.vendorEmail}</p>
                    </div>
                </div>
                <div className="flex">
                    <span className="bg-[#5d7499] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{item?.vendorName?.charAt(0).toUpperCase()}</span>
                    <div className="ml-[5px] flex-col justify-center items-center">
                        <p className="flex">{item.userName} </p>
                        <p className="text-[10px] text-black">{item?.userEmail}</p>
                    </div>
                </div>

                <div className="flex">
                    <span className="bg-[#e6a43c] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                      <Icon icon={`mdi:calendar`} width={25} className={'text-white'} />
                    </span>
                    <div className="ml-[5px] flex-col flex justify-center ">
                      <p className="text-[14px]">{formattedDate} - </p>
                      <p className="text-left text-[14px]">{formattedDate2}</p>
                    </div>
                  </div>

                  <div className={`flex p-[5px] ${item.status == 'Completed'?'bg-green-100':'bg-orange-100'} items-center justify-center rounded-lg`}>
                    {/* <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                      <Icon icon={`mdi:calendar`} width={25} className={'text-white'} />
                    </span> */}
                    <div className="flex-col flex justify-center ">
                      <p className={`text-[14px] ${item.status == 'Completed'?'text-green-800':'text-orange-800'} text-[15px]`}>{item.status}</p>
                      {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
                    </div>
                  </div>

                {/* <div className="flex">
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
                </div> */}

            </div>
        )
      })}

      </div>
      {showPopUp && (
                <div 
                className="fixed flex top-0 left-0 z-10 h-full w-full bg-black bg-opacity-80 justify-center items-center" 
                // onClick={() => setSelectedCar({})}
            >
                <span 
                    className="absolute top-[10px] cursor-pointer right-[10px] bg-white text-black flex justify-center items-center p-[10px] rounded-full"
                    onClick={() => {setShowPopUp(false); setActiveTrip({})}}
                >
                    X
                </span>
                <div className="flex flex-col bg-white shadow-lg rounded-lg p-[20px] justify-between ">
                <Doughnut data={{
                  labels: ['Vendor', 'Elite Ryde'],
                  datasets: [
                    {
                      label: 'Amount (GHS)',
                      data: [activeTrip?.rentalPrice*0.9, activeTrip?.rentalPrice*0.1],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }} />
                <span className="text-[10px] text-gray-400">Amount:</span>
                <span className="text-[17px] text-black">GHS {activeTrip?.rentalPrice}</span>
                <span className="text-[10px] text-gray-400 mt-[10px]">Scope:</span>
                <span className="text-[17px] text-black">{activeTrip?.scope}</span>
                {/* <span className="text-[10px] text-gray-400 mt-[10px]">Scope:</span> */}
                {activeTrip?.selfDrive? (
                <span className="text-[17px] text-green-500 mt-[10px]">Self Drive</span>
                ) : (
                  <span className="text-[17px] text-green-500 mt-[10px]">Chauffeur Driven</span>
                )}
                    {/* <span className="text-[20px] text-black text-left"><p className="text-gray-500 italic text-[10px]">Message: <br/></p>{message}</span>
                    <textarea className=" w-[100%] h-[100%] mt-[20px] p-[10px] border-[1px] border-black rounded-lg" placeholder="Please type your message here..." />
                    <button className="flex p-[10px] w-[100%] justify-center items-center bg-green-700 text-white mt-[15px] rounded-lg">
                        Send reply
                    </button> */}
                </div>
    
            </div>
      )}
    </div>
  );
}
