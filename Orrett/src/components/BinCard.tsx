import React from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import AddItem from "./AddItem";
import ItemList from "./ItemList";

interface Bin {
  id: number;
  binName?: string;
  description?: string;
}

interface BinCardProps {
  bin: Bin;
  onDelete?: (id: number) => void;
}

const BinCard = ({ bin, onDelete }: BinCardProps) => {
  return (
    <Paper
      elevation={3}
      className="p-4 flex flex-col justify-between"
      sx={{ minHeight: 150, minWidth: 250 }}
    >
      <Typography variant="h6">{bin.binName}</Typography>
      <Typography variant="body2" color="text.secondary">
        {bin.description}
      </Typography>

      <Box className="flex justify-between mt-4">
        <AddItem binName={bin.binName || ""} />
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => onDelete?.(bin.id)}
        >
          Delete
        </Button>
      </Box>
      <ItemList bin={} />
    </Paper>
  );
};

export default BinCard;
