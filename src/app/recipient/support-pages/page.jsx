"use client";
import { useEffect, useState } from "react";
import { recipientService } from "../../../lib/recipient/recipientService";
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
    IconButton,
    Box,
    Typography,
    Chip,
    Snackbar,
    Alert
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function SupportPageList() {
    const [supportPageList, setSupportPageList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


    const truncateWords = (text, wordLimit = 4) => {
        if (!text) return '-';

        const words = text.split(' ');

        if (words.length <= wordLimit) {
            return text;
        }

        return words.slice(0, wordLimit).join(' ') + '...';
    };


    const fetchThankYou = async (page) => {
        setLoading(true);
        await recipientService.getSupportList(page).then((data) => {
            console.log(data?.data.data, "++++++++++++  api/recipient/support-pages ");
            setSupportPageList(data?.data.data || []);
            setTotalPages(data?.total_pages || 1);
        }).catch((error) => {
            console.error("Error", error);
            setSnackbar({
                open: true,
                message: 'Failed to fetch support pages',
                severity: 'error'
            });
        }).finally(() => {
            setLoading(false);
        })
    }


    useEffect(() => {
        fetchThankYou(page);
    }, [page]);


    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };


    const handleSendThankyou = async (id) => {
        try {
            setLoading(true);
            const payload = { id: id };

            const response = await recipientService.sendThankyou(payload);

            console.log(response, "Thank you sent successfully");

            setSnackbar({
                open: true,
                message: 'Thank you sent successfully!',
                severity: 'success'
            });

            // Optionally refresh the list after sending
            await fetchThankYou(page);

        } catch (error) {
            console.error("Error sending thank you:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to send thank you',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    }


    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };


    // Format date from ISO string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Support Pages List
            </Typography>


            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Special Instructions</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Communication Preference</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Support Reason</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>View</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {supportPageList.length > 0 ? (
                                    supportPageList.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:hover': { backgroundColor: '#fafafa' } }}
                                        >
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell sx={{ maxWidth: 300 }}>
                                                {truncateWords(item.special_instructions, 4)}
                                            </TableCell>

                                            <TableCell>
                                                <Chip
                                                    label={item.communication_preference}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>{formatDate(item.created_at)}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.status.replace('_', ' ')}
                                                    size="small"
                                                    color={item.status === 'pending_approval' ? 'warning' : 'success'}
                                                />
                                            </TableCell>
                                            <TableCell>{item.support_reason?.reason || '-'}</TableCell>
                                            <TableCell>
                                                <Link href={`/recipient/support-pages/${item.id}`}>
                                                    <IconButton color="primary">
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Link>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <Typography variant="body2" color="text.secondary">
                                                No support pages found
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                            disabled={loading}
                        />
                    </Box>
                </>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
