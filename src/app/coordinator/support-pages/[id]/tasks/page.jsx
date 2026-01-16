"use client";
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { taskService } from "../../../../../lib/tasks/taskService";
import { supportService } from "../../../../../lib/support/supportService";

export default function TasksList({ params }) {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const [tasks, setTasks] = useState();
    console.log(tasks,"taskstasks")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   const [deleteDialog, setDeleteDialog] = useState({ open: false, taskId: null, taskTitle: "" });
    const [deleting, setDeleting] = useState(false);

    const fetchTasks = async function () {
        try {
            setLoading(true);
            setError(null);
            const response = await taskService.getTasks(id);
            setTasks(response?.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError(err.response?.data?.message || "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(function () {
        if (id) {
            fetchTasks();
        }
    }, [id]);

    const getStatusColor = function (status) {
        if (status === 'completed') return 'success';
        if (status === 'pending') return 'warning';
        return 'error';
    };

    const formatDate = function (dateString) {
        return new Date(dateString).toLocaleDateString();
    };

      // Open delete confirmation dialog
    const handleDeleteClick = (taskId, taskTitle) => {
        setDeleteDialog({ open: true, taskId, taskTitle });
    };

    // Close delete confirmation dialog
    const handleDeleteCancel = () => {
        setDeleteDialog({ open: false, taskId: null, taskTitle: "" });
    };

    // Confirm delete
    const handleDeleteConfirm = async () => {
        try {
            setDeleting(true);
            await supportService.deleteTask(deleteDialog.taskId);
            
            // Close dialog
            setDeleteDialog({ open: false, taskId: null, taskTitle: "" });
            
            // Refresh task list
            await fetchTasks();
            
            // You can add a success snackbar here if you want
        } catch (err) {
            console.error("Error deleting task:", err);
            setError(err.response?.data?.message || "Failed to delete task");
        } finally {
            setDeleting(false);
        }
    };


    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight={700}>Task List</Typography>
                    <Button variant="contained" component={Link} href={`/coordinator/support-pages/${id}/tasks/create`}>
                        Create Task
                    </Button>
                </Box>
                <Paper sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                    <CircularProgress size={40} />
                    <Typography sx={{ ml: 2 }}>Loading tasks...</Typography>
                </Paper>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight={700}>Task List</Typography>
                    <Button variant="contained" component={Link} href={`/coordinator/support-pages/${id}/tasks/create`}>
                        Create Task
                    </Button>
                </Box>
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2 }}
                        onClick={fetchTasks}
                    >
                        Retry
                    </Button>
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Header Section */}
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" fontWeight={700}>
                    Task List ({tasks?.data?.length})
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    href={`/coordinator/support-pages/${id}/tasks/create`}
                >
                    Create Task
                </Button>
            </Box>

            {/* Custom Table */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Description</TableCell>
                                  <TableCell sx={{ fontWeight: 700, }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Support Title</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Scheduled</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, }}>View signup</TableCell>
                                 <TableCell sx={{ fontWeight: 700, }}>Pending Signup</TableCell>
                                  <TableCell sx={{ fontWeight: 700, }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks?.data?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                                        <Typography>No tasks found. Create your first task!</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tasks?.data?.map((task) => (
                                    <TableRow key={task.id} hover>
                                        {/* Title */}
                                        <TableCell>
                                            <Typography variant="body2" sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {task?.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {task?.category?.name}
                                        </TableCell>
                                        <TableCell>
                                            {task?.description}
                                        </TableCell>
                                         <TableCell>
                                            {task?.location ? task?.location :"-" }
                                        </TableCell>
                                        <TableCell>
                                            {task?.support_page?.title}
                                        </TableCell>
                                        <TableCell>
                                            {task.scheduled_at ? formatDate(task.scheduled_at) : "—"}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Chip
                                                label={task.status?.toUpperCase()}
                                                color={getStatusColor(task.status)}
                                                size="small"
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Link
                                                href={`/coordinator/support-pages/${id}/tasks/${task?.id}`}
                                            >
                                                <IconButton color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                        
                                          <TableCell>
                                            <Link
                                                href={`/coordinator/support-pages/${id}/tasks/${task?.id}/pending-signup`}
                                            >
                                                <IconButton color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                         <TableCell>
                                           <Link href={`/coordinator/support-pages/${id}/tasks/${task?.id}/update`}>
                                                    <IconButton 
                                                        color="secondary"
                                                        size="small"
                                                        title="Edit Task"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                 <IconButton 
                                                    color="error"
                                                    size="small"
                                                    title="Delete Task"
                                                    onClick={() => handleDeleteClick(task?.id, task?.title)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
             <Dialog
                open={deleteDialog.open}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete the task "{deleteDialog.taskTitle}"? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDeleteConfirm} 
                        color="error" 
                        variant="contained"
                        disabled={deleting}
                        startIcon={deleting ? <CircularProgress size={20} /> : null}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
