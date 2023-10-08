import { baseURL } from "@/utils";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
export default function useFetchCars() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();
  async function fetchCars() {
    try {
        setLoading(true)
        const response = await axios({
            method: "get", 
            url: `${baseURL}/approvals`
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
    fetchCars()
  }, [])
  return {loading, data, error}
}
