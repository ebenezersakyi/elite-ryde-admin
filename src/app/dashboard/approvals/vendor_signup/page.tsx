"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import ApprovalField from "@/components/shared/approvals/Field";
import DocumentLink from "@/components/shared/approvals/LinkDoc";
import useFetchSingle from "@/hooks/useFetchSIngle";
import { baseURL, manageApproval, returnDocumentTitle, sendEmail } from "@/utils";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useData } from "@/contexts/DataContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function VendorSignUpApproval() {
  const [showDeclineDialogue, setShowDeclineDialogue] = useState(false)
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
  const match = approvals?.filter((item: any) => {
    return item._id == id
  })
  const data  = match?.flat(1)[0]
  const contentObj = JSON.parse(data?.content?.replace(/\\n/g, '').replace(/\\"/g, '"'));

  console.log('data', contentObj)

  // const sendEmail = async () => {
  //   const emailData = {
  //     from: 'your@email.com',
  //     to: 'ebensakyi0@email.com',
  //     subject: 'Test Email',
  //     text: 'This is a test email sent using Infobip Email API.',
  //   }
  //   try {
  //     const response = await axios.post(
  //       '1vvx3k.api.infobip.com',
  //       emailData,
  //       {
  //         headers: {
  //           'Authorization': 'Bearer 495c5273e7f5e7e9251bd4c5d2d717fa-7e151b0e-8810-4106-bd36-8892c9e9922b',
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     console.log('Email sent successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // }

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
        <h2 className="text-xl font-semibold mb-4">Vendor Signup Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex">
            <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{contentObj?.firstName?.charAt(0).toUpperCase()}</span>
            <div className="ml-[5px] flex-col justify-center items-center">
                <p className="flex">{contentObj.firstName || contentObj.basicInformation.make} {contentObj.lastName || contentObj.basicInformation.model}</p>
                <p className="text-[10px] text-black">{contentObj.email || contentObj.basicInformation.year}</p>
              </div>
          </div>

          <div className="flex">
            <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
              <Icon icon={`mdi:location`} width={25} className={'text-white'} />
            </span>
            <div className="ml-[5px] flex-col flex justify-center ">
              <p className="text-[14px]">{contentObj.location || contentObj.additionalInformation.location}</p>
              {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
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

          <div className="flex">
            <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
              <Icon icon={`mdi:building`} width={25} className={'text-white'} />
            </span>
            <div className="ml-[5px] flex-col flex justify-center ">
              <p className="text-[14px]">{contentObj.companyName}</p>
              {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
            </div>
          </div>

          <div className="flex">
            <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
              <Icon icon={`mdi:pound`} width={25} className={'text-white'} />
            </span>
            <div className="ml-[5px] flex-col flex justify-center ">
              <p className="text-left text-[10px]">TIN:</p>
              <p className="text-[14px]">{contentObj.tin}</p>
            </div>
          </div>

          <div className="flex">
            <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
              <Icon icon={`mdi:document`} width={25} className={'text-white'} />
            </span>
            <div className="ml-[5px] flex-col flex justify-center ">
              <p className="text-left text-[10px]">Document:</p>
              <button
                // onClick={handleDisableAccount}
                className=" text-black py-[3px] px-[3px] rounded-full mr-4 hover:bg-gray-800 text-sm flex items-center "
              >
                <Icon icon={"mdi:download"} width={15} className={"mr-1 text-black"} />
                Download
              </button>
            </div>
          </div>
          {/* <div>
            <p className="font-semibold">Duration:</p>
            <p>{data.d}</p>
          </div> */}
          {/* <div>
            <p className="font-medium text-gray-400">Date Applied:</p>
            <p>{dateConvertor(data.createdOn)}</p>
          </div> */}
        </div>
        {data.status === "Pending" && (
          <div className="mt-[35px]">
            <button
              onClick={() => manageApproval(data._id, true).then(() =>{sendEmail('ebensakyi0@gmail.com', `Your request has been approved`, 'Request Approved'); router.back()})}
              className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => setShowDeclineDialogue(true)}
              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>

    {showDeclineDialogue && 
      <div className="fixed flex top-0 left-0 h-full w-full bg-black bg-opacity-80 justify-center items-center" onClick={() => {setShowDeclineDialogue(false)}}>
        <div className=" flex flex-col w-[350px]  p-[20px] bg-white rounded-lg">
          <span className="text-[24px] my-[10px]">Reason for decline</span>
          <input type="text" className="w-full h-[50px] border-[2px] rounded-lg p-[10px]" />
          <button 
            className="bg-green-700 rounded-lg p-[10px] mt-[10px] text-white font-semibold"
            onClick={() => {
              manageApproval(data._id, false).then(() =>{
                sendEmail('ebensakyi0@gmail.com', `Your request has been declined`, 'Request Declined');
                setShowDeclineDialogue(false)
                router.back();
              });
            }}
          >
            Done
          </button>
        </div>
      </div>
    }
  </div>
  );
}
