import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GET_BINS_QUERY_KEY = "GET_BINS_QUERY_KEY";

const getBins = async () => {
  const response = await axios.get(`http://localhost:8080/bins`);

  return response.data;
};

export const useGetBins = () => {
  return useQuery({
    queryKey: [GET_BINS_QUERY_KEY],
    queryFn: getBins,
  });
};
