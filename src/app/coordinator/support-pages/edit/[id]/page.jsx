"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
    MenuItem,
    Autocomplete,
    CircularProgress,
    Alert,
} from "@mui/material";
import { supportService } from "../../../../../lib/support/supportService";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";

const communicationOptions = [
    { value: "calls", label: "Calls" },
    { value: "texts", label: "Texts" },
    { value: "emails", label: "Emails" },
    { value: "all", label: "All" },
];

export default function EditSupportPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [supportReasons, setSupportReasons] = useState([]);
    const [loadingReasons, setLoadingReasons] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [reasonError, setReasonError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState("");
    const [submitError, setSubmitError] = useState("");

    const { control, handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: "",
            story: "",
            support_reason: "",
            special_instructions: "",
            communication_preference: "emails",
        },
    });

    // Fetch support page data by ID
    useEffect(() => {
        async function fetchSupportPageData() {
            try {
                setLoadingData(true);
                const response = await supportService.getSupportById(id);
                console.log(response, "response");
                const data = response?.data?.data;

                // Reset form with fetched data (excluding recipients)
                reset({
                    title: data.title || "",
                    story: data.story || "",
                    support_reason: data.support_reason_id || data.support_reason?.id || "",
                    special_instructions: data.special_instructions || "",
                    communication_preference: data.communication_preference || "emails",
                });
            } catch (error) {
                console.error("Failed to fetch support page:", error);
                setSubmitError("Failed to load support page data");
            } finally {
                setLoadingData(false);
            }
        }

        if (id) {
            fetchSupportPageData();
        }
    }, [id, reset]);

    // Fetch support reasons on component mount
    useEffect(() => {
        async function fetchSupportReason() {
            try {
                setLoadingReasons(true);
                const reasons = await supportService.supportReason();
                setSupportReasons(reasons?.data?.data);
            } catch (error) {
                console.error("Failed to fetch support reasons:", error);
                setReasonError("Failed to load support reasons");
            } finally {
                setLoadingReasons(false);
            }
        }
        fetchSupportReason();
    }, []);

    const onSubmit = async (data) => {
        setSubmitError("");
        setSubmitSuccess("");
        setSubmitLoading(true);
        const token = Cookies.get("token");

        if (!token) {
            setSubmitError("Authentication expired. Please log in again.");
            setSubmitLoading(false);
            return;
        }

        try {
            // Prepare update payload (only the fields mentioned in your API)
            const updatePayload = {
                title: data.title,
                story: data.story,
                special_instructions: data.special_instructions,
                communication_preference: data.communication_preference,
            };

            // Only add support_reason if it's provided
            if (data.support_reason) {
                updatePayload.support_reason = data.support_reason;
            }

            const res = await supportService.UpdateSupportPage(id, updatePayload);
            setSubmitSuccess("Support page updated successfully!");
            setTimeout(() => {
                router.push('/coordinator/support-pages');
            }, 1500);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error("Submit Error:", error);
            let msg =
                error?.response?.data?.message ||
                "Something went wrong while updating the support page.";
            setSubmitError(msg);
            setTimeout(() => setSubmitError(""), 5000);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loadingData) {
        return (
            <Container maxWidth="md" sx={{ my: 6, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ my: 6 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                    Edit Support Page
                </Typography>

                {submitError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {submitError}
                    </Alert>
                )}

                {submitSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {submitSuccess}
                    </Alert>
                )}

                {reasonError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {reasonError}
                    </Alert>
                )}

                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Stack spacing={3}>
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

                        {/* Story */}
                        <TextField
                            label="Story"
                            fullWidth
                            multiline
                            rows={4}
                            {...register("story", {
                                required: "Story is required",
                                minLength: { value: 50, message: "Story must be at least 50 characters" },
                            })}
                            error={Boolean(errors.story)}
                            helperText={errors.story?.message}
                        />

                        {/* Support Reason */}
                        <Controller
                            name="support_reason"
                            control={control}
                            rules={{ required: "Support reason is required" }}
                            render={({ field: { onChange, value } }) => {
                                const selectedOption = supportReasons.find(
                                    (r) => r.id === value || r.reason === value
                                ) || null;

                                return (
                                    <Autocomplete
                                        freeSolo
                                        options={supportReasons}
                                        loading={loadingReasons}
                                        getOptionLabel={(option) =>
                                            typeof option === "string" ? option : option.reason || ""
                                        }
                                        isOptionEqualToValue={(option, val) =>
                                            option.id === (typeof val === "number" ? val : val?.id) ||
                                            option.reason === val
                                        }
                                        value={
                                            selectedOption ||
                                            (typeof value === "string" ? value : null)
                                        }
                                        onChange={(event, newValue, reason, details) => {
                                            if (reason === "clear") {
                                                onChange("");
                                                return;
                                            }

                                            if (details?.option && typeof newValue !== "string") {
                                                onChange(newValue.id);
                                                return;
                                            }

                                            if (typeof newValue === "string") {
                                                onChange(newValue);
                                            }
                                        }}
                                        onInputChange={(event, newInputValue, reason) => {
                                            if (reason === "input") {
                                                onChange(newInputValue);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Support Reason *"
                                                error={Boolean(errors.support_reason)}
                                                helperText={errors.support_reason?.message}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <>
                                                            {loadingReasons ? (
                                                                <CircularProgress color="inherit" size={20} />
                                                            ) : null}
                                                            {params.InputProps.endAdornment}
                                                        </>
                                                    ),
                                                }}
                                            />
                                        )}
                                         renderOption={(props, option) => (
                                            <li {...props} key={option.id}>
                                                {option.reason}
                                                <span key={option?.id} style={{ opacity: 0.7, fontSize: "0.8em", marginLeft: 6 }}>
                                                    ({option.support_pages_count})
                                                </span>
                                            </li>
                                        )}
                                    />
                                );
                            }}
                        />

                        {/* Special Instructions */}
                        <TextField
                            label="Special Instructions"
                            fullWidth
                            multiline
                            rows={2}
                            {...register("special_instructions")}
                        />

                        {/* Communication Preference */}
                        <Controller
                            name="communication_preference"
                            control={control}
                            rules={{ required: "Communication preference is required" }}
                            render={({ field }) => (
                                <TextField
                                    select
                                    label="Communication Preference *"
                                    fullWidth
                                    {...field}
                                    error={Boolean(errors.communication_preference)}
                                    helperText={errors.communication_preference?.message}
                                >
                                    {communicationOptions.map(({ value, label }) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        {/* Action Buttons */}
                        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => router.push('/coordinator/support-pages')}
                                disabled={submitLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={submitLoading}
                                sx={{ flex: 1 }}
                            >
                                {submitLoading ? "Updating..." : "Update Support Page"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}
