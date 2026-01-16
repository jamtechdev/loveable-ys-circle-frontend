"use client";

import { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Chip
} from "@mui/material";
import { volunteerService } from "../../../lib/volunteer/volunteerService";

export default function VolunteerPage() {
    const [volunteers, setVolunteers] = useState({ data: [], current_page: 1, total_pages: 1 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const fetchVolunteers = async (pageNumber = 1) => {
        setLoading(true);
        setError(null);
        try {
            const res = await volunteerService.getAllVolunteers(pageNumber, '');
            setVolunteers(res?.data || { data: [], current_page: 1, total_pages: 1 });
        } catch (err) {
            console.error("Volunteer Fetch Error:", err);
            setError("Failed to fetch volunteers. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVolunteers(page);
    }, [page]);

    const getStatusChip = (isActive) => {
        if (isActive === null || isActive === undefined) return <Chip label="NA" size="small" />;
        return isActive ? (
            <Chip label="ACTIVE" color="success" size="small" />
        ) : (
            <Chip label="INACTIVE" color="default" size="small" variant="outlined" />
        );
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Volunteers
            </Typography>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : volunteers.data.length === 0 ? (
                <Typography>No volunteers found.</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableRow>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Phone</strong></TableCell>
                                    <TableCell><strong>Location</strong></TableCell>
                                    <TableCell><strong>Bio</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Last Login</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {volunteers?.data?.map((vol) => (
                                    <TableRow key={vol?.id} hover>
                                        <TableCell>{vol?.name}</TableCell>
                                        <TableCell>{vol?.email}</TableCell>
                                        <TableCell>{vol?.phone}</TableCell>
                                        <TableCell>{vol?.location || "-"}</TableCell>
                                        <TableCell>{vol?.bio || "-"}</TableCell>
                                        <TableCell>{getStatusChip(vol?.is_active)}</TableCell>
                                        <TableCell>
                                            {vol?.last_login_at
                                                ? new Date(vol?.last_login_at).toLocaleString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric"
                                                })
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Pagination
                            count={volunteers?.total_pages}
                            page={volunteers?.current_page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}
