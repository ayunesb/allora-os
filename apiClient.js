import axios from "axios";
const apiClient = axios.create({
    baseURL: "https://api.example.com",
    timeout: 1000,
});
apiClient.interceptors.response.use((response) => response, (error) => {
    return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
    };
});
export default apiClient;
