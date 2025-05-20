import "./App.css";
import Card from "./components/Card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetTotal } from "./queries/getTotalBins";
import LoadingCard from "./components/LoadingCard";
import { useEffect } from "react";
import { useGetTotalInventory } from "./queries/getTotalInventory";

const queryClient = new QueryClient();

function App() {
  const { data: totalBins, isLoading } = useGetTotal();
  const { data: totalInventory } = useGetTotalInventory();

  useEffect(() => {
    console.log("data", totalBins);
  }, [totalBins]);

  if (isLoading) {
    return <LoadingCard />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Inventory Tracker
          </h1>
        </div>
        <div className="flex flex-row space-y-6 justify-evenly gap-4">
          <Card
            title="Total Bins"
            amount={totalBins?.total_bins ? totalBins.total_bins : 0}
          />
          <Card
            title="Total Items"
            amount={
              totalInventory?.total_inventory
                ? totalInventory.total_inventory
                : 0
            }
          />
          <Card title="Quick Actions" />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
