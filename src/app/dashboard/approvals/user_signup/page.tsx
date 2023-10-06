"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import ApprovalField from "@/components/shared/approvals/Field";
import DocumentLink from "@/components/shared/approvals/LinkDoc";
import useFetchSingle from "@/hooks/useFetchSIngle";
import { baseURL, manageApproval, returnDocumentTitle } from "@/utils";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useData } from "@/contexts/DataContext";
import axios from "axios";

export default function SignUpApproval() {
  const {approvals} = useData()

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.get("id")) {
      router.back();
    }
  }, []);

  const id = searchParams.get("id")
  const match = approvals.filter((item: any) => {
    return item._id == id
  })
  const data  = match.flat(1)[0]

  const handleApprove = async (id: string, approved: boolean) => {
    const response = await axios({
      method: "patch",
      url: `${baseURL}/approvals`,
      data: {
        id: id,
        approved
      }
    })

    const data = await response.data
    console.log(data)
  };

  // const { loading, data, error } = useFetchSingle(
  //   searchParams.get("id") as string
  // );
  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   // return <p>Error: {error}</p>;
  // }

    const dateConvertor = (dateM: string) => {
    const mongodbDate = dateM;
    const date = new Date(mongodbDate);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} `;
    
    console.log(formattedDate);
    return formattedDate
  }

  return (
    <div>
    <div className="flex ">
    <div className="flex cursor-pointer" onClick={() => router.back()}>
      <Icon
        icon={'mdi:arrow-left'} width={25} className={'text-black'} />
      <span className="ml-2">approvals</span>
    </div>
  
    </div>

    <div className="grid grid-cols-12">
    </div>



    <div className="container mx-auto py-8">
  <div className="bg-slate-100 rounded-lg p-4 mt-10">
    <h2 className="text-xl font-semibold mb-4">Approval Details</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="font-medium text-gray-400">ID:</p>
        <p>{data._id}</p>
      </div>
      <div>
        <p className="font-medium text-gray-400">Type:</p>
        <p>{data.type}</p>
      </div>
      {/* <div>
        <p className="font-semibold">Duration:</p>
        <p>{data.d}</p>
      </div> */}
      <div>
        <p className="font-medium text-gray-400">Date Applied:</p>
        <p>{dateConvertor(data.createdOn)}</p>
      </div>
    </div>
    {data.status === "Pending" && (
      <div className="mt-4">
        <button
          onClick={() => manageApproval(data._id, true).then(() =>router.back())}
          className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 mr-2"
        >
          Approve
        </button>
        <button
          onClick={() => manageApproval(data._id, false).then(() =>router.back())}
          className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
        >
          Decline
        </button>
      </div>
    )}
  </div>
</div>

  </div>
  );
}
