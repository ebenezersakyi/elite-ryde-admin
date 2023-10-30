import { baseURL } from "@/utils";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

export default function useFetchSessions() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();

  async function fetchSessions() {
    try {
        setLoading(true)
        const response = await axios({
            method: "get", 
            url: `${baseURL}/get-sessions`
        })

        if(response?.status)[
          setData(response?.data?.data)
        ]
        console.log('response?.data?.data', response?.data)
        
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
    fetchSessions()
  }, [])
  return {loading, data, error}
}
