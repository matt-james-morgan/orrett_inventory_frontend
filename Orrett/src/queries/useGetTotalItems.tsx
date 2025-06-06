import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TOTAL_ITEMS_QUERY_KEY = "totalItemsQueryKey";

const getTotalItems = async () => {
  const response = await axios.get(`165.22.225.195/api/totalItems`);
  return response.data;
};

export const useGetTotalItems = () => {
  return useQuery({
    queryKey: [TOTAL_ITEMS_QUERY_KEY],
    queryFn: getTotalItems,
  });
};
