"use client"
import React, { useEffect, useState } from "react";
import {
    Typography,
    Table,
    TableBody,
    IconButton,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    CircularProgress,
    Box,
    Pagination,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Snackbar,
    Alert,
} from "@mui/material";
import { recipientService } from "../../../../../lib/recipient/recipientService";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export default function TaskPage({ params }) {
    const [loading, setLoading] = useState(false);
    const [tasklist, setTaskList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedVolunteers, setSelectedVolunteers] = useState([]);
    console.log(selectedVolunteers,"selectedVolunteers")
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const resolvedParams = React.use(params);
    const { id } = resolvedParams;

    const currentUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};
    //   console.log(currentUser, "currentUser");
    const recipientId = currentUser.id;
    const router = useRouter()


    const fetchTaklist = async (page) => {
        setLoading(true);
        try {
            const response = await recipientService.getRecipientTaskList(id, page);
            console.log(response.data.data, "lll")
            setTaskList(response.data?.data || []);
            setTotalPages(response.data?.total_pages || 1);
        } catch (err) {
            console.error(err);
            setError("Failed to load task list");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaklist(page);
    }, [id, page]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'success';
            case 'pending':
                return 'warning';
            case 'in_progress':
                return 'info';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleOpenModal = () => {
        // Collect all volunteers from all tasks
        const allVolunteers = [];
        tasklist.forEach((task) => {
            if (task.volunteers && task.volunteers.length > 0) {
                task.volunteers.forEach((volunteer) => {
                    allVolunteers.push({
                        ...volunteer,
                        taskTitle: task.title,
                        taskId: task.id,
                        supportPageId: task.support_page?.id || id,
                    });
                });
            }
        });
        setSelectedVolunteers(allVolunteers);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedVolunteers([]);
    };

    const handleSendThankyou = async (volunteer) => {
       
        try {
            const payload = {
                task_id:volunteer.taskId,
                support_page_id: volunteer.supportPageId,
                recipient_id: recipientId,
                helper_id: volunteer.id,
                message: "Thank you for your wonderful contribution and support!"
            };

            console.log("Sending payload:", payload);

            const response = await recipientService.sendThankyou(payload);

            console.log(response, "Thank you sent successfully");

            setSnackbar({
                open: true,
                message: 'Thank you sent successfully!',
                severity: 'success'
            });
            setTimeout(() => {
                setOpenModal(false);
                router.push('/recipient/thank-you');
            }, 1500);
        } catch (error) {
            console.error("Error sending thank you:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to send thank you',
                severity: 'error'
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading && tasklist.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Task List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenModal}
                    disabled={tasklist.length === 0}
                >
                    Send Thank You
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Support Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Scheduled</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasklist.length > 0 ? (
                            tasklist.map((task) => (
                                <TableRow
                                    key={task.id}
                                    sx={{ '&:hover': { backgroundColor: '#fafafa' } }}
                                >
                                    <TableCell>{task.title || '-'}</TableCell>
                                    <TableCell>{task.category?.name || '-'}</TableCell>
                                    <TableCell sx={{ maxWidth: 400 }}>
                                        {task.description || '-'}
                                    </TableCell>
                                    <TableCell>{task.support_page?.title || '-'}</TableCell>
                                    <TableCell>{formatDate(task.scheduled_at)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={task.status?.replace('_', ' ').toUpperCase() || 'N/A'}
                                            size="small"
                                            color={getStatusColor(task.status)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No tasks found
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

            {/* Modal for sending thank you to all volunteers */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Send Thank You to Volunteers</DialogTitle>
                <DialogContent>
                    {selectedVolunteers.length > 0 ? (
                        <List>
                            {selectedVolunteers.map((volunteer, index) => (
                                <ListItem
                                    key={`${volunteer.id}-${index}`}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1,
                                        mb: 1,
                                        p: 2
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6">
                                                {volunteer.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body2" component="div">
                                                    Email: {volunteer.email || '-'}
                                                </Typography>
                                                <Typography variant="body2" component="div">
                                                    Phone: {volunteer.phone || '-'}
                                                </Typography>
                                                <Typography variant="body2" component="div">
                                                    Task: {volunteer.taskTitle}
                                                </Typography>
                                            </>
                                        }
                                        secondaryTypographyProps={{ component: "div" }}
                                    />
                                    {!volunteer.is_thankyou ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleSendThankyou(volunteer)}
                                            sx={{ alignSelf: 'center' }}
                                        >
                                            Send Thank You
                                        </Button>
                                    ) : (
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                alignSelf: 'center',
                                                color: 'text.secondary',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            -
                                        </Typography>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1" color="text.secondary" align="center">
                            No volunteers found to send thank you
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
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
