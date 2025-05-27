import "./App.css";

import { useGetBins } from "./queries/useGetBins";
import LoadingCard from "./components/LoadingCard";
import Header from "./components/Header";
import type { Bin } from "./types";
import { TextField } from "@mui/material";
import BinCard from "./components/BinCard";

function App() {
  const { data: bins, isLoading } = useGetBins();

  if (isLoading) {
    return <LoadingCard />;
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight pb-12">
          Musical Theatre Inventory
        </h1>
      </div>
      <Header bins={bins} />
      <div style={{ padding: "16px 0", width: "100%" }}>
        <TextField
          label="Search bins and items..."
          variant="outlined"
          sx={{ width: "25%" }}
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {bins.map((bin: Bin) => (
          <BinCard
            key={bin.id}
            bin={bin}
            onDelete={(id) => console.log("Delete bin", id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
