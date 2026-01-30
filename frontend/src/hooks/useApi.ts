import { useState } from "react";
import type { AxiosResponse } from "axios";

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = async (promise: Promise<AxiosResponse<T>>) => {
    try {
      setLoading(true);
      setError(null);

      const res = await promise; // Axios response
      console.log("API Response:", res);
      setData(res.data); // unwrap data
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, call };
}
