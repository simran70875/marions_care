import { useState } from "react";
import type { AxiosResponse } from "axios";
import toast from "react-hot-toast";

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = async (promise: Promise<AxiosResponse<T>>) => {
    try {
      setLoading(true);
      setError(null);

      const res = await promise; // Axios response
      setData(res.data); // unwrap data
      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong";

      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, call };
}
