import React, { useState } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import { useTheme } from "@mui/material/styles";
import type { Bin } from "../types";

interface BinCardProps {
  bin: Bin;
  onDelete?: (id: number) => void;
}

const BinCard = ({ bin, onDelete }: BinCardProps) => {
  const theme = useTheme();

  const [itemsView, setItemsView] = useState(false);

  return (
    <Paper
      elevation={3}
      className="p-4 flex flex-col justify-between gap-4"
      sx={{ minHeight: 150, minWidth: 250 }}
    >
      <Typography variant="h6">{bin.binName}</Typography>
      <Typography variant="body2" color="text.secondary">
        {bin.description}
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.grey[800] }}>
        {bin.items.length} items
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
      {itemsView ? (
        <>
          <ItemList items={bin.items} />
          <Button onClick={() => setItemsView((prev: boolean) => !prev)}>
            Hide Items
          </Button>
        </>
      ) : (
        <Button onClick={() => setItemsView((prev: boolean) => !prev)}>
          View Items
        </Button>
      )}
    </Paper>
  );
};

export default BinCard;
