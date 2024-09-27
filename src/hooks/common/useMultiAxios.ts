import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestState<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

// ELIMINAR A FUTURO \/ DELAY ES PARA VISUALIZAR LOADERS
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// ELIMINAR A FUTURO /\ DELAY ES PARA VISUALIZAR LOADERS

export const useMultiAxios = <T,>() => {

    const [requests, setRequests] = useState<Record<string, RequestState<T>>>({});

    const makeRequest = async (key: string, config: AxiosRequestConfig) => {
        
        setRequests((prev) => ({
            ...prev,
            [key]: { data: null, error: null, loading: true },
        }));

        try {
            await delay(1000);
            const response: AxiosResponse<T> = await axios(config);
            console.log(response);
            
            setRequests((prev) => ({
                ...prev,
                [key]: { data: response.data, error: null, loading: false },
            }));
        } catch (error: any) {
            setRequests((prev) => ({
                ...prev,
                [key]: {
                    data: null,
                    error: error.response?.data?.message || 'Error en la petición',
                    loading: false
                },
            }));
        }
    };

    const getRequestState = (key: string) => requests[key] || { data: null, error: null, loading: false };

    return {
        makeRequest,
        getRequestState,
    };
};