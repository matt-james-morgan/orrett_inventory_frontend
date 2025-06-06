import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Bin } from "@/types";

const GET_BINS_QUERY_KEY = "GET_BINS_QUERY_KEY";

const getBins = async (): Promise<Bin[]> => {
  const response = await axios.get("http://165.22.225.195:8080/api/bins");
  return response.data;
};

export const useGetBins = (options: { enabled: boolean }) => {
  return useQuery({
    queryKey: [GET_BINS_QUERY_KEY],
    queryFn: getBins,
    ...options,
  });
};
