"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supportService } from "../../../lib/support/supportService";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    CircularProgress,
    Button,
    Box,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import { volunteerService } from "../../../lib/volunteer/volunteerService";
import { debounce } from "lodash";
import CustomSnackbar from "../../../components/common/custom-snackbar";
import EditIcon from '@mui/icons-material/Edit';

export default function Pages() {
    const [pages, setPages] = useState();
    // console.log(pages,"pages")
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [openPopup, setOpenPopup] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [emailInput, setEmailInput] = useState("");
    const [emails, setEmails] = useState([]);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors }, setError, clearErrors } = useForm({
        defaultValues: {
            emails: [],
            message: "",
        },
    });

    const fetchPages = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const res = await supportService.getAll(pageNumber, '');
            // console.log(res, "resresresres");
            setPages(res?.data);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages(page);
    }, [page]);

    const status = (value) => {
        if (!value) return "NA";
        return value?.replace(/_/g, " ");
    };

    const [volunteers, setVolunteers] = useState([]);
    const [loadingVolunteers, setLoadingVolunteers] = useState(false);

    const fetchVolunteers = async (search = '') => {
        setLoadingVolunteers(true);
        try {
            const res = await volunteerService.getAllVolunteers(1, search);
            setVolunteers(res?.data?.data || []);
        } catch (error) {
            console.error("Volunteer Fetch Error:", error);
        } finally {
            setLoadingVolunteers(false);
        }
    };

    const debouncedFetchVolunteers = debounce(async (search) => {
        await fetchVolunteers(search);
    }, 500);

    const handleOpenPopup = async (pageId) => {
        setSelectedPageId(pageId);
        setOpenPopup(true);
        setEmails([]);
        setEmailInput("");

        setValue("emails", []);
        setValue("message", "");
        clearErrors();
        await fetchVolunteers();
    };

    const handleClosePopup = () => setOpenPopup(false);

    const handleOpenDeleteDialog = (pageId) => {
        setDeletingId(pageId);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setDeletingId(null);
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await supportService.deleteSupportPage(deletingId);
            setSuccessMessage("Support page deleted successfully!");
            handleCloseDeleteDialog();
            fetchPages(page);
        } catch (error) {
            console.error("Delete Error:", error);
            setErrorMessage("Failed to delete support page. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    const getStatusChip = (value) => {
        const formatted = status(value).toLowerCase();
        switch (formatted) {
            case "draft":
                return <Chip label="Draft" color="default" variant="outlined" />;
            case "pending approval":
                return <Chip label="Pending Approval" color="warning" />;
            case "active":
                return <Chip label="Active" color="success" />;
            default:
                return <Chip label={formatted} color="default" />;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            {successMessage && (
                <CustomSnackbar
                    message={successMessage}
                    onClose={() => setSuccessMessage('')}
                    duration={4000}
                    severity="success"
                />
            )}
            {errorMessage && (
                <CustomSnackbar
                    message={errorMessage}
                    onClose={() => setErrorMessage("")}
                    duration={4000}
                    severity="error"
                />
            )}

            {/* Header */}
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" fontWeight={700}>Support Pages</Typography>
                <Button variant="contained" color="primary" component={Link} href="/coordinator/support-pages/create">
                    Create Support
                </Button>
            </Box>

            {/* Table */}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                    <CircularProgress />
                </Box>
            ) : pages?.data?.length === 0 ? (
                <Typography>No Support Pages Found.</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableRow>
                                    <TableCell><strong>Title</strong></TableCell>
                                    <TableCell><strong>Support Reason</strong></TableCell>
                                    <TableCell><strong>Preference</strong></TableCell>
                                    <TableCell><strong>Recipients</strong></TableCell>
                                    <TableCell><strong>Tasks</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Created At</strong></TableCell>
                                    <TableCell><strong>View</strong></TableCell>
                                    <TableCell><strong>Assign</strong></TableCell>
                                    <TableCell><strong>Action</strong></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {pages?.data?.map((item) => (
                                    <TableRow key={item?.id} hover>
                                        <TableCell>{item?.title}</TableCell>
                                        <TableCell>{item?.support_reason?.reason}</TableCell>
                                        <TableCell>{item?.communication_preference}</TableCell>
                                        <TableCell>
                                            {item.recipients?.length > 0 ? item.recipients.map(r => r.name).join(", ") : "—"}
                                        </TableCell>
                                        <TableCell>{item?.tasks_count}</TableCell>
                                        <TableCell className="capitalize">
                                            {getStatusChip(item?.status)}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(item.created_at).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/coordinator/support-pages/${item.id}`}>
                                                <IconButton color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {status(item?.status) === "active" ? (
                                                <IconButton color="secondary" onClick={() => handleOpenPopup(item.id)}>
                                                    <AssignmentIcon />
                                                </IconButton>
                                            ) : (
                                                <Typography sx={{ color: "#aaa" }}>—</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/coordinator/support-pages/edit/${item.id}`}>
                                                <IconButton color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleOpenDeleteDialog(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Pagination
                            count={pages?.total_pages}
                            page={page?.current_page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            )}

            {/* Assign Volunteer Popup */}
            <Dialog open={openPopup} onClose={handleClosePopup} fullWidth maxWidth="sm">
                <DialogTitle>Assign Volunteer Support Page</DialogTitle>

                <form
                    onSubmit={handleSubmit(async (data) => {
                        const payload = {
                            support_page_id: selectedPageId,
                            emails: data?.emails,
                            message: data?.message,
                        };
                        setSubmitting(true);
                        await supportService
                            .sendInvitation(payload)
                            .then((res) => {
                                setSuccessMessage("Invitation sent successfully!");
                                console.log("Invitation Sent", res);
                            })
                            .catch((error) => {
                                console.error("Error", error);
                                setErrorMessage("Failed to send invitation. Please try again.");
                            })
                            .finally(() => {
                                handleClosePopup();
                                setSubmitting(false);
                            });
                    })}
                >
                    <DialogContent>
                        <Autocomplete
                            freeSolo
                            options={volunteers.map(v => v.email)}
                            loading={loadingVolunteers}
                            onInputChange={(e, value, reason) => {
                                setEmailInput(value);
                                if (reason === "input") {
                                    debouncedFetchVolunteers(value);
                                }
                            }}
                            onChange={(e, value) => {
                                if (!value) return;
                                const email = value.trim();
                                if (!/\S+@\S+\.\S+/.test(email)) {
                                    setError("emails", { message: "Invalid email format" });
                                    return;
                                }
                                if (emails.includes(email)) {
                                    setError("emails", { message: "Email already added" });
                                    return;
                                }
                                const updated = [...emails, email];
                                setEmails(updated);
                                setValue("emails", updated);
                                clearErrors("emails");

                                setEmailInput("");
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Enter or Select Email"
                                    placeholder="Type email and press Enter"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            const email = emailInput.trim();
                                            if (!email) return;
                                            if (!/\S+@\S+\.\S+/.test(email)) {
                                                setError("emails", { message: "Invalid email format" });
                                                return;
                                            }
                                            if (emails.includes(email)) {
                                                setError("emails", { message: "Email already added" });
                                                return;
                                            }
                                            const updated = [...emails, email];
                                            setEmails(updated);
                                            setValue("emails", updated);
                                            clearErrors("emails");

                                            setEmailInput("");
                                        }
                                    }}
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />

                        {errors.emails && (
                            <Typography color="error" sx={{ mb: 1 }}>
                                {errors.emails.message}
                            </Typography>
                        )}

                        <Box sx={{ mb: 2 }}>
                            {emails.map((email) => (
                                <Chip
                                    key={email}
                                    label={email}
                                    onDelete={() => {
                                        const updated = emails.filter((e) => e !== email);
                                        setEmails(updated);
                                        setValue("emails", updated);
                                        if (updated.length === 0) clearErrors();
                                    }}
                                    sx={{ mr: 1, mt: 1 }}
                                />
                            ))}
                        </Box>

                        <input
                            type="hidden"
                            {...register("emails", {
                                validate: (value) =>
                                    value.length > 0 || "At least one email is required",
                            })}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Message"
                            placeholder="Enter message"
                            {...register("message", { required: "Message is required" })}
                        />

                        {errors.message && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errors.message.message}
                            </Typography>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClosePopup} disabled={submitting}>Cancel</Button>
                        <Button variant="contained" type="submit" disabled={submitting}>
                            {submitting ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this support page? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
