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

export default function DashBoard() {
  const [infoCardItems, setInfoCardItems] = useState()
  const { loading, error, data } = useFetchCars();
  const stats = useFetchStats();
  const users = useFetchData("users")
  const vendors = useFetchData("vendors")


  if (loading || users.loading || vendors.loading) {
    return <Spinner/>
  }

  if (error) {
    // return <p>error: {error}</p>
  }

  console.log('dash', data)

  return (
    <>
      <div className="">
        <div className="">
          <DropDown />

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
            data={data}
            clickable={false}
            route={"dashboard"}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
