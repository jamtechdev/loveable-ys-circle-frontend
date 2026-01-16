"use client";
import { use, useEffect, useState } from 'react';
import { volunteerService } from '../../../../../lib/volunteer/volunteerService';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Stack
} from '@mui/material';
import {
  CalendarMonth,
  LocationOn,
  People,
  Category as CategoryIcon,
  Email,
  Task as TaskIcon
} from '@mui/icons-material';

export default function TaskdetailPage({ params }) {
  const unwrappedParams = use(params);
  const { id: supportPageId, taskId } = unwrappedParams;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskDetail, setTaskDetail] = useState();
  
  const fetchTasks = async () => {
    try {
      const data = await volunteerService.getTaskdetail(taskId);
      setTaskDetail(data.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) fetchTasks();
  }, [taskId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const task = taskDetail?.task;
  const supportPage = task?.support_page;
  
  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'success',
      pending: 'warning',
      completed: 'info',
      open: 'default',
      active: 'success'
    };
    return colors[status] || 'default';
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        
        {/* Task Details */}
        {task && (
          <Card sx={{ mb: 3, boxShadow: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TaskIcon color="primary" />
                <Typography variant="h5" component="h1" fontWeight={600}>
                  Task Details
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" fontWeight={600} gutterBottom>
                {task.title}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <Chip 
                  label={taskDetail.status.charAt(0).toUpperCase() + taskDetail.status.slice(1)} 
                  color={getStatusColor(taskDetail.status)} 
                  size="small"
                />
                {task.is_full && (
                  <Chip label="Full" color="error" size="small" />
                )}
              </Stack>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {task.description}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                    <CalendarMonth color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Scheduled Date
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {new Date(task.scheduled_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                    <LocationOn color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {task.location}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                    <People color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Volunteers
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {task.volunteers_count} / {task.max_volunteers}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                    <CategoryIcon color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Category
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {task.category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {task.category.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Your Signup Information
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Signed Up At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(taskDetail.signed_up_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1">
                    {taskDetail.completed_at ? (
                      <span style={{ color: '#2e7d32' }}>
                        Completed on {new Date(taskDetail.completed_at).toLocaleDateString()}
                      </span>
                    ) : (
                      <span style={{ color: '#ed6c02' }}>In Progress</span>
                    )}
                  </Typography>
                </Grid>

                {taskDetail.notes && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Notes
                    </Typography>
                    <Typography variant="body1">{taskDetail.notes}</Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Support Page Details */}
        {supportPage && (
          <Card sx={{ boxShadow: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Email color="primary" />
                <Typography variant="h5" component="h2" fontWeight={600}>
                  Support Page Details
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" fontWeight={600} gutterBottom>
                {supportPage.title}
              </Typography>

              <Chip 
                label={supportPage.status.charAt(0).toUpperCase() + supportPage.status.slice(1)} 
                color={getStatusColor(supportPage.status)} 
                size="small"
                sx={{ mb: 3 }}
              />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Story
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {supportPage.story}
                </Typography>
              </Box>

              {supportPage.special_instructions && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Special Instructions
                  </Typography>
                  <Typography variant="body1">
                    {supportPage.special_instructions}
                  </Typography>
                </Box>
              )}

              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Total Tasks
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {supportPage.tasks_count}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Pending Tasks
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {supportPage.pending_tasks_count}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Communication
                  </Typography>
                  <Typography variant="h6" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                    {supportPage.communication_preference}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
