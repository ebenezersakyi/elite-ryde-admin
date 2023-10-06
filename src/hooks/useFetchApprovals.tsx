import { baseURL, formatContent } from "@/utils";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetchApprovals() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();

  async function getSingleApproval() {
    try {
      setData(true);
      const response = await axios({
        url: `${baseURL}/pending-approvals`,
        method: 'get'
      });
      if (response?.data?.status) {
        setData({...response?.data?.data, content: formatContent(response?.data?.data?.content)[0], docs:formatContent(response?.data?.data?.content)[1] });
      } else {
        setError(response?.data?.message);
      }
    } catch (error: any) {
      if (error instanceof axios.AxiosError) {
        setError(error.message);
      } else {
        setError(error?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
        getSingleApproval()
  }, [])

  return { loading, error, data };
}
