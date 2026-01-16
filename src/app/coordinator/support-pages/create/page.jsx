"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
    IconButton,
    Divider,
    MenuItem,
    Autocomplete,
    CircularProgress,
    Alert,
    InputAdornment,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { supportService } from "../../../../lib/support/supportService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const communicationOptions = [
    { value: "calls", label: "Calls" },
    { value: "texts", label: "Texts" },
    { value: "emails", label: "Emails" },
    { value: "all", label: "All" },
];

export default function CreatePage() {
    const router = useRouter();
    const [supportReasons, setSupportReasons] = useState([]);
    const [loadingReasons, setLoadingReasons] = useState(true);
    const [reasonError, setReasonError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { control, handleSubmit, register, formState: { errors }, watch, } = useForm({
        defaultValues: {
            title: "",
            story: "",
            support_reason: "",
            special_instructions: "",
            communication_preference: "emails",
            recipients: [],
        },
    });

    // Image change handler
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove image handler
    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };
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

    const { fields, append, remove } = useFieldArray({
        control,
        name: "recipients",
    });
    // Watch recipients to validate unique emails
    const recipients = watch("recipients");
    const validateUniqueEmail = (email, index) => {
        const count = recipients.filter((r) => r.email === email).length;
        if (count > 1) return "Email must be unique among recipients";
        return true;
    }

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
            // Create FormData for file upload
            const formData = new FormData();

            // Append basic fields
            formData.append('title', data.title);
            formData.append('story', data.story);
            formData.append('support_reason', data.support_reason);
            formData.append('special_instructions', data.special_instructions);
            formData.append('communication_preference', data.communication_preference);

            // Append image if selected
            if (selectedImage) {
                formData.append('photo', selectedImage);
            }

            // Append recipients as JSON string or individual fields
            if (data.recipients && data.recipients.length > 0) {
                formData.append('recipients', JSON.stringify(data.recipients));
            }

            const res = await supportService.create(token, formData);

            setSubmitSuccess("Support page created successfully!");
            setTimeout(() => {
                router.push('/coordinator/support-pages');
            }, 1500);

            window.scrollTo({ top: 0, behavior: "smooth" });

        } catch (error) {
            console.error("Submit Error:", error);
            let msg = error?.response?.data?.message ||
                "Something went wrong while creating the support page.";
            setSubmitError(msg);
            setTimeout(() => setSubmitError(""), 5000);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } finally {
            setSubmitLoading(false);
        }
    };


    return (
        <Container maxWidth="md" sx={{ my: 6 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                    Create Support Page
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
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Upload Photo
                            </Typography>

                            {!imagePreview ? (
                                <Button
                                    variant="outlined"
                                    component="label"
                                    fullWidth
                                    sx={{
                                        height: 150, // Reduced from 200
                                        borderStyle: 'dashed',
                                        '&:hover': { borderStyle: 'dashed' }
                                    }}
                                >
                                    <Stack alignItems="center" spacing={1}>
                                        <AddCircle fontSize="large" color="primary" />
                                        <Typography>Click to upload image</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            JPG, PNG, GIF (Max 5MB)
                                        </Typography>
                                    </Stack>
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                            ) : (
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        position: 'relative',
                                        p: 2,
                                        bgcolor: 'grey.50'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: '100%',
                                            maxHeight: 250, // Reduced from 400
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            bgcolor: 'grey.100',
                                            borderRadius: 1,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={imagePreview}
                                            alt="Preview"
                                            sx={{
                                                maxWidth: '100%',
                                                maxHeight: 250, // Reduced from 400
                                                width: 'auto',
                                                height: 'auto',
                                                objectFit: 'contain',
                                                display: 'block'
                                            }}
                                        />
                                    </Box>
                                    <IconButton
                                        onClick={handleRemoveImage}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            bgcolor: 'white',
                                            boxShadow: 2,
                                            '&:hover': {
                                                bgcolor: 'error.main',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        <RemoveCircle />
                                    </IconButton>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mt: 1, textAlign: 'center' }}
                                    >
                                        {selectedImage?.name}
                                    </Typography>
                                </Paper>
                            )}
                        </Box>
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
                            label="Story" fullWidth multiline
                            rows={4}
                            {...register("story", {
                                required: "Story is required",
                                minLength: { value: 50, message: "Story must be at least 50 characters" },
                            })}
                            error={Boolean(errors.story)}
                            helperText={errors.story?.message}
                        />

                        <Controller
                            name="support_reason"
                            control={control}
                            rules={{ required: "Support reason is required" }}
                            render={({ field: { onChange, value } }) => {
                                // Find selected option object from value (id or string)
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

                                            // Selected from dropdown → send ID
                                            if (details?.option && typeof newValue !== "string") {
                                                onChange(newValue.id);
                                                return;
                                            }

                                            // Free-solo typed final value
                                            if (typeof newValue === "string") {
                                                onChange(newValue);
                                            }
                                        }}
                                        onInputChange={(event, newInputValue, reason) => {
                                            // While typing, capture input text
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
                            fullWidth multiline rows={2}
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
                                    fullWidth {...field}
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

                        {/* Recipients Section */}
                        <Divider sx={{ mt: 3, mb: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                                Recipients (Optional)
                            </Typography>
                        </Divider>

                        {fields.map((item, index) => (
                            <Paper key={item.id} variant="outlined" sx={{ p: 2, position: "relative" }}>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Name" fullWidth
                                        {...register(`recipients.${index}.name`, { required: "Name is required" })}
                                        error={Boolean(errors.recipients?.[index]?.name)}
                                        helperText={errors.recipients?.[index]?.name?.message}
                                    />
                                    <TextField
                                        label="Email *" fullWidth type="email"
                                        {...register(`recipients.${index}.email`, {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Invalid email address",
                                            },
                                            validate: (value) => validateUniqueEmail(value, index),
                                        })}
                                        error={Boolean(errors.recipients?.[index]?.email)}
                                        helperText={errors.recipients?.[index]?.email?.message}
                                    />
                                    <Controller
                                        name={`recipients.${index}.phone`}
                                        control={control}
                                        rules={{
                                            required: "Phone is required",
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
                                                    startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                                                }}
                                                inputProps={{ maxLength: 10 }}
                                                placeholder="Enter 10-digit phone number"
                                            />
                                        )}
                                    />
                                    <TextField label="Location" fullWidth {...register(`recipients.${index}.location`)} />
                                    <TextField
                                        label="Relationship"
                                        fullWidth
                                        {...register(`recipients.${index}.relationship`)}
                                    />
                                    <TextField
                                        label="Bio" fullWidth
                                        multiline rows={2}
                                        {...register(`recipients.${index}.bio`)}
                                    />
                                    <TextField
                                        label="Password"
                                        fullWidth
                                        type="password"
                                        {...register(`recipients.${index}.password`, {
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
                                        error={Boolean(errors.recipients?.[index]?.password)}
                                        helperText={errors.recipients?.[index]?.password?.message}
                                    />
                                    <TextField
                                        label="Confirm Password"
                                        fullWidth type="password"
                                        {...register(`recipients.${index}.password_confirmation`, {
                                            required: "Password confirmation is required",
                                            validate: (val, formValues) =>
                                                val === formValues.recipients[index].password || "Passwords do not match",
                                        })}
                                        error={Boolean(errors.recipients?.[index]?.password_confirmation)}
                                        helperText={errors.recipients?.[index]?.password_confirmation?.message}
                                    />
                                    <IconButton
                                        aria-label="remove recipient"
                                        color="error"
                                        onClick={() => remove(index)}
                                        sx={{ position: "absolute", top: 8, right: 8 }}
                                    >
                                        <RemoveCircle />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        ))}

                        <Button
                            variant="outlined"
                            startIcon={<AddCircle />}
                            onClick={() =>
                                append({
                                    name: "",
                                    email: "",
                                    phone: "",
                                    location: "",
                                    relationship: "",
                                    bio: "",
                                    password: "",
                                    password_confirmation: "",
                                })
                            }
                        >
                            Add Recipient
                        </Button>

                        <Button
                            type="submit" variant="contained"
                            size="large" sx={{ mt: 4 }}
                            disabled={submitLoading}
                        >
                            {submitLoading ? "Submitting..." : "Create Support Page"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}
