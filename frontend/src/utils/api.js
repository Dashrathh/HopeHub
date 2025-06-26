import axios from "axios";

export const HopeAPI = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API || "/api",
    withCredentials: true,
    timeout: 60 * 60,
})

HopeAPI.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if (error?.response?.data) {
        return Promise.reject(error?.response?.data)
    }

    return Promise.reject(error);
});