"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
    Stack,
    Paper
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { supportService } from "../../lib/support/supportService";

export default function AssignRecipientModal({ open, onClose, supportPageId, onSuccess }) {
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            location: "",
            relationship: "",
            bio: "",
            password: "",
            password_confirmation: "",
        }
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        // setSuccessMessage("");
        // setErrorMessage("");

        try {
            const payload = {
                support_page_id: supportPageId,
                ...data,
            };
            const res = await supportService.assignRecipient(payload);
            // setSuccessMessage("Recipient assigned successfully!");
            onSuccess?.({
                success: "Recipient assigned successfully!",
                error: null,
            });
        } catch (error) {
            console.error(error);
            onSuccess?.({
                success: null,
                error: "Failed to assign recipient. Please try again.",
            });
        } finally {
            setSubmitting(false);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Assign Recipient</DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>

                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Stack spacing={2}>

                            <TextField
                                label="Name"
                                fullWidth
                                {...register("name", { required: "Name is required" })}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            />

                            <TextField
                                label="Email *"
                                fullWidth
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                            {/* Phone (USA) */}
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Enter a valid 10-digit US phone number",
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Phone *"
                                        error={!!error}
                                        helperText={error?.message || "Enter 10 digit mobile number"}
                                        type="tel"
                                        inputMode="tel"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">+1</InputAdornment>
                                            ),
                                        }}
                                        inputProps={{ maxLength: 10 }}
                                        placeholder="Enter 10-digit phone number"
                                    />
                                )}
                            />

                            <TextField
                                label="Location"
                                fullWidth
                                {...register("location")}
                            />

                            <TextField
                                label="Relationship"
                                fullWidth
                                {...register("relationship")}
                            />

                            <TextField
                                label="Bio"
                                fullWidth
                                multiline
                                rows={2}
                                {...register("bio")}
                            />

                            <TextField
                                label="Password"
                                fullWidth
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Minimum length is 8" },
                                    validate: (val) => {
                                        const strongPasswordRegex =
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
                                        if (!strongPasswordRegex.test(val)) {
                                            return "Password must include uppercase, lowercase, number, and special character";
                                        }
                                        return true;
                                    },
                                })}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                            />

                            <TextField
                                label="Confirm Password"
                                fullWidth
                                type="password"
                                {...register("password_confirmation", {
                                    required: "Password confirmation is required",
                                    validate: (val) =>
                                        val === getValues("password") || "Passwords do not match",
                                })}
                                error={Boolean(errors.password_confirmation)}
                                helperText={errors.password_confirmation?.message}
                            />
                        </Stack>
                    </Paper>

                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
