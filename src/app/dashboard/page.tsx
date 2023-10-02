"use client";
import InfoCard from "@/components/dashboard/InfoCard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DropDown from "@/components/shared/DropDown";
import Table from "@/components/shared/tables/Table";
import { InfoCardItems, InfoCardProps } from "@/utils";
import useFetchCars from "@/hooks/useFetchCars";
import useFetchStats from "@/hooks/useFetchStats";
export default function DashBoard() {
  const { loading, error, data } = useFetchCars();
  const stats = useFetchStats();

  if (loading) {
    // return <p>loading...</p>
  }

  if (error) {
    // return <p>error: {error}</p>
  }

  return (
    <>
      <div className="">
        <div className="">
          <DropDown />

          <div className="w-full grid grid-cols-5 gap-2 py-4">
            {InfoCardItems.map(({ title, icon, value }: InfoCardProps) => {
              return (
                <InfoCard
                  title={title}
                  icon={icon}
                  value={0 || stats?.data?.[value]}
                  key={title}
                />
              );
            })}
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
            clickable={true}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
