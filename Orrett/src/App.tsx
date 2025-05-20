import "./App.css";
import Card from "./components/Card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetTotal } from "./queries/useGetTotalBins";
import LoadingCard from "./components/LoadingCard";
import { useGetTotalInventory } from "./queries/useGetTotalInventory";
import { useMutBin } from "./queries/useMutBins";
import { Button, Modal, Typography, Box, TextField } from "@mui/material";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const { data: totalBins, isLoading } = useGetTotal();
  const { data: totalInventory } = useGetTotalInventory();
  const { mutate } = useMutBin();
  const [binModal, setBinModal] = useState(false);
  const [binName, setBinName] = useState("");

  const handleSubmit = () => {
    setBinModal(false);
    mutate({ bin_name: binName });
  };

  if (isLoading) {
    return <LoadingCard />;
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
          <Card title="Quick Actions">
            <Button variant="contained" onClick={() => setBinModal(true)}>
              Add Bin
            </Button>
          </Card>
        </div>
      </div>
      <Modal
        open={binModal}
        onClose={() => setBinModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-basic"
            label="Bin Name"
            variant="outlined"
            onChange={(e) => setBinName(e.target.value)}
          />
          <Button onClick={() => handleSubmit()}>submit</Button>
        </Box>
      </Modal>
    </QueryClientProvider>
  );
}

export default App;
