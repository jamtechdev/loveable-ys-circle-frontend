
import axiosInstance from '../axios';
import axios from '../axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const volunteerService = {

    async getAllVolunteers(page, search) {
        return await axiosInstance.get(`/api/volunteer?page=${page}&search=${search}`);
    },
    async getAssignedSupport(page) {
        return await axiosInstance.get(`/api/volunteer/support-pages?page=${page}`,)
    },
    async getAllTask(support_page_id) {
        return await axiosInstance.get(`/api/task/list?support_page_id=${support_page_id}`)
    },
    async getMyTasks() {
        return await axiosInstance.get(`/api/volunteer/my-tasks`)
    },
    async allSignupsByTask(id) {
        return await axiosInstance.get(`/api/task/${id}/signups`);
    },
    async myInvitations(page) {
        return await axiosInstance.get(`/api/invitation/my?page=${page}`);
    },
     async getVolentierdashboardstats(page) {
        return await axiosInstance.get(`api/volunteer/dashboard-stats`);
    },
      async getUpcomingCommits(page) {
        return await axiosInstance.get(`api/volunteer/upcoming-commitments`);
    },
      async getTaskdetail(taskId) {
        return await axiosInstance.get(`api/volunteer/${taskId}/show`);
    }
}