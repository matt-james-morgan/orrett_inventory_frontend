import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface binCreateRequest {
  binName: string;
  description: string;
}

interface binDeleteRequest {
  binId: number;
}

const createBin = async (req: binCreateRequest) => {
  const response = await axios.post(`http://165.22.225.195/api/create/bin`, {
    binName: req.binName,
    description: req.description,
  });

  return response.data;
};

const deleteBin = async (req: binDeleteRequest) => {
  const response = await axios.post(`http://165.22.225.195/api/delete/bin`, {
    binId: req.binId,
  });

  return response.data;
};

export const useCreateBin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBin,
    onSuccess: () => {
      // This triggers refetching of the bins query
      queryClient.invalidateQueries({ queryKey: ["GET_BINS_QUERY_KEY"] });
    },
  });
};

export const useDeleteBin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBin,
    onSuccess: () => {
      // This triggers refetching of the bins query
      queryClient.invalidateQueries({ queryKey: ["GET_BINS_QUERY_KEY"] });
    },
  });
};
