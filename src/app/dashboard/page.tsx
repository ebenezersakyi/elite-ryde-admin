"use client";
import InfoCard from "@/components/dashboard/InfoCard";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import DropDown from "@/components/shared/DropDown";
import Table from "@/components/shared/tables/Table";
import { InfoCardItems, InfoCardProps } from "@/utils";
import useFetchCars from "@/hooks/useFetchApprovals";
import useFetchStats from "@/hooks/useFetchStats";
import Spinner from "@/components/spinner/Spinner";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useData } from "@/contexts/DataContext";
import TableHeader from "@/components/shared/tables/components/TableHeader";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ToastContainer } from "react-toastify";
import useFetchSessions from "@/hooks/useFetchSessions";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashBoard() {
  const [infoCardItems, setInfoCardItems] = useState()
  const [showTransactions, setShowTransactions] = useState(false)
  const { loading, error, data } = useFetchCars();
  const stats = useFetchStats();
  const users = useFetchData("users")
  const vendors = useFetchData("vendors")
  const cars = useFetchCars()
  const sessionData = useFetchSessions()

  const {recentApprovalsFilter} = useData()

  const { user, isLoading } = useUser();

  if (loading || users.loading || vendors.loading) {
    return <Spinner/>
  }

  if (error) {
    // return <p>error: {error}</p>
  }

  // console.log('dash', data)

  const totalRentalPrice = sessionData?.data?.reduce((total:any, rental:any) => {
    return total + rental.rentalPrice;
  }, 0);

  const chartData = {
    labels: ['Vendor', 'Elite Ryde'],
    datasets: [
      {
        label: 'Amount (GHS)',
        data: [totalRentalPrice*0.9, totalRentalPrice*0.1],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const sorted = data?.sort((a: any, b: any) => {
    return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
  });
  

  function convertSnakeCaseToTitleCase(inputString:any) {
    const words = inputString.split('_');
    const capitalizedWords = words.map((word:any) => word.charAt(0).toUpperCase() + word.slice(1));
    const titleCaseString = capitalizedWords.join(' ');
    return titleCaseString;
  }

  const filter = (data:string) => {
    const dateString = data;
    const date = new Date(dateString);

    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const isThisWeek = date >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()) &&
      date <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));

    if (isToday) {
      // console.log("The date is today.");
      return 'Today'
    } else if (isThisWeek) {
      // console.log("The date is within this week.");
      return 'This week'
    } else {
      // console.log("The date is neither today nor this week.");
      return 'All'
    }
  }

  // const filterVar = data?.filter((item:any) => {
  //   return filter(item.createdOn)
  // })
  const filterVar = sorted
  ?.filter((item: any) => {
    return item.status === recentApprovalsFilter;
  })


  // const approvalHistory = recentApprovalsFilter !== 'All'? filterVar.flat(1) : data
  const approvalHistory = recentApprovalsFilter !== 'All'? filterVar.flat(1) : sorted
  console.log('approvalHistory', approvalHistory)
  // console.log(`recentApprovalsFilter !== 'All'? filterVar.flat(1) : data}`, recentApprovalsFilter !== 'All'? filterVar.flat(1) : data})


  return (
    <>
          {/* <ToastContainer/> */}
      <div className="w-full">
        <div className=" absolute right-2 top-[25px] ">
          <div className="flexjustify-center items-center">
            <img src={`${user?.picture}`} alt="" className="h-10 w-10 rounded-full" />
            {/* <span className="text-gray-900 ml-2">{user?.nickname}</span> */}
          </div>
        </div>
        <div className="">

          <div className="w-full grid grid-cols-4 gap-2 py-4 mt-[35px]">
            {users.data && 
              <InfoCard
                title={'Users'}
                icon={'mdi:users'}
                value={users.data.length}
              />
            }
            {vendors.data && 
              <InfoCard
                title={'Vendors'}
                icon={'mdi:account'}
                value={vendors.data.length}
              />
            }
            {cars.data && 
              <InfoCard
                title={'Cars'}
                icon={'mdi:car'}
                value={vendors.data.length}
              />
            }
            {sessionData.data && (
              <div onClick={() => setShowTransactions(true)}>
                <InfoCard
                  title={'Transactions'}
                  icon={'mdi:bank-transfer'}
                  value={totalRentalPrice.toLocaleString()}
                />
              </div>
              )
            } 


            {/* {InfoCardItems.map(({ title, icon, value }: InfoCardProps) => {
              return (
                <InfoCard
                  title={title}
                  icon={icon}
                  value={0 || stats?.data?.[value]}
                  key={title}
                />
              );
            })} */}
          </div>
        </div>
        <div className="pt-[3rem] w-full">
          <div className="flex justify-between">
            <p className="text-[1.35rem] mb-4">Approval History</p>
            <DropDown />
          </div>

          <div className="mt-[25px] w-full overflow-x-scroll">
            <TableHeader titles={["id", "Approval type", "Date", "Status"]} />

            {approvalHistory?.filter((item:any) => {return item.status !== 'Pending'}).flat(0).map((item: any, index: any) => {
              const createdOnDate = new Date(item.createdOn);
              const formattedDate = `${createdOnDate.getFullYear()}-${String(createdOnDate.getMonth() + 1).padStart(2, '0')}-${String(createdOnDate.getDate()).padStart(2, '0')}`;
              const formattedTime = `${String(createdOnDate.getHours()).padStart(2, '0')}:${String(createdOnDate.getMinutes()).padStart(2, '0')}:${String(createdOnDate.getSeconds()).padStart(2, '0')}`;
              const contentObj = JSON.parse(item.content?.replace(/\\n/g, '').replace(/\\"/g, '"'));
              return (
                <div
                  key={index}
                  style={{
                    gridTemplateColumns: `repeat(${4}, 1fr)`
                  }}
                  className={`w-full grid ${
                    "grid-cols-" + 4
                  } my-[10px] p-[10px] border-[2px] rounded-lg cursor-pointer relative`}
                >
                  <div className="flex">
                    <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                      <Icon icon={`mdi:pound`} width={25} className={'text-white'} />
                    </span>
                    <div className="ml-[5px] flex-col flex justify-center ">
                      {/* <p className="text-left text-[10px]">{format</p> */}
                      <p className="text-[12px]">{item._id}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <span className="bg-[#5d7499] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                      <Icon icon={`mdi:${item.type == 'add_car'? 'car': item.type == 'book_ride'? 'book' : 'account'}`} width={25} className={'text-white'} />
                    </span>
                    <div className="ml-[5px] flex-col flex justify-center items-center">
                      <p>{convertSnakeCaseToTitleCase(item.type)}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <span className="bg-[#e6a43c] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                      <Icon icon={`mdi:calendar`} width={25} className={'text-white'} />
                    </span>
                    <div className="ml-[5px] flex-col flex justify-center ">
                      <p className="text-[14px]">{formattedDate}</p>
                      <p className="text-left text-[10px]">{formattedTime}</p>
                    </div>
                  </div>

                  <div className={`flex p-[5px] ${item.status == 'Rejected'?'bg-red-100':'bg-green-100'} items-center justify-center rounded-lg`}>
                    {/* <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                      <Icon icon={`mdi:calendar`} width={25} className={'text-white'} />
                    </span> */}
                    <div className="flex-col flex justify-center ">
                      <p className={`text-[14px] ${item.status == 'Rejected'?'text-red-800':'text-green-800'} text-[15px]`}>{item.status}</p>
                      {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
                    </div>
                  </div>

                </div>
              )
            })}


          </div>

          {/* <Table
            titles={["id", "Approval type", "Date", "Status"]}
            approvalType={1}
            date={4}
            select={[0, 1, 4, 3]}
            data={approvalHistory}
            clickable={false}
            route={"dashboard"}
          /> */}
        </div>
      </div>
      {/* <ToastContainer /> */}
      {showTransactions && (
                <div 
                className="fixed flex top-0 left-0 z-10 h-full w-full bg-black bg-opacity-80 justify-center items-center" 
                // onClick={() => setSelectedCar({})}
            >
                <span 
                    className="absolute top-[10px] cursor-pointer right-[10px] bg-white text-black flex justify-center items-center p-[10px] rounded-full"
                    onClick={() => {setShowTransactions(false);}}
                >
                    X
                </span>
                <div className="flex flex-col bg-white shadow-lg rounded-lg p-[20px] justify-between ">
                <Doughnut data={chartData} />
                <span className="text-[10px] text-gray-400">Amount:</span>
                <span className="text-[17px] text-black">GHS {totalRentalPrice.toLocaleString()}</span>
                {/* <span className="text-[10px] text-gray-400 mt-[10px]">Scope:</span>
                <span className="text-[17px] text-black">{totalRentalPrice?.scope}</span> */}
                    {/* <span className="text-[20px] text-black text-left"><p className="text-gray-500 italic text-[10px]">Message: <br/></p>{message}</span>
                    <textarea className=" w-[100%] h-[100%] mt-[20px] p-[10px] border-[1px] border-black rounded-lg" placeholder="Please type your message here..." />
                    <button className="flex p-[10px] w-[100%] justify-center items-center bg-green-700 text-white mt-[15px] rounded-lg">
                        Send reply
                    </button> */}
                </div>
    
            </div>
      )}
    </>
  );
}
