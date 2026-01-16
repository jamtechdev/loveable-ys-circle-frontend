"use client";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useState } from "react";

export default function NewRequest() {
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className=" p-8">
      <Typography variant="h4">Submit New Request</Typography>
      {submitted ? (
        <Typography color="primary" className=" mt-4">
          Request submitted!
        </Typography>
      ) : (
        <Box component="form" className=" mt-6" onSubmit={handleSubmit}>
          <TextField
            label="Request Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            required
            className=" mb-4"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      )}
    </div>
  );
}
