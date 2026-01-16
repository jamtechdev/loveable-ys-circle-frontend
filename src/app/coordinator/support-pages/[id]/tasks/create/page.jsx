"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    TextField,
    Button,
    MenuItem,
    Container,
    Paper,
    Typography,
    Box,
    Stack,
    Alert,
    Snackbar,
} from "@mui/material";
import { taskService } from "../../../../../../lib/tasks/taskService";
import { useRouter } from "next/navigation";
import CustomSnackbar from "../../../../../../components/common/custom-snackbar";


export default function CreateTask({ params }) {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const router = useRouter();
    const currentDate = new Date().toISOString().split("T")[0];
    const [serverError, setServerError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const { register, handleSubmit, control, formState: { errors }, setError } = useForm({
        defaultValues: {
            task_category_id: "",
            support_page_id: "",
            title: "",
            description: "",
            location: "",  // 👈 Add this
            scheduled_at: ""
        }
    });
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(false);
    const fetchCategories = async () => {
        try {
            const res = await taskService.getCategories();
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to load categories");
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    // 📌 Submit form
    const onSubmit = async (data) => {
        setLoading(true);

        const payload = {
            ...data,
            support_page_id: Number(id),
            max_volunteers: 1,
        };

        try {
            const response = await taskService.create(payload);
            if (response?.data?.status) {
                setSuccessMsg("Task created successful! Redirecting...");
                router.push(`/coordinator/support-pages/${id}/tasks`);
            }
        } catch (err) {
            let msg =
                err?.response?.data?.message || "Failed to create task";
            setServerError(msg);
            const backendErrors = err?.response?.data?.errors;

            if (backendErrors) {
                Object.entries(backendErrors).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: messages[0],
                    });
                });

                return;
            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <Container maxWidth="md" sx={{ my: 6 }}>
                {/* Server Error */}
                {serverError && (
                    <CustomSnackbar
                        message={serverError}
                        onClose={() => setServerError("")}
                        duration={4000}
                        severity="error"
                    />
                )}
                {/* Success Snackbar */}
                {successMsg && (
                    <CustomSnackbar
                        message={successMsg}
                        onClose={() => setSuccessMsg("")}
                        duration={4000}
                        severity="success"
                    />
                )}
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight={700}>
                        Create Task
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                        <Stack spacing={3}>

                            {/* Task Category */}
                            <Controller
                                name="task_category_id"
                                control={control}
                                rules={{ required: "Task Category is required" }}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        label="Task Category *"
                                        fullWidth
                                        {...field}
                                        error={Boolean(errors.task_category_id)}
                                        helperText={errors.task_category_id?.message}
                                    >
                                        {categories?.data?.length > 0 ? (
                                            categories.data.map(({ id, name }, index) => (
                                                <MenuItem key={`category-${id}-${index}`} value={id}>
                                                    {name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No categories found</MenuItem>
                                        )}
                                    </TextField>
                                )}
                            />

                            {/* Title */}
                            <TextField
                                label="Title"
                                fullWidth
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: { value: 6, message: "Title must be at least 6 characters" },
                                    maxLength: { value: 255, message: "Max 255 characters" },
                                })}
                                error={Boolean(errors.title)}
                                helperText={errors.title?.message}
                            />

                            {/* Description */}
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: { value: 10, message: "Must be at least 10 characters" },
                                })}
                                error={Boolean(errors.description)}
                                helperText={errors.description?.message}
                            />

                            <TextField
                                label="Location"
                                fullWidth
                                {...register("location", {
                                    required: "Location is required",
                                    minLength: { value: 3, message: "Location must be at least 3 characters" },
                                    maxLength: { value: 255, message: "Max 255 characters" },
                                })}
                                error={Boolean(errors.location)}
                                helperText={errors.location?.message}
                                placeholder="Enter city, state or full address"
                            />
                            {/* <Controller
                                name="scheduled_at"
                                control={control}
                                rules={{ required: "Scheduled date is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Scheduled Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        error={Boolean(errors.scheduled_at)}
                                        helperText={errors.scheduled_at?.message}
                                        onChange={(e) => {
                                            const value = e.target.value; // YYYY-MM-DD
                                            field.onChange(value);
                                        }}
                                    />
                                )}
                            /> */}

                            {/* Scheduled At */}
                            <Controller
                                name="scheduled_at"
                                control={control}
                                rules={{
                                    required: "Scheduled time is required",
                                    validate: (value) => {
                                        const year = value?.split("-")[0];
                                        if (year && year.length !== 4) {
                                            return "Year must be 4 digits";
                                        }
                                        return true;
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Scheduled Date & Time"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        error={Boolean(errors.scheduled_at)}
                                        helperText={errors.scheduled_at?.message}
                                        inputProps={{
                                            inputMode: "numeric",
                                            pattern: "\\d{4}-\\d{2}-\\d{2}",
                                            maxLength: 10, // yyyy-mm-dd length
                                            min: currentDate // Disable past dates
                                        }}
                                        onChange={(e) => {
                                            const val = e.target.value;

                                            // Manual typing year limit (only 4 digits allowed)
                                            const parts = val.split("-");
                                            if (parts[0] && parts[0].length > 4) {
                                                return; // Prevent extra digits
                                            }

                                            field.onChange(val);
                                        }}
                                    />
                                )}
                            />


                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mt: 4 }}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Create Task"}
                            </Button>
                        </Stack>
                    </Box>

                </Paper>
            </Container >
        </>
    )
}