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
import Spinner from "@/components/spinner/Spinner";

export default function BookingSignUpApproval() {
  const [showDeclineDialogue, setShowDeclineDialogue] = useState(false)
  const [carDetails, setCarDetails] = useState(Object)
  const [contentObj, setContentObj] = useState(Object)
  const [selectedCar, setSelectedCar] = useState (Object)

  const {approvals} = useData()

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.get("id")) {
      router.back();
    }
  }, []);

  async function getCar(id:any) {
    try {
      // setLoading(true);
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/specific-car?id=${id}`,
        method: "get",
      });

      if (response?.data?.status) {
        console.log("response?.data?.data", response?.data?.data);
        setCarDetails(response?.data?.data)
        // dispatch(setData(response?.data?.data));
      } else {
        // nav("/dashboard");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Error occured");
    } finally {
      // setLoading(false);
    }
  }

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

  // if(!match || !data){
  //   router.push('/approvals')
  // }
  
    useEffect(() => {
      if(match){
        const contentObj = JSON.parse(data?.content?.replace(/\\n/g, '').replace(/\\"/g, '"'));
        getCar(contentObj?.carId)
        setContentObj(contentObj)
      }else{
        router.back()
      }
    }, [approvals])

    const refundMoney = async() => {
      const secretKey = process.env.REACT_APP_PAYSTACK_TEST_KEY;
      const apiUrl = 'https://api.paystack.co/refund';

      const data = {
        transaction: contentObj?.transactionId,
      };

      const headers = {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      };

      axios
      .post(apiUrl, data, { headers })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }


  // useEffect(() => {
  //   getCar(contentObj?.carId)
  // }, [id])



  const createdOnDate = new Date(data?.createdOn);
  const formattedDate = `${createdOnDate.getFullYear()}-${String(createdOnDate.getMonth() + 1).padStart(2, '0')}-${String(createdOnDate.getDate()).padStart(2, '0')}`;
  const formattedTime = `${String(createdOnDate.getHours()).padStart(2, '0')}:${String(createdOnDate.getMinutes()).padStart(2, '0')}:${String(createdOnDate.getSeconds()).padStart(2, '0')}`;

  if(!data || Object.keys(contentObj).length ==  0 ){
    return <Spinner/>
  }
  
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
    <h2 className="text-xl font-semibold mb-4">Ride Details</h2>
    <div className="grid grid-cols-2 gap-4">

      <div className="flex">
        <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{contentObj?.firstName?.charAt(0).toUpperCase()}</span>
        <div className="ml-[5px] flex-col justify-center items-center">
            <p className="flex">{contentObj?.firstName || contentObj?.basicInformation?.make} {contentObj?.lastName || contentObj?.basicInformation?.model}</p>
            <p className="text-[10px] text-black">{contentObj?.email || contentObj?.basicInformation?.year}</p>
          </div>
      </div>

      <div className="flex">
        <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
          <Icon icon={`mdi:location`} width={25} className={'text-white'} />
        </span>
        <div className="ml-[5px] flex-col flex justify-center ">
          <p className="text-[14px]">{contentObj?.location || contentObj?.additionalInformation.location}</p>
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
          <Icon icon={`mdi:calendar`} width={25} className={'text-white'} />
        </span>
        <div className="ml-[5px] flex-col flex justify-center ">
          <p className="text-left text-[10px]">Pick Up Date:</p>
          <p className="text-[14px]">{contentObj?.pickupDate}</p>
        </div>
      </div>

      <div className="flex">
        <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
          <Icon icon={`mdi:calendar`} width={25} className={'text-white'} />
        </span>
        <div className="ml-[5px] flex-col flex justify-center ">
          <p className="text-left text-[10px]">Return Date:</p>
          <p className="text-[14px]">{contentObj?.returnDate}</p>
        </div>
      </div>

      <div className="flex">
        <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
          <Icon icon={`mdi:clock`} width={25} className={'text-white'} />
        </span>
        <div className="ml-[5px] flex-col flex justify-center ">
          <p className="text-left text-[10px]">Time:</p>
          <p className="text-[14px]">{contentObj?.time}</p>
        </div>
      </div>

      <div className="flex">
        <span className="bg-[#5d995d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
          <Icon icon={`mdi:magnify`} width={25} className={'text-white'} />
        </span>
        <div className="ml-[5px] flex-col flex justify-center ">
          <p className="text-left text-[10px]">Scope:</p>
          <p className="text-[14px]">{contentObj?.scope}</p>
        </div>
      </div>


    </div>

    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Car Details</h2>
      <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3">

      {Object.keys(carDetails).length !==  0 && 
        <div className="bg-white  rounded-lg overflow-hidden w-[90%] m-3" onClick={() => setSelectedCar(carDetails)}>
          <img
            src={carDetails?.photos[0]}
            alt="Car"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <p className="text-[15px] font-semibold mb-[2px]">
              {carDetails?.basicInformation?.make} {carDetails?.basicInformation?.model}
            </p>
            <p className="text-gray-500 text=[10px]">
              <strong>Year:</strong> {carDetails?.basicInformation?.year}
            </p>
            <p className="text-gray-500 text=[10px]">
              <strong>Mileage:</strong> {carDetails?.basicInformation?.mileage} miles
            </p>
          </div>
        </div>
      }
      {!carDetails&& <div className="flex h-[40vh] w-[100%] justify-center items-center"><Spinner/></div>}
          </div>
        </div>


    {data?.status === "Pending" && (
      <div className="mt-[35px]">
      <button
        onClick={() => {
          manageApproval(data?._id, true)
          .then(() =>{
            // sendEmail('ebensakyi0@gmail.com', `Your request has been approved`, 'Request Approved'); 
            router.back()
          })}}
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
      <div className="fixed flex top-0 left-0 h-full w-full bg-black bg-opacity-80 justify-center items-center" >
        <span className="absolute top[10px] right[10px] p-[10px[ rounded-lg font-semibold text[20px]" onClick={() => {setShowDeclineDialogue(false)}}>X</span>
        <div className=" flex flex-col w-[350px]  p-[20px] bg-white rounded-lg">
          <span className="text-[24px] my-[10px]">Reason for decline</span>
          <input type="text" className="w-full h-[50px] border-[2px] rounded-lg p-[10px]" />
          <button 
            className="bg-green-700 rounded-lg p-[10px] mt-[10px] text-white font-semibold"
            onClick={() => {
              manageApproval(data?._id, false).then(() =>{
                sendEmail('ebensakyi0@gmail.com', `Your request has been declined`, 'Request Declined');
                refundMoney()
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

