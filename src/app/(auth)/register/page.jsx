"use client";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link as MuiLink,
  CircularProgress,
  Collapse,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import {
  CheckBox,
  Diversity1,
  Favorite,
  HeadsetSharp,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { authService } from "../../../lib/auth/authService";

export default function RegisterPage() {
  const router = useRouter();

  // NEW STATES
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    { value: "coordinator", label: "Coordinator" },
    { value: "volunteer", label: "Volunteer" },
    { value: "recipient", label: "Recipient" },
  ];

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      role: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    clearErrors();
    setServerError("");
    setSuccessMessage("");
    if (data.password !== data.passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const payload = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      password: data?.password,
      password_confirmation: data?.passwordConfirmation,
      role: data?.role,
    };
    setLoading(true);
    await authService.register(payload).then((res) => {
      setSuccessMessage(res?.message || "Registration successful! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }).catch((err) => {
      console.error("Error ======", err?.response);
      let msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(msg);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Paper elevation={3} className="p-8 w-full max-w-md mx-auto !rounded-lg">
      <div className="text-center mb-8">
        <img
          className="m-auto w-[160px] mb-6"
          src="/assets/img/logo.png"
          alt="Logo"
        />
        <Typography variant="h4" className="mb-2 !font-black text-black text-center !text-[26px]">
          Join Support Circle
        </Typography>
        <Typography variant="body2" className="mb-6 text-center text-gray-600">
          Create your account to start helping or get help.
        </Typography>
      </div>

      {/* Server Error Message */}
      <Collapse in={!!serverError}>
        <Alert severity="error" className="mb-4 !rounded-lg !text-[15px]">
          {serverError}
        </Alert>
      </Collapse>

      {/* Success Message */}
      <Collapse in={!!successMessage}>
        <Alert severity="success" className="mb-4 !rounded-lg !text-[15px]">
          {successMessage}
        </Alert>
      </Collapse>

      {/* Form Validation Errors */}
      {/* <Collapse
        in={
          !!(
            errors.role?.message ||
            errors.passwordConfirmation?.message ||
            errors.name?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.phone?.message
          )
        }
      >
        <Alert severity="error" className="mb-4 !rounded-lg !text-[15px]">
          {errors.name?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.passwordConfirmation?.message ||
            errors.role?.message ||
            errors.phone?.message}
        </Alert>
      </Collapse> */}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Name is required",
            minLength: { value: 4, message: "Name must be at least 4 characters" },
          }}
          render={({ field }) =>
            <TextField {...field} fullWidth label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          }
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
          }}
          render={({ field }) => (
            <TextField
              {...field} fullWidth
              label="Email" type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Phone */}
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
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Phone"
              error={!!errors.phone}
              helperText={errors.phone?.message}
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

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message:
                "Password must be min 8 chars, include uppercase, number & special char",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field} fullWidth
              label="Password" type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="passwordConfirmation"
          control={control}
          rules={{ required: "Confirm Password is required" }}
          render={({ field }) => (
            <TextField
              {...field} fullWidth
              label="Confirm Password" type="password"
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
            />
          )}
        />

        {/* Role */}
        <Controller
          name="role"
          control={control}
          rules={{ required: "Please select a role" }}
          render={({ field }) => (
            <TextField
              {...field} select fullWidth
              label="Select Role"
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Submit */}
        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          className="theme-btn-primary !rounded-[30px] !ring-0"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </Box>
      <Box className=" mt-4 text-center">
        <Typography variant="body2" className=" text-gray-500">
          Already have an account?{" "}
          <MuiLink
            component={Link}
            href="/login"
            className=" text-indigo-500  font-semibold hover: underline"
          >
            Login here
          </MuiLink>
        </Typography>
      </Box>
    </Paper>
  );
}
