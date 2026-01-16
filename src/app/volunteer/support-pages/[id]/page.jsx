"use client";
import { use, useEffect, useState } from "react";
import Loading from "../../../../components/common/loading";
import Error from "../../../../components/common/error";
import { volunteerService } from "../../../../lib/volunteer/volunteerService";
import {
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { taskService } from "../../../../lib/tasks/taskService";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

export default function SupportDetails() {
    const params = useParams();
    const { id } = params;
    const currentUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};
    // console.log(currentUser, '=========')
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [completing, setCompleting] = useState(false);
    const router = useRouter()

    const fetchTasks = async () => {
        try {
            const data = await volunteerService.getAllTask(id);
            setTasks(data?.data?.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        if (id) fetchTasks();
    }, [id]);

    const handleCompleteClick = (task) => {
        setSelectedTask(task);
        setOpenConfirm(true);
    };
    const handleConfirmYes = async () => {
        setCompleting(true);
        try {
            // Call your API here, for example:
            // await taskService.markCompleteTask(selectedTask.id);
            const res = await taskService.signupTask(selectedTask?.id);
            console.log(res, "res")

            // Optionally, refresh tasks list
            // const data = await volunteerService.getAllTask(id);
            // setTasks(data?.data?.data);
        } catch (error) {
            console.error("Error completing task:", error);
        } finally {
            fetchTasks();
            setCompleting(false);
            setOpenConfirm(false);
            setSelectedTask(null);
        }
    };
    const handleConfirmNo = () => {
        setOpenConfirm(false);
        setSelectedTask(null);
    };

    const handleViewTask = (taskId) => {
        router.push(`/volunteer/support-pages/${id}/${taskId}`);
    };


    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    return (
        <Container sx={{ my: 4 }}>
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
                    Task List
                </Typography>
            </Box>

            {/* Task Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700, }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 700, }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 700, }}>Scheduled At</TableCell>
                            <TableCell sx={{ fontWeight: 700, }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700, }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>View</TableCell>
                            <TableCell sx={{ fontWeight: 700, }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No tasks assigned
                                </TableCell>
                            </TableRow>
                        ) : (
                            tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>
                                        {task.scheduled_at
                                            ? new Date(task.scheduled_at).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "2-digit",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={task.status}
                                            color={
                                                task.status === "open"
                                                    ? "success"
                                                    : task.status === "closed"
                                                        ? "default"
                                                        : "warning"
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{task.category?.name || "-"}</TableCell>
                                    <TableCell>
                                        {task?.status == "complete" ? (
                                            <Typography sx={{ color: "#aaa" }}>—</Typography>
                                        ) : (
                                            task?.signups?.some(
                                                (signup) =>
                                                    signup.status === "confirmed" &&
                                                    signup.user?.email === currentUser?.email
                                            ) ? (
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleViewTask(task.id)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            ) : (
                                                <Typography sx={{ color: "#aaa" }}>—</Typography>
                                            )
                                        )}
                                        {/* <IconButton
                                            color="primary"
                                            onClick={() => handleViewTask(task.id)}
                                        >
                                            <VisibilityIcon />
                                        </IconButton> */}
                                    </TableCell>
                                    <TableCell>
                                        {task.status === "open" ? (
                                            // Check if current user exists in signups array
                                            !task.signups?.some(s => s.user?.email === currentUser?.email) ? (
                                                // Condition 1: OPEN + user NOT in signups → show Signup
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleCompleteClick(task)}
                                                >
                                                    Signup
                                                </Button>
                                            ) : (
                                                // Condition 2: OPEN + user already signed up → show Signed up
                                                <Typography sx={{ color: "#4caf50", fontWeight: 600 }}>
                                                    Signed up
                                                </Typography>
                                            )
                                        ) : (
                                            // Condition 3: not open → show —
                                            <Typography sx={{ color: "#aaa" }}>—</Typography>
                                        )}
                                    </TableCell>

                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openConfirm}
                onClose={handleConfirmNo}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Commit to This Task</DialogTitle>
                <DialogContent>
                    Are you sure you want to sign up and commit to completing this task?
                    <Typography mt={1}><strong>{selectedTask?.title}</strong></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmNo} disabled={completing}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmYes}
                        disabled={completing}
                    >
                        {completing ? "Committing..." : "Confirm"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
