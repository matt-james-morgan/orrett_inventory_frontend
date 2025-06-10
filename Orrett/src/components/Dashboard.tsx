import React, { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import type { Bin } from "@/types";
import { useGetBins } from "@/queries/useGetBins";
import { Button } from "../components/ui/button";
import { TextField } from "@mui/material";
import BinCard from "../components/BinCard";
import Header from "../components/Header";
import LoadingCard from "../components/LoadingCard";

const Dashboard = () => {
  const { auth, logout } = useUserContext();
  const [bins, setBins] = useState<Bin[]>([]);

  const [searchWord, setSearchWord] = useState("");
  const { data, isLoading } = useGetBins({
    enabled: auth,
  });
  useEffect(() => {
    const sortedBins = data
      ? [...data].sort((a: Bin, b: Bin) => a.id - b.id)
      : [];
    if (sortedBins) {
      setBins(
        searchWord
          ? sortedBins.filter((bin) =>
              bin.name?.toLowerCase().includes(searchWord.toLowerCase())
            )
          : sortedBins
      );
    }
  }, [data, searchWord]);
  if (isLoading) {
    return <LoadingCard />;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight pb-12">
          Musical Theatre Inventory
        </h1>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Header bins={bins} />
      <div style={{ padding: "16px 0", width: "100%" }}>
        <TextField
          label="Search bins and items..."
          variant="outlined"
          sx={{ width: "25%" }}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {bins.map((bin: Bin) => (
          <BinCard key={bin.id} bin={bin} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
