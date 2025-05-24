import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ItemRequest {
  item_name: string;
  bin_id: string;
  description: string;
}

const mutateItem = async (req: ItemRequest) => {
  const response = await axios.post(`http://localhost:8080/create/item`, {
    item_name: req.item_name,
    description: req.description,
    bin_id: req.bin_id,
  });

  return response.data;
};

export const useMutItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutateItem,
    onSuccess: () => {
      // This triggers refetching of the Items query
      queryClient.invalidateQueries({ queryKey: ["GET_ITEMS_QUERY_KEY"] });
    },
  });
};
