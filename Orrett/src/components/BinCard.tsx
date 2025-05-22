import React from "react";
import { Button, Box, Typography, Paper } from "@mui/material";

interface Bin {
  id: number;
  name: string;
}

interface BinCardProps {
  bin: Bin;
  onDelete?: (id: number) => void;
  onAddItem?: (id: number) => void;
}

const BinCard = ({ bin, onDelete, onAddItem }: BinCardProps) => {
  return (
    <Paper
      elevation={3}
      className="p-4 flex flex-col justify-between"
      sx={{ minHeight: 150, minWidth: 250 }}
    >
      <Typography variant="h6">{bin.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        ID: {bin.id}
      </Typography>

      <Box className="flex justify-between mt-4">
        <Button
          variant="contained"
          size="small"
          onClick={() => onAddItem?.(bin.id)}
        >
          Add Item
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => onDelete?.(bin.id)}
        >
          Delete
        </Button>
      </Box>
    </Paper>
  );
};

export default BinCard;
