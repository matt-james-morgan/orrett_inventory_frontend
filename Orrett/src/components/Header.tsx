import { useState } from "react";
import Card from "./Card";
import { useGetTotalInventory } from "../queries/useGetTotalInventory";
import { Button, Modal, Box, TextField } from "@mui/material";
import { useMutBin } from "../queries/useMutBins";
import type { Bin } from "../types";
import AddBinModal from "./AddBinModal";

interface BinListProps {
  bins: Bin[];
}

const Header = ({ bins }: BinListProps) => {
  const { data: totalInventory } = useGetTotalInventory();
  const { mutate } = useMutBin();
  const [binModal, setBinModal] = useState(false);
  const [binName, setBinName] = useState("");

  const handleSubmit = () => {
    setBinModal(false);
    mutate({ bin_name: binName });
  };

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
    <div className="flex gap-4 items-stretch">
      <Card title="Total Bins" amount={bins ? bins.length : 0}></Card>
      <Card
        title="Total Items"
        amount={
          totalInventory?.total_inventory ? totalInventory.total_inventory : 0
        }
      />
      <Card title="Quick Actions">
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0F1226" }}
            onClick={() => setBinModal(true)}
          >
            Add Bin
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#0F1226" }}>
            Add Item
          </Button>
        </div>
      </Card>
      <AddBinModal binModal={binModal} setBinModal={setBinModal} />
    </div>
  );
};

export default Header;
