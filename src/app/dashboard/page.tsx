"use client";
import InfoCard from "@/components/dashboard/InfoCard";
import DropDown from "@/components/shared/DropDown";
import Table from "@/components/shared/tables/Table";
import { InfoCardItems, InfoCardProps } from "@/utils";
export default function DashBoard() {
  return (
    <div className="">
      <div className="">
        <DropDown />

        <div className="w-full grid grid-cols-5 gap-2 py-4">
          {InfoCardItems.map(({ title, icon, value }: InfoCardProps) => {
            return (
              <InfoCard title={title} icon={icon} value={value} key={title} />
            );
          })}
        </div>
      </div>
      <div className="pt-[3rem]">
        <p className="text-[1.35rem] mb-4">Recent Approvals</p>
        <Table
          titles={[
            "id",
            "Approval type",
            "Date",
            "Approved By",
            "Status"
          ]}
        />
      </div>
    </div>
  );
}
