import { baseURL } from "@/utils";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetchStats() {
  const [data, setData] = useState<any>();
  async function fetchStats() {
    try {
      const response = await axios({
        url: `${baseURL}/statistics`,
        method: "get",
      });
      if (response?.data?.status) {
        setData(response?.data?.data);
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchStats();
  }, []);

  return { data };
}
