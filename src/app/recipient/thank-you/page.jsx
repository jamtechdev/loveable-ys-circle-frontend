"use client";
import { useEffect, useState } from "react";
import { recipientService } from "../../../lib/recipient/recipientService";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    CircularProgress,
    Box,
    Pagination,
} from "@mui/material";

export default function ThankYouListPage() {
    const [thankYouList, setThankYouList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
        await recipientService.getThankYouList(page).then((data) => {
            console.log(data?.data.data, "++++++++++++  api/recipient/support-pages ");
            setThankYouList(data?.data.data || []);
            setTotalPages(data?.data.total_pages || 1);
        }).catch((error) => {
            console.error("Error", error);
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

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading && thankYouList.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Thank You List
            </Typography>

            <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Support Page Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Story</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Special Instructions</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Sender</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Sent At</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {thankYouList.length > 0 ? (
                            thankYouList.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:hover': { backgroundColor: '#fafafa' } }}
                                >
                                    <TableCell>{item.support_page?.title || '-'}</TableCell>
                                    <TableCell sx={{ maxWidth: 300 }}>
                                        {truncateWords(item.support_page?.story || '-', 4)}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 250 }}>
                                        {truncateWords(item.support_page?.special_instructions || '-', 4)}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 300 }}>
                                        {item.message || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {item.sender ? (
                                            <>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {item.sender.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {item.sender.email}
                                                </Typography>
                                            </>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell>{formatDate(item.sent_at)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.support_page?.status?.replace('_', ' ').toUpperCase() || 'N/A'}
                                            size="small"
                                            color={item.support_page?.status === 'active' ? 'success' : 'default'}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No thank you messages found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </Box>
    );
}
