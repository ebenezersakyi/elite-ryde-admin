"use client"
import Table from "@/components/shared/tables/Table";
import TableHeader from "@/components/shared/tables/components/TableHeader";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchData from "@/hooks/useFetchData";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function UsersPage() {
  const [searchText, setSearchText] = useState('')
  const router = useRouter();
  const [token, setToken] = useState('')
  const {data, loading, error} = useFetchData("users")
  const  {updateUsers}  = useData();


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

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    updateUsers(data);
  }, [data]); 

  console.log('data', data);

    if(loading){
    return <Spinner/>
  }
  if(error){
    return <p>Error: ${error}</p>
  }
  
  return (
    <div className="flex flex-col w-full mt-[55px]">
      {/* <ToastContainer/> */}

      <div className="flex items-center">
        <div className="flex cursor-pointer" onClick={() => router.back()}>
          <Icon
            icon={'mdi:arrow-left'} width={25} className={'text-black'} />
          <span className="ml-2">back</span>
        </div> 
        <input type="text" onChange={(e) => setSearchText(e.target.value)} placeholder="Search for a user" className="w-[100%] outline-none ml-[20px] border-[1px] border-gray-400 rounded-full p-[5px] px-[10px]" />
      </div>

      <div className="mt-[25px] w-full overflow-x-scroll">
        <TableHeader titles={[
          "User",
          "Location",
          "Phone Number",
        ]} />

        {data?.filter((item:any, index: any) => {
          if(searchText.length == 0 || searchText == " "){
            return item
          }else{
            return `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchText.toLowerCase())
          }
        }).map((item: any, index: any) => {
          return ( 
            <div
              key={index}
              onClick={() => {
                router.push(`users/user/?id=${item._id}`)
              }}
              style={{
                gridTemplateColumns: `repeat(${3}, 1fr)`
              }}
              className={`w-full grid ${
                "grid-cols-" + 3
              } my-[10px] p-[10px] border-[2px] rounded-lg cursor-pointer relative`}
            >

              <div className="flex">
                {/* {contentObj.idImage || contentObj.photos? ( */}
                  {/* <img src={contentObj.idImage || contentObj.photos[0]} alt="" className="w-[45px] h-[45px] rounded-full" /> */}
                {/* ) : ( */}
                <span className="bg-[#99625d] text-white w-[45px] h-[45px] justify-center items-center flex rounded-full text-xl">{item?.firstName?.charAt(0).toUpperCase()}</span>
                {/* )} */}
                <div className="ml-[5px] flex-col justify-center items-center">
                  <p className="flex">{item.firstName} {item.lastName}</p>
                  <p className="text-[10px] text-black">{item.email}</p>
                </div>
              </div>


              <div className="flex">
                <span className="bg-[#99945d] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                  <Icon icon={`mdi:location`} width={25} className={'text-white'} />
                </span>
                <div className="ml-[5px] flex-col flex justify-center ">
                  <p className="text-[14px]">{item.location}</p>
                  {/* <p className="text-left text-[10px]">{formattedTime}</p> */}
                </div>
              </div>

              <div className="flex">
                <span className="bg-[#5d7499] w-[45px] h-[45px] justify-center items-center flex rounded-full">
                  <Icon icon={`mdi:phone`} width={25} className={'text-white'} />
                </span>
                <div className="ml-[5px] flex-col flex justify-center items-center">
                  <p>{item.phoneNumber}</p>
                </div>
              </div>
              
            </div>
          )
        })}


      </div>

      {/* <Table
        titles={["Name","Email", "Phone number", "Digital Address"]}
        select={[1,3, 4, 5]}
        data={data}
        clickable={true}
        route={'users'}
      /> */}
    </div>
  );
}
