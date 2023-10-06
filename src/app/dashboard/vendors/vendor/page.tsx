"use client";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchSingle from "@/hooks/useFetchSIngle";
import useFetchTransactions from "@/hooks/useFetchTransactions";
import { getTransactions } from "@/utils";
import { Icon } from "@iconify/react";
import axios from "axios";

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function UserPage() {
  const [token, setToken] = useState('')
  const [vendor, setVendor] = useState(Object)
  const  {vendors, setVendorHistoryFunc}  = useData();
  const router = useRouter()
  const searchParams = useSearchParams()
  const id  = searchParams.get('id');
  const {data, loading, error} = useFetchTransactions(id as string)
  // const {data, loading, error} = useFetchSingle(searchParams.get('id') as string)

  // if (loading) {
  //   return <Spinner />;
  // }
  // if (error) {
  //   return <p>Error: ${error}</p>;
  // }

  // console.log("id", data);
  // console.log("error", error);



  const handleDisableAccount = () => {
    alert("Account disabled!");
  };



  const handleViewTransactions = (id: string) => {
    getTransactions(id).then((data) => {setVendorHistoryFunc(data);  router.push('/dashboard/vendors/history');})
  };

  const getToken = async () => {
    try {
      const response = await fetch('https://elite-ryde-management-api.azurewebsites.net/api/generate-sas-token');
      if (response.ok) {
        const data = await response.json();
        console.log('token', data.data.token);
        setToken(data.data.token)
      } else {
        console.error('Failed to fetch token');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  useEffect(() => {
    const vendorMatch = vendors?.filter((item:any) => {
      return item._id == id
    })
    if(vendorMatch){
      setVendor(vendorMatch[0])
    }else{
      router.back()
    }
    // const vendor = vendorMatch[0]
    // console.log('vendor', vendor)
    getToken()
  }, [vendors])
  

  return (
    <div>
      <div className="flex cursor-pointer" onClick={() => router.back()}>
        <Icon 
          icon={'mdi:arrow-left'} width={25} className={'text-black'} />
        <span className="ml-2">vendors</span>
      </div>


      <div className="bg-slate-100 rounded-lg p-4 mt-10">
      <div className="flex items-center">
        {vendor.passportPicture && 
          <img
            src={`${vendor.passportPicture}?token=${token}`}
            alt={`${vendor.firstName}'s Passport`}
            className="w-16 h-16 rounded-full mr-4 bg-slate-800"
          />
        }
        <div>
          <h2 className="text-xl font-semibold">
            {vendor.companyName}
          </h2>
          <p className="text-gray-400">{vendor.email}</p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 text-sm">Name:</p>
          <p>{vendor.firstName} {vendor.lastName}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Location:</p>
          <p>{vendor.location}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">TIN:</p>
          <p>{vendor.tin}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Business Registeration Document:</p>
          <a href={`${vendor.businessRegistrationDocument}?${token}`} download={true} target="_blank">
            {/* <iframe
              src={`${vendor.businessRegistrationDocument}?${token}`}
              width="90px"
              height="70px"
              title="Document Preview"
            /> */}
                      <button
            // onClick={handleDisableAccount}
            className="bg-green-900 mt-2 text-white py-2 px-4 rounded-full mr-4 hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:download"} width={20} className={"mr-1"} />
            Download
          </button>
          </a>
          
        </div>
      </div>
      {vendor.nonGhanaian && (
        <div className="mt-4">
          <p className="text-red-500">Non-Ghanaian</p>
        </div>
      )}

<div className="flex mt-8">
          <button
            onClick={handleDisableAccount}
            className="bg-black text-white py-2 px-4 rounded-full mr-4 hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:account-off"} width={20} className={"mr-2"} />
            Disable Account
          </button>

          {/* <button
            onClick={handleDeleteAccount}
            className="bg-black text-white py-2 px-4 rounded-full mr-4 hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:delete"} width={20} className={"mr-2"} />
            Delete Account
          </button> */}

          <button
            onClick={() => handleViewTransactions(vendor.idNumber)}
            className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:credit-card"} width={20} className={"mr-2"} />
            View Transactions
          </button>
        </div>
    </div>

    </div>
  );
}
