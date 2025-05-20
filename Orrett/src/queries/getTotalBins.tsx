import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TOTAL_QUERY_KEY = "totalQueryKey";

const getTotals = async () => {
  console.log("getTotals");
  const response = await axios.get(`http://localhost:8080/totalBins`);
  console.log("response", response);
  return response.data;
};

export const useGetTotal = () => {
  return useQuery({
    queryKey: [TOTAL_QUERY_KEY],
    queryFn: getTotals,
  });
};
