import { useState, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/services/api";

export interface UseAxiosProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: object;
  headers?: object;
}

export const useAxios = (axiosParams: UseAxiosProps) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState<AxiosError | unknown>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (params: object) => {
      try {
        const res: AxiosResponse = await api.request(params);

        setResponse(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(axiosParams);
  }, [axiosParams]);

  return { response, error, loading };
};
