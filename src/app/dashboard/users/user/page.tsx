"use client";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchHistory from "@/hooks/useFetchHistory";
import useFetchSingle from "@/hooks/useFetchSIngle";
import { getTransactions } from "@/utils";
import { Icon } from "@iconify/react";
import axios from "axios";

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function UserPage() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(Object)
  const  {users, setUserHistoryFunc}  = useData();
  const router = useRouter()
  const searchParams = useSearchParams()
  const id  = searchParams.get('id');
  // const {data, loading, error} = useFetchSingle(searchParams.get('id') as string)
  const {data, loading, error} = useFetchHistory(id as string)

  console.log("id", data);
  

  

  const handleDisableAccount = () => {
    alert("Account disabled!");
  };


  const handleViewTransactions = (id: string) => {
    getTransactions(id).then((data) => {setUserHistoryFunc(data);  router.push('/dashboard/users/history');})
  };

  useEffect(() => {
    const userMatch = users?.filter((item:any) => {
      return item._id == id
    })
    if(userMatch){
      setUser(userMatch[0])
    }else{
      router.back()
    }
    getToken()
  }, [users])


  const getToken = async () => {
    try {
      const response = await axios.get('https://elite-ryde-management-api.azurewebsites.net/api/generate-sas-token');
      if (response.data) {
        console.log('token', response.data);
        setToken(response.data.data.token)
      } else {
        console.error('Failed to fetch token');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div>
      <div className="flex cursor-pointer" onClick={() => router.back()}>
        <Icon 
          icon={'mdi:arrow-left'} width={25} className={'text-black'} />
        <span className="ml-2">users</span>
      </div>


      <div className="bg-slate-100 rounded-lg p-4 mt-10">
      <div className="flex items-center">
        {user.passportPicture || user.idImage && token? 
          <img
            src={`${user.passportPicture}?${token}` || `${user.idImage}?${token}`}
            alt={`${user.firstName}'s Passport`}
            className="w-16 h-16 rounded-full mr-4 bg-slate-800"
          /> : null
        }
        <div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 text-sm">Phone Number:</p>
          <p>{user.phoneNumber}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Location:</p>
          <p>{user.location}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">ID Type:</p>
          <p>{user.idType}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">ID Number:</p>
          <p>{user.idNumber}</p>
        </div>
      </div>
      {user.nonGhanaian && (
        <div className="mt-4">
          <p className="text-red-500"> Non-Ghanaian</p>
        </div>
      )}

<div className="flex mt-8">
          {/* <button
            onClick={handleDisableAccount}
            className="bg-black text-white py-2 px-4 rounded-full mr-4 hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:account-off"} width={20} className={"mr-2"} />
            Disable Account
          </button> */}

          {/* <button
            onClick={handleDeleteAccount}
            className="bg-black text-white py-2 px-4 rounded-full mr-4 hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:delete"} width={20} className={"mr-2"} />
            Delete Account
          </button> */}
          <button
            onClick={() => handleViewTransactions(user.idNumber)}
            className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:credit-card"} width={20} className={"mr-2"} />
            View History
          </button>

        </div>
    </div>

    </div>
  );
}
