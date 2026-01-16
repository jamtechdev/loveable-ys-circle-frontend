import axios from 'axios';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Remove token if unauthorized
            Cookies.remove("token");
            Cookies.remove("user");
            if (typeof window !== "undefined") {
                window.location.href = "/";
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
