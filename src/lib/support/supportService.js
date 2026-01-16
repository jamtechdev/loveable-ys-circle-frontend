import axiosInstance from '../axios';
import axios from '../axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const supportService = {
    async create(token, payload) {
        return await axios.post(`${baseURL}/api/support-page/create`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
    },
    async getAll(page, search) {
        return await axiosInstance.get(`/api/support-page/list?page=${page}&search=${search}`,)
    },
    async getSupportById(id) {
        return await axiosInstance.get(`/api/support-page/${id}`);
    },
    async assignRecipient(payload) {
        return await axiosInstance.post(`/api/support-page/assign/recipient`,
            payload,
        )
    },
    async supportReason() {
        return await axios.get(`${baseURL}/api/support-reasons?page=1`

        )
    },
    async sendInvitation(payload) {
        return await axiosInstance.post(`/api/invitation/send`,
            payload,
        )
    },
    async getCoordinateDashboardStats() {
        return await axiosInstance.get(`/api/coordinator/dashboard-statistics`);
    },
    async getUpcomingTask() {
        return await axiosInstance.get(`/api/coordinator/upcoming-tasks`);
    },
    async getlatestSupportPage() {
        return await axiosInstance.get(`/api/coordinator/support-pages`);
    },
    async removeVollentier(id) {
        return await axiosInstance.post(`/api/volunteer/support-pages/${id}/leave`);
    },
    async getTaskById(taskId) {
        return await axiosInstance.get(`api/task/${taskId}/show`);
    },

    // New update method
    async updateTask(taskId, data) {
        return await axiosInstance.put(`api/task/${taskId}/update`, data);
    },
    deleteTask: async (taskId) => {
        return await axiosInstance.delete(`api/task/${taskId}/delete`);
    },
    async leaveSupportPage(supportPageId, VolentierId) {
        return await axiosInstance.post(`/api/volunteer/support-pages/${supportPageId}/leave`, { "user_id": VolentierId });
    },
    async getSignupApprovallist(taskId) {
        return await axiosInstance.get(`api/task/${taskId}/sign-up-show`);
    },
    async approveSignup(signupId) {
        return await axiosInstance.post(`/api/task/${signupId}/approve-signup`,);
    },
     async rejectSignup(signupId) {
        return await axiosInstance.post(`/api/task/${signupId}/reject-signup`,);
    },
    async  deleteSupportPage (supportId) {
        return await axiosInstance.delete(`api/support-page/${supportId}/delete`);
    },
      async getTaskdetail(taskId) {
        return await axiosInstance.get(`api/volunteer/${taskId}/show`);
    },
      async UpdateSupportPage(Id,payload) {
        return await axiosInstance.put(`/api/support-page/${Id}/update`,
            payload,
        );
    },
}