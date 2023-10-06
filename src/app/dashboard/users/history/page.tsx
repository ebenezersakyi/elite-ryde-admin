"use client";
import Table from "@/components/shared/tables/Table";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchHistory from "@/hooks/useFetchHistory";
import useFetchSingle from "@/hooks/useFetchSIngle";
import { getTransactions } from "@/utils";
import { Icon } from "@iconify/react";

import { useSearchParams, useRouter } from 'next/navigation'

export default function HistoryPage() {
    const  {userHistory}  = useData();
    const router = useRouter()

  return (
    <div className="">
    <div className="flex cursor-pointer mb-15" onClick={() => router.back()}>
        <Icon 
          icon={'mdi:arrow-left'} width={25} className={'text-black'} />
        <span className="ml-2 mb-10">back</span>
      </div>
        {/* <span className="mt-30 mb-24 flex">Successful Rentals</span> */}
        {userHistory.length == 0 ? (
            <div className="flex  justify-center items-center mt-20 ">
                <Icon 
                    icon={'mdi:clear'} width={115} className={'text-gray-100'} />
                {/* <span className="text-xl text-gray-600 ml-5">Empty</span> */}
            </div>
        ) : (
            <Table
              titles={["Car Name","Vendor Name", "Duration"]}
              select={[1,3, 4]}
              data={userHistory}
              clickable={false}
              route={''}
            />

        )}
    </div>
      );
}
