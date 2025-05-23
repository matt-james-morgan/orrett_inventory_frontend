import React, { useState } from "react";
import {
  Modal,
  TextField,
  Box,
  Button,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { useMutBin } from "../queries/useMutBins";

interface AddBinModalProps {
  binModal: boolean;
  setBinModal: (open: boolean) => void;
}

const AddBinModal: React.FC<AddBinModalProps> = ({ binModal, setBinModal }) => {
  const [binName, setBinName] = useState("");
  const [description, setDescription] = useState("");
  const { mutate } = useMutBin();

  const handleSubmit = () => {
    setBinModal(false);
    mutate({ bin_name: binName, description: description });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "25px",
    p: 4,
  };

  return (
    <div>
      <Modal
        open={binModal}
        onClose={() => setBinModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <Typography
                color="primary"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                Add New Bin
              </Typography>
              <Typography color="grey" variant="body1">
                Create a new bin to organize your items.
              </Typography>
            </div>
            <div onClick={() => setBinModal(false)}>x</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <Typography variant="h6">Name</Typography>
            <TextField
              id="outlined-basic"
              label="Eg Kitchen Supplies"
              variant="outlined"
              onChange={(e) => setBinName(e.target.value)}
              fullWidth
              size="small"
              slotProps={{
                root: {
                  sx: {
                    borderRadius: 2, // theme.spacing unit (8px)
                    "& fieldset": {
                      borderRadius: 2, // apply to the border itself
                    },
                  },
                },
              }}
            />
            <Typography variant="h6">Description(Optional)</Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Add a description for this bin"
              style={{
                resize: "none",
                border: "1px solid lightgrey",
                borderRadius: "10px",
                padding: 5,
                width: "100%",
              }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Bin
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddBinModal;
