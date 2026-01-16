
import axiosInstance from '../axios';
import axios from '../axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const recipientService = {

    async getThankYouList(page,) {
        return await axiosInstance.get(`/api/thank-you/list?page=${page}`);
    },

    async getSupportList(page,) {
        return await axiosInstance.get(`api/recipient/support-pages?page=${page}`);
    },
     async getRecipientSupportById(id) {
        return await axiosInstance.get(`/api/recipient/support-pages/${id}`);
    },

      async getRecipientTaskList(support_page_id,page) {
        return await axiosInstance.get(`api/recipient/support-pages/${support_page_id}/tasks?page=${page}`);
    },

      async sendThankyou(payload) {
        return await axiosInstance.post(`/api/thank-you/send`,
            payload,
        )
    },
    async getRecipientStats(id) {
        return await axiosInstance.get(`/api/recipient/dashboard-stats`);
    },
     async getUpcominghelp(id) {
        return await axiosInstance.get(`/api/recipient/upcoming-tasks`);
    },
    
}