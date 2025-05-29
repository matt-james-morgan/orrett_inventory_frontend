import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ItemRequest {
  itemName: string;
  binId: number;
}

const mutateItem = async (req: ItemRequest) => {
  const response = await axios.post(`http://localhost:8080/create/item`, {
    itemName: req.itemName,
    binId: req.binId,
  });

  return response.data;
};

export const useMutItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutateItem,
    onSuccess: () => {
      // This triggers refetching of the Items query
      queryClient.invalidateQueries({ queryKey: ["GET_BINS_QUERY_KEY"] });
    },
  });
};
