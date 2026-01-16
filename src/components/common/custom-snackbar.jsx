"use client";
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ message, severity = "success", duration = 4000, onClose }) => {
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;