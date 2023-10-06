import { baseURL } from "@/utils";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
export default function useFetchTransactions(id: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();
  async function fetchTransactions() {
    try {
        setLoading(true)
        const response = await axios({
            method: "get", 
            url: `https://elite-ryde-management-api.azurewebsites.net/api/get-vendor-transactions?id=${id}`
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
    fetchTransactions()
  }, [])
  return {loading, data, error}
}
