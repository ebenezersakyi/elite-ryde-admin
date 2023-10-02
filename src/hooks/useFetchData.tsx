import { baseURL } from "@/utils";
import axios from "axios";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";

export default function useFetchData(query: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();

  async function fetchdata() {
    try {
      setLoading(true);
      const response = await axios({
        url: `${baseURL}/get-data?type=${query}`,
        method: "get",
      });
      if (response?.data?.status) {
        setData(response?.data?.data);
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError(error?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return { loading, data, error };
}
