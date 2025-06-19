import { useState } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import { useTheme } from "@mui/material/styles";
import type { Bin } from "../types";
import { useDeleteBin } from "@/queries/useMutBins";
import { useNavigate } from "react-router-dom";

interface BinCardProps {
  bin: Bin;
}

const BinCard = ({ bin }: BinCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const deleteBin = useDeleteBin();

  const [itemsView, setItemsView] = useState(false);

  const handleDelete = (binId: number) => {
    deleteBin.mutate({ binId: binId });
  };

  return (
    <Paper
      elevation={3}
      className="p-4 flex flex-col justify-between gap-4"
      sx={{ minHeight: 150, minWidth: 250 }}
    >
      <Typography variant="h6">{bin.name}</Typography>
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          navigate(`/bin/${bin.id}`);
        }}
      >
        View Details
      </Button>
      <Typography variant="body2" color="text.secondary">
        {bin.description}
      </Typography>

      <Typography variant="body1" sx={{ color: theme.palette.grey[800] }}>
        {bin.items.length} items
      </Typography>

      <Box className="flex justify-between mt-4">
        <AddItem bin={bin || ""} />

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(bin.id)}
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
