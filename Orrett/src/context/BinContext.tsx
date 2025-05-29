import { createContext, useContext } from "react";
import type { Bin } from "@/types";

export interface BinContextType {
  bins: Bin[];
  isLoading: boolean;
}

export const BinContext = createContext<BinContextType | undefined>(undefined);

export const useBinContext = () => {
  const context = useContext(BinContext);
  if (!context) {
    throw new Error("useBinContext must be used within a BinProvider");
  }
  return context;
};
