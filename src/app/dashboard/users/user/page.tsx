"use client";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchHistory from "@/hooks/useFetchHistory";
import useFetchSingle from "@/hooks/useFetchSIngle";
import { baseURL, getTransactions } from "@/utils";
import { Icon } from "@iconify/react";
import axios from "axios";

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserPage() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(Object)
  const  {users, setUserHistoryFunc}  = useData();
  const router = useRouter()
  const searchParams = useSearchParams()
  const id  = searchParams.get('id');
  // const {data, loading, error} = useFetchSingle(searchParams.get('id') as string)
  const {data, loading, error} = useFetchHistory(id as string)

  
  
  
  
  const handleSuspendAccount = async () => {
    try {
      const response = await axios.post(`${baseURL}/update-suspended`, {
        id: user?._id, 
        accountType: 'user', 
        status: !user?.suspended
      })
      console.log('response', response.data)
      toast.success(`Account ${user?.suspended? 'unsuspend': 'suspended'}`)
      router.back()
    } catch (error:any) {
      toast.error(error)
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(`${baseURL}/delete-account`, {
        id: user?._id, 
        accountType: 'user', 
        authId: user?.authId
      })
      console.log('response', response.data)
      toast.success(`Account Deleted`)
      router.back()
    } catch (error:any) {
      toast.error(error)
    }
  };
  
  
  const handleViewTransactions = (id: string) => {
    // toast('Loading...', { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'top-right' })
    getTransactions(id).then((data) => {setUserHistoryFunc(data);  router.push('/dashboard/users/history');})
  };
  
  useEffect(() => {
    const userMatch = users?.filter((item:any) => {
      return item._id == id
    })
    if(userMatch){
      setUser(userMatch[0])
      console.log("id", userMatch[0]);
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
    <div className="flex flex-col mt-[55px] w-full">
      <div className="flex cursor-pointer" onClick={() => router.back()}>
        <Icon 
          icon={'mdi:arrow-left'} width={25} className={'text-black'} />
        <span className="ml-2">users</span>
      </div>


      <div className="bg-slate-100 rounded-lg p-4 mt-10">
      <div className="flex items-center">
        {user.passportPicture || user.idImage && token? 
          <img
            src={`${user.idImage}?${token}` || `${user.passportPicture}?${token}`}
            alt={`${user.firstName}'s Passport`}
            className="w-16 h-16 rounded-full mr-4 bg-slate-800"
          /> : 
          <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{user?.firstName?.charAt(0).toUpperCase()}</span>
        }
        <div className="ml-[5px]">
          <p className="text-[14px] font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-400 text-[10px">{user.email}</p>
        </div>
      </div>

      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex">
          <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
            <Icon icon={`mdi:phone`} width={25} className={'text-white'} />
          </span>
          <div className="ml-[5px] flex-col flex justify-center ">
            <p className="text-left text-[10px]">Phone Number:</p>
            <p className="text-[14px]">{user.phoneNumber}</p>
            {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
          </div>
        </div>

        <div className="flex">
          <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
            <Icon icon={`mdi:location`} width={25} className={'text-white'} />
          </span>
          <div className="ml-[5px] flex-col flex justify-center ">
            <p className="text-left text-[10px]">Location:</p>
            <p className="text-[14px]">{user.location}</p>
            {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
          </div>
        </div>

        <div className="flex">
          <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
            <Icon icon={`mdi:card`} width={25} className={'text-white'} />
          </span>
          <div className="ml-[5px] flex-col flex justify-center ">
            <p className="text-left text-[10px]">ID Type:</p>
            <p className="text-[14px]">{user.idType}</p>
            {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
          </div>
        </div>

        <div className="flex">
          <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
            <Icon icon={`mdi:card`} width={25} className={'text-white'} />
          </span>
          <div className="ml-[5px] flex-col flex justify-center ">
            <p className="text-left text-[10px]">ID Number:</p>
            <p className="text-[14px]">{user.idNumber}</p>
            {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
          </div>
        </div>

      </div>
      {user.nonGhanaian && (
        <div className="mt-4">
          <p className="text-red-500"> Non-Ghanaian</p>
        </div>
      )}

      <div className="flex mt-8">
          <button
            onClick={handleSuspendAccount}
            className="bg-orange-500 text-white py-2 px-4 rounded-full mr-4 hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:account-off"} width={20} className={"mr-2"} />
            {user?.suspended? "Unsuspend Account" : "Suspend Account"}
          </button>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white py-2 px-4 rounded-full mr-4 hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:delete"} width={20} className={"mr-2"} />
            Delete Account
          </button>

          <button
            onClick={() => handleViewTransactions(user.idNumber)}
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:credit-card"} width={20} className={"mr-2"} />
            View History
          </button>

        </div>
    </div>

    </div>
  );
}
