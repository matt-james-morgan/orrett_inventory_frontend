import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface binRequest {
  bin_name: string;
}

const mutateBin = async (req: binRequest) => {
  const response = await axios.post(`http://localhost:8080/createBin`, {
    bin_name: req.bin_name,
  });

  return response.data;
};

export const useMutBin = () => {
  return useMutation({
    mutationFn: mutateBin,
  });
};
