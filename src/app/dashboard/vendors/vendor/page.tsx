"use client";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchCars from "@/hooks/useFetchApprovals";
import useFetchVendorCars from "@/hooks/useFetchCars";
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
  const [selectedCar, setSelectedCar] = useState (Object)
  const  {vendors, setVendorHistoryFunc}  = useData();
  const router = useRouter()
  const searchParams = useSearchParams()
  const id  = searchParams.get('id');
  const {data, loading, error} = useFetchTransactions(id as string)
  const {carData, carLoading, carError} = useFetchVendorCars(id as string)
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
      // console.log('vendorMatch', vendorMatch[0]._id)
      
      setVendor(vendorMatch[0])
    }else{
      router.back()
    }
    // const vendor = vendorMatch[0]
    // console.log('vendor', vendor)
    getToken()
  }, [vendors])

  if(vendor){
    useFetchVendorCars(vendor._id)
  }
  

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
            onClick={() => handleViewTransactions(vendor.idNumber)}
            className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 text-sm flex items-center"
          >
            <Icon icon={"mdi:credit-card"} width={20} className={"mr-2"} />
            View Transactions
          </button>
        </div>
    </div>

    <div className="mt-10">
  <span className="text-2xl text-black ml-12">Cars</span>
  <div className="flex flex-row flex-wrap justify-center items-center">
    {carData?.map((item: any, index: any) => (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 m-3" onClick={() => setSelectedCar(item)}>

        <img
          src={item.photos[0]}
          alt="Car"
          className="w-full h-40"
        />


        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1">
            {item.basicInformation.make} {item.basicInformation.model}
          </h2>
          <p className="text-gray-500">
            <strong>Year:</strong> {item.basicInformation.year}
          </p>
          <p className="text-gray-500">
            <strong>Mileage:</strong> {item.basicInformation.mileage} miles
          </p>
          {/* <p>
            <strong>Engine Type:</strong> {item.basicInformation.engineType}
          </p>
          <p>
            <strong>Engine Size:</strong> {item.basicInformation.engineSize}L
          </p>
          <p>
            <strong>Number of Seats:</strong> {item.basicInformation.numberOfSeats}
          </p>
          <p>
            <strong>Transmission:</strong> {item.basicInformation.transmission}
          </p>
          <p>
            <strong>Body Style:</strong> {item.basicInformation.bodyStyle}
          </p>


          <h3 className="text-lg font-semibold mt-4 mb-2">Additional Information</h3>
          <p>
            <strong>Location:</strong> {item.additionalInformation.location}
          </p>
          <p>
            <strong>License Plate:</strong> {item.additionalInformation.licensePlate}
          </p>
          <p>
            <strong>Vehicle Identification Number:</strong>{' '}
            {item.additionalInformation.vehicleIdentificationNumber}
          </p> */}
        </div>
      </div>
    ))}
  </div>
    {!carData&& <Spinner/>}
    {/* <Spinner/> */}
</div>

{Object.keys(selectedCar).length !== 0&& (
  <div className="fixed flex top-0 left-0 h-full w-full bg-black bg-opacity-80 justify-center items-center" onClick={() => setSelectedCar({})}>
    {/* <span className="absolute top-10 right-10 bg-white text-black p-10">X</span> */}
    <div className="w-300 flex flex-col  p-4">
      {/* Car Information */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-600">
        <div className="flex overflow-x-auto">
          {selectedCar.photos.map((photo: any, index:any) => (
            <img
              key={index}
              src={photo}
              alt={`Car ${index + 1}`}
              className="w-400 h-60 object-cover m-2 rounded-md"
            />
          ))}
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold">
            {selectedCar.basicInformation.make} {selectedCar.basicInformation.model}
          </h2>
          <p className="text-gray-500">
            <strong>Year:</strong> {selectedCar.basicInformation.year}
          </p>
          <p className="text-gray-500">
            <strong>Mileage:</strong> {selectedCar.basicInformation.mileage} miles
          </p>
          <p className="text-gray-500">
            <strong>Engine Type:</strong> {selectedCar.basicInformation.engineType}
          </p>
          <p className="text-gray-500">
            <strong>Engine Size:</strong> {selectedCar.basicInformation.engineSize}L
          </p>
          <p className="text-gray-500">
            <strong>Number of Seats:</strong> {selectedCar.basicInformation.numberOfSeats}
          </p>
          <p className="text-gray-500">
            <strong>Transmission:</strong> {selectedCar.basicInformation.transmission}
          </p>
          <p className="text-gray-500">
            <strong>Body Style:</strong> {selectedCar.basicInformation.bodyStyle}
          </p>
        </div>
      </div>

      {/* Driver Information */}
      <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-4">
        <div className="flex items-center">
          <img
            src={selectedCar.driver.image}
            alt="Driver"
            className="w-16 h-16 object-cover rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">{selectedCar.driver.name}</h2>
            <p className="text-gray-500">
              <strong>ID Number:</strong> {selectedCar.driver.idNumber}
            </p>
            <p className="text-gray-500">
              <strong>Email:</strong> {selectedCar.driver.email}
            </p>
            <p className="text-gray-500">
              <strong>Phone Number:</strong> {selectedCar.driver.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
