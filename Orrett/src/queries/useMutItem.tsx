import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ItemRequest {
  itemName: string;
  binId: number;
}

interface DeleteItemRequest {
  itemId: number;
}

const createItem = async (req: ItemRequest) => {
  const response = await axios.post(
    `http://165.22.225.195:8080/api/create/item`,
    {
      itemName: req.itemName,
      binId: req.binId,
    }
  );
  return response.data;
};

const deleteItem = async (req: DeleteItemRequest) => {
  const response = await axios.delete(
    `http://165.22.225.195:8080/api/delete/item`,
    {
      data: { itemId: req.itemId },
    }
  );
  return response.data;
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      // Refetch bins/items after creating an item
      queryClient.invalidateQueries({ queryKey: ["GET_BINS_QUERY_KEY"] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BINS_QUERY_KEY"] });
    },
  });
};
