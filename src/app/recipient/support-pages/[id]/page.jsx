"use client"
import {
    Container,
    Paper,
    Typography,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Chip,
    Grid,
    Button,
    CircularProgress,
} from "@mui/material";
import { recipientService } from "../../../../lib/recipient/recipientService";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AssignRecipientModal from "../../../../components/coordinator/assign-recipient-modal";
import CustomSnackbar from "../../../../components/common/custom-snackbar";

const DetailItem = ({ label, value }) => (
    <Box mb={1}>
        <Typography variant="subtitle2" color="textSecondary">
            {label}
        </Typography>
        <Typography variant="body1" component="div">
            {value || "-"}
        </Typography>
    </Box>
);

export default function DetailPage() {
    const [support, setSupport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [alert, setAlert] = useState({ type: "", message: "", show: false });
    
    const params = useParams();
    const { id } = params;

    const fetchSupportById = async () => {
        setLoading(true);
        try {
            const response = await recipientService.getRecipientSupportById(id);
            console.log(response, "lll")
            setSupport(response.data?.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load support details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSupportById();
    }, [id]);

    const handleAssignRecipientResponse = ({ success, error }) => {
        if (success) {
            setAlert({ type: "success", message: success, show: true });
            fetchSupportById(); // Refresh data after assignment
        }
        if (error) {
            setAlert({ type: "error", message: error, show: true });
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!support) {
        return null;
    }

    return (
        <Container sx={{ my: 4 }}>
            {alert?.show && (
                <CustomSnackbar
                    message={alert?.message}
                    onClose={() => setAlert({ type: "", message: "", show: false })}
                    duration={4000}
                    severity={alert?.type}
                />
            )}

            {/* Header Section */}
            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" fontWeight={700}>
                    Support Details
                </Typography>

                <Box>
                    {/* <Button 
                        variant="contained" 
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => setOpenPopup(true)}
                    >
                        Assign Recipient
                    </Button> */}
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        href={`/recipient/support-pages/${id}/tasks`}
                        sx={{ mr: 2 }}
                    >
                        Task List
                    </Button>

                    {/* <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        href={`/coordinator/support-pages/${id}/tasks/create`}
                    >
                        Create Task
                    </Button> */}
                </Box>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 3 }} elevation={6}>
                <Typography variant="h4" gutterBottom>
                    {support.title}
                </Typography>
                <Typography variant="body1" mb={3} component="div">
                    {support.story}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <DetailItem label="ID" value={support.id} />
                        <DetailItem
                            label="Special Instructions"
                            value={support.special_instructions}
                        />
                        <DetailItem
                            label="Communication Preference"
                            value={support.communication_preference}
                        />
                        <DetailItem
                            label="Status"
                            value={
                                support?.status ? (
                                    <Chip
                                        label={support.status.replace("_", " ").toUpperCase()}
                                        color={
                                            support.status === "draft"
                                                ? "default"
                                                : support.status === "pending_approval"
                                                    ? "warning"
                                                    : support.status === "active"
                                                        ? "success"
                                                        : "default"
                                        }
                                        size="small"
                                        variant={support.status === "draft" ? "outlined" : "filled"}
                                    />
                                ) : (
                                    <Chip label="NA" size="small" />
                                )
                            }
                        />
                        <DetailItem
                            label="Created At"
                            value={new Date(support.created_at).toLocaleString()}
                        />
                        <DetailItem label="Tasks Count" value={support.tasks_count} />
                        <DetailItem
                            label="Pending Tasks Count"
                            value={support.pending_tasks_count}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" mb={1}>
                            Support Reason
                        </Typography>
                        {support.support_reason && (
                            <>
                                <Typography variant="body2" component="div">
                                    ID: {support.support_reason.id}
                                </Typography>
                                <Typography variant="body2" component="div">
                                    Reason: {support.support_reason.reason}
                                </Typography>
                            </>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" mb={1}>
                            Coordinators
                        </Typography>
                        <List dense>
                            {support.coordinators && support.coordinators.length > 0 ? (
                                support.coordinators.map((coord) => (
                                    <ListItem key={coord.id} sx={{ pl: 0 }}>
                                        <ListItemText
                                            primary={coord.name}
                                            secondary={
                                                <>
                                                    <Typography variant="body2" component="div">
                                                        Email: {coord.email || "-"}
                                                    </Typography>
                                                    <Typography variant="body2" component="div">
                                                        Phone: {coord.phone || "-"}
                                                    </Typography>
                                                    <Typography variant="body2" component="div">
                                                        Last Login:{" "}
                                                        {coord.last_login_at
                                                            ? new Date(coord.last_login_at).toLocaleString()
                                                            : "-"}
                                                    </Typography>
                                                </>
                                            }
                                            secondaryTypographyProps={{ component: "div" }}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No coordinators assigned
                                </Typography>
                            )}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" mb={1}>
                            Recipients
                        </Typography>
                        <List dense>
                            {support.recipients && support.recipients.length > 0 ? (
                                support.recipients.map((recip) => (
                                    <ListItem key={recip.id} sx={{ pl: 0 }}>
                                        <ListItemText
                                            primary={recip.name}
                                            secondary={
                                                <>
                                                    <Typography variant="body2" component="div">
                                                        Email: {recip.email || "-"}
                                                    </Typography>
                                                    <Typography variant="body2" component="div">
                                                        Phone: {recip.phone || "-"}
                                                    </Typography>
                                                    <Typography variant="body2" component="div">
                                                        Relationship: {recip.relationship || "-"}
                                                    </Typography>
                                                    <Typography variant="body2" component="div">
                                                        Created At:{" "}
                                                        {recip.created_at
                                                            ? new Date(recip.created_at).toLocaleString()
                                                            : "-"}
                                                    </Typography>
                                                </>
                                            }
                                            secondaryTypographyProps={{ component: "div" }}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No recipients assigned
                                </Typography>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </Paper>

            {/* Assign Recipient Popup */}
            <AssignRecipientModal
                open={openPopup}
                onClose={() => setOpenPopup(false)}
                supportPageId={id}
                onSuccess={handleAssignRecipientResponse}
            />
        </Container>
    )
}
