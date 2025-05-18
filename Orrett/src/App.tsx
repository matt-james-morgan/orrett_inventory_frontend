import "./App.css";
import Card from "./components/Card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetTotal } from "./queries/getTotalBins";
import LoadingCard from "./components/LoadingCard";

const queryClient = new QueryClient();

function App() {
  const { data, isLoading } = useGetTotal();

  // if (isLoading) {
  //   return <LoadingCard />;
  // }

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
            amount={data?.totalBins ? data.totalBins : 0}
          />
          <Card
            title="Total Items"
            amount={data?.totalItems ? data.totalItems : 0}
          />
          <Card title="Quick Actions" />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
