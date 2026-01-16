"use client";
import React, { useEffect, useState } from "react";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
    MenuItem,
    Alert,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { taskService } from "../../../../../../../lib/tasks/taskService";
import CustomSnackbar from "../../../../../../../components/common/custom-snackbar";
import { supportService } from "../../../../../../../lib/support/supportService";

export default function EditTask() {
    const params = useParams();
    const router = useRouter();
    const { id: supportPageId, taskId } = params;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({ type: "", message: "", show: false });
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        support_page_id: supportPageId,
        task_category_id: "",
        scheduled_at: "",
        deadline: "",
        max_volunteers: "",
        location: "",
    });

    // Fetch task details and pre-populate form
    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                setLoading(true);
                const response = await supportService.getTaskById(taskId);
                const task = response.data.data;

                // Format dates for datetime-local input
                const formatDateForInput = (dateString) => {
                    if (!dateString) return "";
                    const date = new Date(dateString);
                    return date.toISOString().slice(0, 16);
                };

                setFormData({
                    title: task.title || "",
                    description: task.description || "",
                    support_page_id: supportPageId,
                    task_category_id: task.category?.id || "",
                    scheduled_at: formatDateForInput(task.scheduled_at),
                    deadline: formatDateForInput(task.deadline),
                    max_volunteers: task.max_volunteers || "",
                    location: task.location || "",
                });

                // Fetch categories if needed
                // const categoriesResponse = await taskService.getCategories();
                // setCategories(categoriesResponse.data.data);
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
    }, [taskId, supportPageId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            // Format dates for API
            const formatDateForAPI = (dateString) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                return date.toISOString().slice(0, 19).replace('T', ' ');
            };

            const payload = {
                ...formData,
                scheduled_at: formatDateForAPI(formData.scheduled_at),
                deadline: formatDateForAPI(formData.deadline),
                max_volunteers: parseInt(formData.max_volunteers),
            };

            await supportService.updateTask(taskId, payload);
            
            setAlert({
                type: "success",
                message: "Task updated successfully!",
                show: true,
            });

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push(`/coordinator/support-pages/${supportPageId}/tasks`);
            }, 2000);
        } catch (err) {
            console.error("Error updating task:", err);
            setError(err.response?.data?.message || "Failed to update task");
            setAlert({
                type: "error",
                message: err.response?.data?.message || "Failed to update task",
                show: true,
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container sx={{ my: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                    <CircularProgress size={60} />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            {alert?.show && (
                <CustomSnackbar
                    message={alert?.message}
                    onClose={() => setAlert({ type: "", message: "", show: false })}
                    duration={4000}
                    severity={alert?.type}
                />
            )}

            <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
                <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
                    Edit Task
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Update task details for support page
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Task Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Category ID"
                        name="task_category_id"
                        type="number"
                        value={formData.task_category_id}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Scheduled At"
                        name="scheduled_at"
                        type="datetime-local"
                        value={formData.scheduled_at}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Deadline"
                        name="deadline"
                        type="datetime-local"
                        value={formData.deadline}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Max Volunteers"
                        name="max_volunteers"
                        type="number"
                        value={formData.max_volunteers}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.back()}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={submitting}
                        >
                            {submitting ? <CircularProgress size={24} /> : "Update Task"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
