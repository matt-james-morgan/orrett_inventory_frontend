import React from "react";
import type { ReactNode } from "react";
import { useGetBins } from "@/queries/useGetBins";
import { BinContext } from "./BinContext";
import type { Bin } from "@/types";
import { useUserContext } from "./UserContext";

export const BinProvider = ({ children }: { children: ReactNode }) => {
  const { auth } = useUserContext();
  const { data, isLoading } = useGetBins({
    enabled: auth,
  });
  const bins = data ? [...data].sort((a: Bin, b: Bin) => a.id - b.id) : [];

  return (
    <BinContext.Provider value={{ bins, isLoading }}>
      {children}
    </BinContext.Provider>
  );
};
