import { baseURL } from "@/utils";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

export default function useFetchVendorCars(id: string) {
  const [carLoading, setLoading] = useState<boolean>(false);
  const [carData, setData] = useState<any>();
  const [carError, setError] = useState<string>();
  async function fetchHistory() {
    try {
        setLoading(true)
        const response = await axios({
            method: "get", 
            url: id.length>0? `https://elite-ryde-management-api.azurewebsites.net/api/car?vendorId=${id}` : `https://elite-ryde-management-api.azurewebsites.net/api/car`
            // url: `https://elite-ryde-management-api.azurewebsites.net/api/car`
        })

        if(response?.data?.status)[
            setData(response?.data?.data)
        ]
        
    } catch (error: any) {
       if(error instanceof AxiosError){
        setError(error.message)
       }
       else{
        setError(error?.message)
       }
    }
    finally{
        setLoading(false)
    }
  }
  useEffect(() => {
    fetchHistory()
  }, [])
  console.log('carLoading, carData, carError', carData)
  return {carLoading, carData, carError}
}
