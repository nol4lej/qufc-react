import { TokenService } from '@services/storage/token';
import axios, { AxiosInstance } from 'axios';

export const useAxiosInterceptors = (axiosInstance: AxiosInstance) => {

    const { getToken } = TokenService;

    // Interceptor de solicitud
    axiosInstance.interceptors.request.use(config => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, error => {
        return Promise.reject(error);
    });

    // Interceptor de respuesta
    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            let errorMessage = 'Error en la petición';

            console.error(error);

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const status = error.response.status;

                    if (status === 401) {
                        errorMessage = error.response.data?.message;
                    } else if (status === 409) {
                        errorMessage = error.response.data?.message;
                    } else if (status === 400) {
                        errorMessage = error.response.data?.message;
                    } else {
                        errorMessage = 'Ha ocurrido un error en el servidor. Por favor, contacte al equipo de soporte o administración para resolver el problema.';
                    }
                } else if (error.request) {
                    errorMessage = 'No se recibió respuesta del servidor';
                } else {
                    errorMessage = `Error inesperado: ${error.message}`;
                }
            } else {
                errorMessage = `Error inesperado: ${error.message}`;
            }

            return Promise.reject(new Error(errorMessage));
        }
    );

    return axiosInstance;
};
