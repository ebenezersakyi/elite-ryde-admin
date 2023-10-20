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
import { toast } from "react-toastify";

export default function CarApproval() {
  const {approvals} = useData()

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.get("id")) {
      router.back();
    }
  }, []);



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

  const id = searchParams.get("id")
  const match = approvals.filter((item: any) => {
    return item._id == id
  })
  const data  = match.flat(1)[0]
  const contentObj = JSON.parse(data.content?.replace(/\\n/g, '').replace(/\\"/g, '"'));

  console.log('data', contentObj)

  const sendEmail = async () => {
    const emailData = {
      from: 'your@email.com',
      to: 'ebensakyi0@email.com',
      subject: 'Test Email',
      text: 'This is a test email sent using Infobip Email API.',
    }
    try {
      const response = await axios.post(
        '1vvx3k.api.infobip.com',
        emailData,
        {
          headers: {
            'Authorization': 'Bearer 495c5273e7f5e7e9251bd4c5d2d717fa-7e151b0e-8810-4106-bd36-8892c9e9922b',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  const createdOnDate = new Date(data.createdOn);
  const formattedDate = `${createdOnDate.getFullYear()}-${String(createdOnDate.getMonth() + 1).padStart(2, '0')}-${String(createdOnDate.getDate()).padStart(2, '0')}`;
  const formattedTime = `${String(createdOnDate.getHours()).padStart(2, '0')}:${String(createdOnDate.getMinutes()).padStart(2, '0')}:${String(createdOnDate.getSeconds()).padStart(2, '0')}`;

  return (
    <div className="w-full">
    <div className="flex mt-[55px]">
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
    <h2 className="text-xl font-semibold mb-4">Car Details</h2>
    <div className="grid grid-cols-2 gap-4">
    <div className="flex">
      {/* <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{contentObj?.firstName?.charAt(0).toUpperCase()}</span> */}
      <img className="bg-black text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl" src={contentObj.photos[0]} alt="" />
      <div className="ml-[5px] flex-col justify-center items-center">
          <p className="flex">{contentObj.basicInformation.make || contentObj.basicInformation.model} {contentObj.lastName || contentObj.basicInformation.model}</p>
          <p className="text-[10px] text-black">{contentObj.email || contentObj.basicInformation.year}</p>
        </div>
    </div>

    <div className="flex">
      <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
        <Icon icon={`mdi:line`} width={25} className={'text-white'} />
      </span>
      <div className="ml-[5px] flex-col flex justify-center ">
        <p className="text-left text-[10px]">Mileage:</p>
        <p className="text-[14px]">{contentObj.basicInformation.mileage}</p>
        {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
      </div>
    </div>

    <div className="flex">
      <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
        <Icon icon={`mdi:seat`} width={25} className={'text-white'} />
      </span>
      <div className="ml-[5px] flex-col flex justify-center ">
        <p className="text-left text-[10px]">Number of seats:</p>
        <p className="text-[14px]">{contentObj.basicInformation.numberOfSeats}</p>
        {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
      </div>
    </div>

    <div className="flex">
      <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
        <Icon icon={`mdi:gear`} width={25} className={'text-white'} />
      </span>
      <div className="ml-[5px] flex-col flex justify-center ">
        <p className="text-left text-[10px]">Transmission:</p>
        <p className="text-[14px]">{contentObj.basicInformation.transmission}</p>
        {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
      </div>
    </div>

    <div className="flex">
      <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
        <Icon icon={`mdi:engine`} width={25} className={'text-white'} />
      </span>
      <div className="ml-[5px] flex-col flex justify-center ">
        <p className="text-left text-[10px]">Engine Type:</p>
        <p className="text-[14px]">{contentObj.basicInformation.engineType}</p>
        {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
      </div>
    </div>

    <div className="flex">
      <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
        <Icon icon={`mdi:engine`} width={25} className={'text-white'} />
      </span>
      <div className="ml-[5px] flex-col flex justify-center ">
        <p className="text-left text-[10px]">Engine Size:</p>
        <p className="text-[14px]">{contentObj.basicInformation.engineSize}</p>
        {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
      </div>
    </div>

    <div className="flex">
      <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
        <Icon icon={`mdi:car`} width={25} className={'text-white'} />
      </span>
      <div className="ml-[5px] flex-col flex justify-center ">
        <p className="text-left text-[10px]">Body Style:</p>
        <p className="text-[14px]">{contentObj.basicInformation.bodyStyle}</p>
        {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
      </div>
    </div>
    </div>

    <h2 className="text-xl font-semibold mb-4 mt-[25px]">Driver Details</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex">
        <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{contentObj?.driver.name?.charAt(0).toUpperCase()}</span>
        <div className="ml-[5px] flex-col justify-center items-center">
          <p className="flex">{contentObj.driver.name}</p>
          <p className="text-[10px] text-black">{contentObj.driver.email}</p>
        </div>
      </div>

    <div className="flex">
      <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
        <Icon icon={`mdi:card`} width={25} className={'text-white'} />
      </span>
      <div className="ml-[5px] flex-col flex justify-center ">
        <p className="text-left text-[10px]">ID Number:</p>
        <p className="text-[14px]">{contentObj.driver.idNumber}</p>
        {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
      </div>
    </div>

    <div className="flex">
      <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
        <Icon icon={`mdi:phone`} width={25} className={'text-white'} />
      </span>
      <div className="ml-[5px] flex-col flex justify-center ">
        <p className="text-left text-[10px]">Phone Number:</p>
        <p className="text-[14px]">{contentObj.driver.phoneNumber}</p>
        {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
      </div>
    </div>



    </div>
    {data.status === "Pending" && (
      <div className="mt-[35px]">
        <button
          onClick={() => manageApproval(data._id, true).then((data) =>{
            if(data){
              toast.success('Approval Managed Successfully')
            }else{
              toast.error('Error! \nPLease try again later')
            }
            router.back()
          })}
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
