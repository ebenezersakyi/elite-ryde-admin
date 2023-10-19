import { baseURL } from "@/utils";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

export default function useFetchFeedback() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();
  async function fetchFeedback() {
    try {
        setLoading(true)
        const response = await axios({
            method: "get", 
            url: `https://elite-ryde-management-api.azurewebsites.net/api/contact-us-get`
        })

        if(response?.data?.success)[
          setData(response?.data?.data)
        ]
        // console.log('response?.data?.data', response?.data?.data)
        
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
    fetchFeedback()
  }, [])
  return {loading, data, error}
}
