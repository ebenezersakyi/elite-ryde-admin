"use client"
import Table from "@/components/shared/tables/Table";
import TableHeader from "@/components/shared/tables/components/TableHeader";
import Spinner from "@/components/spinner/Spinner";
import { useData } from "@/contexts/DataContext";
import useFetchVendorCars from "@/hooks/useFetchCars";
import useFetchData from "@/hooks/useFetchData";
import { baseURL } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CarsPage() {
  const router = useRouter();
  const [token, setToken] = useState('')
  const [selectedCar, setSelectedCar] = useState (Object)
  const [carId, setCarId] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [addPromoCode, setAddPromoCode] = useState(false);

  const  {updateUsers}  = useData();

  const {carData, carLoading, carError} = useFetchVendorCars('')
  console.log('data', carData);

  function handleGeneratePromoCode(length: any) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Characters to include in the promo code
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    setPromoCode(code)
    return code;
  }


  const getToken = async () => {
    try {
      const response = await axios.get('https://elite-ryde-management-api.azurewebsites.net/api/generate-sas-token');
      if (response.data) {
        // console.log('token', response.data);
        setToken(response.data.data.token)
      } else {
        console.error('Failed to fetch token');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleAddPromoCode = async () => {
    console.log('starting')
    if(!discount || !promoCode || !carId){
      toast.error('All fields are required')
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/promo-codes`, {
        code: promoCode, discount: discount, carId: carId
      })
      console.log('response', response.data)
      toast.success(`Promo code added`)
      setAddPromoCode(false)
      // router.back()
    } catch (error:any) {
      toast.error(error)
      console.log('errorerror', error)
      setAddPromoCode(false)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

//   useEffect(() => {
//     updateUsers(data);
//   }, [data]); 


    if(carLoading){
    return <Spinner/>
  }
  if(carError){
    return <p>Error: ${carError}</p>
  }
  
  return (
    <div className="flex flex-col w-full mt-[55px]">

      <div className="flex cursor-pointer" onClick={() => router.back()}>
        <Icon
          icon={'mdi:arrow-left'} width={25} className={'text-black'} />
        <span className="ml-2">back</span>
      </div> 

      <div className="mt-[25px] grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 bg-slate-100 rounded-lg p-4 ">
        {carData?.map((item: any, index: any) => (
              <div 
                key={index} 
                className="bg-white  rounded-lg overflow-hidden w-[90%] m-3" 
                // onClick={() => setSelectedCar(item)}
            >

                <img
                  src={item.photos[0]}
                  alt="Car"
                  className="w-full h-40 object-cover"
                />


                <div className="p-4">
                  <p className="text-[15px] font-semibold mb-[2px]">
                    {item.basicInformation.make} {item.basicInformation.model}
                  </p>
                  <p className="text-gray-500 text=[10px]">
                    <strong>Year:</strong> {item.basicInformation.year}
                  </p>
                  <p className="text-gray-500 text=[10px]">
                    <strong>Mileage:</strong> {item.basicInformation.mileage} miles
                  </p>
                  <div 
                    className="p-[10px] text-center rounded-lg mt-[10px] w-[100%] text-green-700 bg-green-100"
                    onClick={() =>{ setAddPromoCode(true); setCarId(item._id); console.log('item', item)}}
                  >
                    Add Promo Code
                  </div>
                  <div 
                    className="p-[10px] text-center rounded-lg mt-[10px] w-[100%] text-black bg-gray-200"
                    onClick={() => setSelectedCar(item)}
                  >
                    View Details
                  </div>

                </div>
              </div>
            ))}
      </div>

      {Object.keys(selectedCar).length !== 0&& (
      <div className="fixed flex top-0 left-0  w-full h-full bg-black bg-opacity-80 justify-center p-[20px]" 
        // onClick={() => setSelectedCar({})}
      >
                      <span className="absolute top-[10px] right-[10px] p-[10px] justify-center items-center rounded-lg bg-white" onClick={() => setSelectedCar({})}>X</span>

        {/* <span className="absolute top-10 right-10 bg-white text-black p-10">X</span> */}
        <div className="max-w-[90vw] flex flex-col overflow-y-scroll  p-[10px] md:w-[500px]">
          {/* Car Information */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-600">
            <div className="flex overflow-x-auto">
              {selectedCar.photos.map((photo: any, index:any) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Car ${index + 1}`}
                  className="w-[470px] h-[200px] object-cover m-[5px] rounded-md"
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
              {/* <img
                src={selectedCar.driver.image}
                alt="Driver"
                className="w-16 h-16 object-cover rounded-full mr-4"
              /> */}
              <span className="bg-[#99625d] text-white w-[50px] h-[50px] mr-[20px] justify-center items-center flex rounded-full text-xl">{selectedCar.driver?.name?.charAt(0).toUpperCase()}</span>

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

      {addPromoCode && (
              <div className="fixed flex top-0 left-0  w-full h-full bg-black bg-opacity-80 justify-center items-center p-[20px]" 
              // onClick={() => setSelectedCar({})}
            >
              <span className="absolute top-[10px] right-[10px] p-[10px] justify-center items-center rounded-lg bg-white" onClick={() => {setAddPromoCode(false); setPromoCode('')}}>X</span>
                <div className="bg-white shadow-lg flex flex-col rounded-lg w-600 h-[60%] justify-center items-center p-[15px]">
                  <h1 className="text-2xl font-semibold mb-4">Add a New Promo Code</h1>
                  <div className="mb-4">
                    <label htmlFor="promoCode" className="block text-gray-700 font-medium">Promo Code: <b>{promoCode}</b></label>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleGeneratePromoCode(10)}
                    >
                      Generate Promo code
                    </button>
      
                  </div>
                  <div className="mb-4">
                    <label htmlFor="discount" className="block text-gray-700 font-medium">Discount (%):</label>
                    <input
                      type="number"
                      id="discount"
                      className="w-full px-3 py-2 border rounded-md"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                    onClick={handleAddPromoCode}
                    >Add Promo Code
                  </button>
                </div>
                </div>
      )}

    </div>
  );
}
