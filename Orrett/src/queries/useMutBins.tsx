import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface binRequest {
  binName: string;
  description: string;
}

const mutateBin = async (req: binRequest) => {
  const response = await axios.post(`http://localhost:8080/create/bin`, {
    binName: req.binName,
    description: req.description,
  });

  return response.data;
};

export const useMutBin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutateBin,
    onSuccess: () => {
      // This triggers refetching of the bins query
      queryClient.invalidateQueries({ queryKey: ["GET_BINS_QUERY_KEY"] });
    },
  });
};
