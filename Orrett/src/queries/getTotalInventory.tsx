import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TOTAL_INVENTORY_QUERY_KEY = "totalInventoryQueryKey";

const getTotalInventory = async () => {
  console.log("getTotal inventory");
  const response = await axios.get(`http://localhost:8080/totalInventory`);
  console.log("response", response);
  return response.data;
};

export const useGetTotalInventory = () => {
  return useQuery({
    queryKey: [TOTAL_INVENTORY_QUERY_KEY],
    queryFn: getTotalInventory,
  });
};
