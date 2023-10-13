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

export default function DashBoard() {
  const [infoCardItems, setInfoCardItems] = useState()
  const { loading, error, data } = useFetchCars();
  const stats = useFetchStats();
  const users = useFetchData("users")
  const vendors = useFetchData("vendors")
  const cars = useFetchCars()

  const {recentApprovalsFilter} = useData()

  const { user, isLoading } = useUser();


  if (loading || users.loading || vendors.loading) {
    return <Spinner/>
  }

  if (error) {
    // return <p>error: {error}</p>
  }

  console.log('dash', data)

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
  const filterVar = data
  ?.filter((item: any) => {
    return item.status === recentApprovalsFilter;
  })


  // const approvalHistory = recentApprovalsFilter !== 'All'? filterVar.flat(1) : data
  const approvalHistory = recentApprovalsFilter !== 'All'? filterVar.flat(1) : data
  console.log('approvalHistory', approvalHistory)
  // console.log(`recentApprovalsFilter !== 'All'? filterVar.flat(1) : data}`, recentApprovalsFilter !== 'All'? filterVar.flat(1) : data})


  return (
    <>
      <div className="w-full">
        <div className=" absolute right-2 top-[25px] ">
          <div className="flexjustify-center items-center">
            <img src={`${user?.picture}`} alt="" className="h-10 w-10 rounded-full" />
            {/* <span className="text-gray-900 ml-2">{user?.nickname}</span> */}
          </div>
        </div>
        <div className="">

          <div className="w-full grid grid-cols-3 gap-2 py-4 mt-[35px]">
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
    </>
  );
}
