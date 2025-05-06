import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class EnhancedApiClient {
	private client: AxiosInstance;

	constructor(baseURL: string) {
		this.client = axios.create({ baseURL });

		// Add request interceptor
		this.client.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// Add custom headers or logging here
				console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
				return config;
			},
			(error) => {
				// Handle request errors
				console.error('Request error:', error);
				return Promise.reject(error);
			}
		);

		// Add response interceptor
		this.client.interceptors.response.use(
			(response: AxiosResponse) => {
				// Log or transform response here
				console.log('Response:', response.status, response.data);
				return response;
			},
			(error) => {
				// Handle response errors
				console.error('Response error:', error.response?.status, error.message);
				return Promise.reject(error);
			}
		);
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.get<T>(url, config);
		return response.data;
	}

	async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.post<T>(url, data, config);
		return response.data;
	}

	// Add other HTTP methods (put, delete, etc.) as needed
}

export default EnhancedApiClient;
export { EnhancedApiClient };
