"use client"

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { supportService } from "../../../../../../../lib/support/supportService";
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomSnackbar from "../../../../../../../components/common/custom-snackbar";

export default function PendigSignups() {
    const params = useParams();
    const { id: supportPageId, taskId } = params;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pendingSigupList, setPendingSignupList] = useState([]);
    const [approving, setApproving] = useState(null); // Track which signup is being approved
    const [rejecting, setRejecting] = useState(null); // Track which signup is being rejected
    const [alert, setAlert] = useState({ type: "", message: "", show: false });

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Truncate description to 4 words
    const truncateText = (text, wordLimit = 4) => {
        if (!text) return 'N/A';
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    // Handle approve signup
    const handleApprove = async (signupId) => {
        try {
            setApproving(signupId);
            await supportService.approveSignup(signupId);
            setAlert({
                type: "success",
                message: "Signup approved successfully!",
                show: true,
            });
            // Refresh the list after approval
            const response = await supportService.getSignupApprovallist(taskId);
            setPendingSignupList(response.data.data);
        } catch (err) {
            console.error("Error approving signup:", err);
            setAlert({
                type: "error",
                message: err.response?.data?.message || "Failed to approve signup",
                show: true,
            });
        } finally {
            setApproving(null);
        }
    };

    // Handle reject signup
    const handleReject = async (signupId) => {
        try {
            setRejecting(signupId);
            await supportService.rejectSignup(signupId);
            setAlert({
                type: "success",
                message: "Signup rejected successfully!",
                show: true,
            });
            // Refresh the list after rejection
            const response = await supportService.getSignupApprovallist(taskId);
            setPendingSignupList(response.data.data);
        } catch (err) {
            console.error("Error rejecting signup:", err);
            setAlert({
                type: "error",
                message: err.response?.data?.message || "Failed to reject signup",
                show: true,
            });
        } finally {
            setRejecting(null);
        }
    };

    // Fetch task details and pre-populate form
    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                setLoading(true);
                const response = await supportService.getSignupApprovallist(taskId);
                setPendingSignupList(response.data.data);
            } catch (err) {
                console.error("Error fetching task:", err);
                setError("Failed to load task details");
            } finally {
                setLoading(false);
            }
        };

        if (taskId) {
            fetchTaskDetails();
        }
    }, [taskId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box p={3}>
            {alert?.show && (
                <CustomSnackbar
                    message={alert?.message}
                    onClose={() => setAlert({ type: "", message: "", show: false })}
                    duration={4000}
                    severity={alert?.type}
                />
            )}
            <Typography variant="h4" gutterBottom>
                Pending Signups
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>User Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Task Title</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Signed Up At</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Approval</strong></TableCell>
                            <TableCell><strong>Reject</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingSigupList && pendingSigupList.length > 0 ? (
                            pendingSigupList.map((signup) => (
                                <TableRow key={signup.id}>
                                    <TableCell>{signup.user?.name || 'N/A'}</TableCell>
                                    <TableCell>{signup.user?.email || 'N/A'}</TableCell>
                                    <TableCell>{signup.task?.title || 'N/A'}</TableCell>
                                    <TableCell>
                                        {truncateText(signup.task?.description)}
                                    </TableCell>
                                    <TableCell>
                                        {signup.signed_up_at ? formatDate(signup.signed_up_at) : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={signup.status || 'N/A'}
                                            color={signup.status === 'signed_up' ? 'primary' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            startIcon={<CheckCircleIcon />}
                                            onClick={() => handleApprove(signup.id)}
                                            disabled={approving === signup.id || rejecting === signup.id || signup.status !== 'signed_up'}
                                        >
                                            {approving === signup.id ? 'Approving...' : 'Approve'}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            startIcon={<CancelIcon />}
                                            onClick={() => handleReject(signup.id)}
                                            disabled={approving === signup.id || rejecting === signup.id || signup.status !== 'signed_up'}
                                        >
                                            {rejecting === signup.id ? 'Rejecting...' : 'Reject'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No pending signups available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
