"use client";

import { useEffect, useState } from "react";
import {
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
} from "@mui/material";
import Loading from "../../../components/common/loading";
import { volunteerService } from "../../../lib/volunteer/volunteerService";
import { taskService } from "../../../lib/tasks/taskService";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completing, setCompleting] = useState(false);

  const fetchMyTasks = async () => {
    try {
      const response = await volunteerService.getMyTasks();
      console.log(response?.data, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
      setTasks(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyTasks();
  }, []);
  const handleCompleteClick = (task) => {
    setSelectedTask(task);
    setOpenConfirm(true);
  };
  const handleConfirmYes = async () => {
    setCompleting(true);
    try {
      // Call your API here, for example:
      const res = await taskService.markCompleteTask(selectedTask.id);
      // const res = await taskService.signupTask(selectedTask?.id);
      console.log(res?.data, "++++++++++++++++++")
      await fetchMyTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    } finally {
      setCompleting(false);
      setOpenConfirm(false);
      setSelectedTask(null);
    }
  };
  const handleConfirmNo = () => {
    setOpenConfirm(false);
    setSelectedTask(null);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-8">
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ background: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Support Page</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Scheduled At</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((item) => {
                const task = item.task;

                return (
                  <TableRow key={item?.id}>
                    <TableCell>{task?.title}</TableCell>
                    <TableCell>{task?.description}</TableCell>

                    <TableCell>
                      <Chip
                        label={item.status}
                        color={
                          item.status === "confirmed"
                            ? "success"
                            : item.status === "pending"
                              ? "warning"
                              : "default"
                        }
                      />
                    </TableCell>
                    <TableCell>{task.category?.name || "-"}</TableCell>
                    <TableCell>
                      {task.support_page?.title || "-"}
                    </TableCell>
                    <TableCell>
                      {task.scheduled_at
                        ? new Date(task.scheduled_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {task.status == "open" ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleCompleteClick(task)}
                        >
                          Complete
                        </Button>
                      ) : (
                        <Typography sx={{ color: "#aaa" }}>—</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Complete modal */}
      <Dialog
        open={openConfirm}
        onClose={handleConfirmNo}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Mark Task as Complete</DialogTitle>
        <DialogContent>
          Are you sure you want to mark this task as complete?
          <Typography mt={1}><strong>{selectedTask?.title}</strong></Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmNo} disabled={completing}>
            No
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmYes}
            disabled={completing}
          >
            {completing ? "Completing..." : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
