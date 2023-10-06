"use client";
import InfoCard from "@/components/dashboard/InfoCard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DropDown from "@/components/shared/DropDown";
import Table from "@/components/shared/tables/Table";
import { InfoCardItems, InfoCardProps } from "@/utils";
import useFetchCars from "@/hooks/useFetchCars";
import useFetchStats from "@/hooks/useFetchStats";
import Spinner from "@/components/spinner/Spinner";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useData } from "@/contexts/DataContext";

export default function DashBoard() {
  const [infoCardItems, setInfoCardItems] = useState()
  const { loading, error, data } = useFetchCars();
  const stats = useFetchStats();
  const users = useFetchData("users")
  const vendors = useFetchData("vendors")

  const {recentApprovalsFilter} = useData()

  const { user, isLoading } = useUser();


  if (loading || users.loading || vendors.loading) {
    return <Spinner/>
  }

  if (error) {
    // return <p>error: {error}</p>
  }

  console.log('dash', data)

  const filter = (data:string) => {
    const dateString = data;
    const date = new Date(dateString);

    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const isThisWeek = date >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()) &&
      date <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));

    if (isToday) {
      console.log("The date is today.");
      return 'Today'
    } else if (isThisWeek) {
      console.log("The date is within this week.");
      return 'This week'
    } else {
      console.log("The date is neither today nor this week.");
      return 'All'
    }
  }

  const filterVar = data?.filter((item:any) => {
    return filter(item.createdOn) == recentApprovalsFilter
  })


  return (
    <>
      <div className="">
        <div className="">
          <div className="flex w-full">
            <DropDown />
            <div className="flex absolute right-7 justify-center items-center">
              <img src={`${user?.picture}`} alt="" className="h-10 w-10 rounded-full" />
              <span className="text-gray-900 ml-2">{user?.nickname}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-5 gap-2 py-4">
            {users.data && 
              <InfoCard
                title={'Users'}
                icon={'mdi:users'}
                value={users.data.length}
                // key={title}
              />
            }
            {vendors.data && 
              <InfoCard
                title={'Vendors'}
                icon={'mdi:account'}
                value={vendors.data.length}
                // key={title}
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
        <div className="pt-[3rem]">
          <p className="text-[1.35rem] mb-4">Recent Approvals</p>
          <Table
            titles={["id", "Approval type", "Date", "Status"]}
            approvalType={1}
            date={4}
            select={[0, 1, 4, 3]}
            data={recentApprovalsFilter !== 'All'? filterVar.flat(1) : data}
            clickable={false}
            route={"dashboard"}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
