"use client";
import {
    Typography,
    Box,
} from "@mui/material";

export default function Error({error}) {

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        </>
    )
}