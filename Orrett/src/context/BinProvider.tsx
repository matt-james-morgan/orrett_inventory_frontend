import React from "react";
import type { ReactNode } from "react";
import { useGetBins } from "@/queries/useGetBins";
import { BinContext } from "./BinContext";

export const BinProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useGetBins();
  const bins = data ?? [];

  return (
    <BinContext.Provider value={{ bins, isLoading }}>
      {children}
    </BinContext.Provider>
  );
};
