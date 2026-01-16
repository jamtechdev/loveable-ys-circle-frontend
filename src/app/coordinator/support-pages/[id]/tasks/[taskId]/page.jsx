"use client";

import { use, useEffect, useState } from "react";
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
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import { volunteerService } from "../../../../../../lib/volunteer/volunteerService";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { supportService } from "../../../../../../lib/support/supportService";

export default function TaskDetailSignup({ params }) {
    // Unwrap params
    const unwrappedParams = use(params);
    const { id: supportPageId, taskId } = unwrappedParams;

    const [signups, setSignups] = useState([]);
  //  console.log(signups,"signups")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [deleteDialog, setDeleteDialog] = useState({ open: false, signupId: null, userName: "", VolentierId:null });
  //   console.log(deleteDialog,"deleteDialog")
    const [removing, setRemoving] = useState(false);

    // Fetch all signups for this task
    const fetchSignups = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await volunteerService.allSignupsByTask(taskId);
            setSignups(res?.data?.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch signups");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (taskId) fetchSignups();
    }, [taskId]);

      // Open remove confirmation dialog
    const handleRemoveClick = (signupId, userName, VolentierId) => {
        setDeleteDialog({ open: true, signupId, userName, VolentierId});
    };

    // Close remove confirmation dialog
    const handleRemoveCancel = () => {
        setDeleteDialog({ open: false, signupId: null, userName: "", VolentierId: null});
    };

    // Confirm remove volunteer
    const handleRemoveConfirm = async (signupId, VolentierId) => {
        try {
            setRemoving(true);
            await supportService.leaveSupportPage(signupId, VolentierId);
            
            // Close dialog
            setDeleteDialog({ open: false, signupId: null, userName: "" , VolentierId});
            
            // Refresh signups list
            await fetchSignups();
            
        } catch (err) {
            console.error("Error removing volunteer:", err);
            setError(err.response?.data?.message || "Failed to remove volunteer");
        } finally {
            setRemoving(false);
        }
    };

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Typography color="error" sx={{ py: 5, textAlign: "center" }}>
                {error}
            </Typography>
        );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Task Signups
            </Typography>

            {signups.length === 0 ? (
                <Typography>No users have signed up for this task.</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead sx={{ background: "#f5f5f5" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>User Name</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Signup Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Signed Up At</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Completed At</TableCell>
                                 <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {signups.map((signup) => (
                                <TableRow key={signup.id}>
                                    <TableCell>{signup.user?.name}</TableCell>
                                    <TableCell>{signup.user?.email}</TableCell>
                                    <TableCell>{signup.user?.phone || "-"}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={signup.status}
                                            color={
                                                signup.status === "completed"
                                                    ? "success"
                                                    : signup.status === "confirmed"
                                                        ? "primary"
                                                        : "default"
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {signup.signed_up_at
                                            ? new Date(signup.signed_up_at).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {signup.completed_at
                                            ? new Date(signup.completed_at).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {/* 👇 Remove Icon Button */}
                                        <IconButton 
                                            color="error"
                                            size="small"
                                            title="Remove Volunteer"
                                            onClick={() => handleRemoveClick(signup.task_id, signup.user?.name, signup.user?.id)}
                                        >
                                            <PersonRemoveIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
             {/* Remove Confirmation Dialog */}
            <Dialog
                open={deleteDialog.open}
                onClose={handleRemoveCancel}
                aria-labelledby="remove-dialog-title"
                aria-describedby="remove-dialog-description"
            >
                <DialogTitle id="remove-dialog-title">
                    Confirm Remove Volunteer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="remove-dialog-description">
                        Are you sure you want to remove "{deleteDialog.userName}" from this support page? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRemoveCancel} disabled={removing}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={()=>handleRemoveConfirm(deleteDialog.signupId, deleteDialog.VolentierId)} 
                        color="error" 
                        variant="contained"
                        disabled={removing}
                        startIcon={removing ? <CircularProgress size={20} /> : null}
                    >
                        {removing ? "Removing..." : "Remove"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
