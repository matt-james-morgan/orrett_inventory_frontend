import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TOTAL_QUERY_KEY = "totalQueryKey";

const getTotals = async () => {
  const response = await axios.get(
    `${import.meta.env.REACT_APP_API_URL}http://localhost:8080/api/v1/total`
  );
  return response.data;
};

export const useGetTotal = () => {
  return useQuery({
    queryKey: [TOTAL_QUERY_KEY],
    queryFn: getTotals,
  });
};
