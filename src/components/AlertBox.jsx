import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const AlertBox = ({ open, setOpen }) => {
  return (
    <div style={{ width: "30%", marginLeft: "35%", display: "fixed" }}>
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Collapse in={open}>
          <Alert
            variant="outlined"
            action={
              <IconButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                {/* <CloseIcon></CloseIcon> */}
              </IconButton>
            }
          >
            <AlertTitle>
              <strong>Success</strong>
            </AlertTitle>
            Saved Successfully.
          </Alert>
        </Collapse>
      </Box>
    </div>
  );
};
