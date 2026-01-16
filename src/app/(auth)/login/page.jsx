"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  FormControlLabel,
  Link as MuiLink,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { authService } from "../../../lib/auth/authService";
import Link from "next/link";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);


  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);

    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await authService.login(payload);
      setSuccessMsg("Login successful! Redirecting...");
      Cookies.set("token", res.data.token, { expires: 1 });
      Cookies.set("user", JSON.stringify(res.data.user), { expires: 1 });
      // Redirect based on role
      const roles = res?.data?.user?.roles || [];
      if (roles.some((r) => r.name === "coordinator")) {
        router.push("/coordinator/dashboard");
      } else if (roles.some((r) => r.name === "volunteer")) {
        router.push("/volunteer/dashboard");
      } else if (roles.some((r) => r.name === "recipient")) {
        router.push("/recipient/dashboard");
      } else {
        router.push("/"); // fallback
      }
    } catch (err) {
      console.error(err?.response);
      let msg =
        err?.response?.data?.message || "Login failed. Please check your credentials.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
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
          Welcome Back
        </Typography>
        <Typography variant="body2" className="mb-6 text-center text-gray-600">
          Sign in to your Support Circle account.
        </Typography>
      </div>

      {/* Server Error */}
      {serverError && (
        <Alert severity="error" className="mb-4 !rounded-lg !text-[15px]">
          {serverError}
        </Alert>
      )}
      {/* Success Snackbar */}
      <Snackbar
        open={!!successMsg}
        autoHideDuration={4000}
        onClose={() => setSuccessMsg("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      </Snackbar>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
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
              {...field}
              fullWidth
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          className="theme-btn-primary !rounded-[30px] !ring-0"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>

      <Box className="mt-4 text-center">
        <Typography variant="body2">
          Don't have an account?{" "}
          <MuiLink component={Link} href="/register">
            Register here
          </MuiLink>
        </Typography>
      </Box>
    </Paper>
  );
}
