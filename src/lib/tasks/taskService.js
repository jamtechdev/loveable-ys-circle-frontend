import axiosInstance from '../axios';
import axios from '../axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const taskService = {
    async create(payload) {
        return await axiosInstance.post(`/api/task/create`,
            payload,
        )
    },
    async getTasks(id){
        return await axiosInstance.get(`/api/task/list?support_page_id=${id}`);
    },
    async getCategories() {
        return await axiosInstance.get(`/api/task-categories`,)
    },
     async signupTask(id){
        return await axiosInstance.post(`/api/task/${id}/signup`,
            {}
        );
    },
    async markCompleteTask(id){
        return await axiosInstance.post(`/api/task/${id}/complete`,
            {}
        )
    },
}