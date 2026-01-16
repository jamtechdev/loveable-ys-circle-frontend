"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supportService } from "../../../lib/support/supportService";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    CircularProgress,
    Button,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { volunteerService } from "../../../lib/volunteer/volunteerService";

export default function Pages() {
    const [pages, setPages] = useState();
        console.log(pages,"page")
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchPages = async (page = 1) => {
        setLoading(true);
        try {
            const res = await volunteerService.getAssignedSupport(page);
            setPages(res?.data);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages(page);
    }, [page]);

    const status = (value) => {
        if (!value) return "NA";
        return value?.replace(/_/g, " ");
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" fontWeight={700}>Assigned Support Pages</Typography>
                
            </Box>

            {/* Table */}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                    <CircularProgress />
                </Box>
            ) : pages?.data?.length === 0 ? (
                <Typography>No Support Pages Found.</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableRow>
                                    <TableCell><strong>Title</strong></TableCell>
                                    <TableCell><strong>Support Reason</strong></TableCell>
                                    <TableCell><strong>Preference</strong></TableCell>
                                    <TableCell><strong>Co-ordinator</strong></TableCell>
                                    <TableCell><strong>Tasks</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Created At</strong></TableCell>
                                    <TableCell><strong>View</strong></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {pages?.data?.map((item) => (
                                    <TableRow key={item?.id} hover>
                                        <TableCell>{item?.title}</TableCell>
                                        <TableCell>{item?.support_reason?.reason}</TableCell>
                                        <TableCell>{item?.communication_preference}</TableCell>
                                        <TableCell>
                                            {item.coordinators?.length > 0 ? item.coordinators.map(r => r.name).join(", ") : "—"}
                                        </TableCell>
                                        <TableCell>{item?.tasks_count}</TableCell>
                                        <TableCell className="capitalize">{status(item?.status)}</TableCell>
                                        <TableCell>
                                            {new Date(item.created_at).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/volunteer/support-pages/${item.id}`}>
                                                <IconButton color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Pagination
                            count={pages?.total_pages}
                            page={page?.current_page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}
