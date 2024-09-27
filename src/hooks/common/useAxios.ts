import { useCallback, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useAuth } from '@hooks/auth';

interface HttpRequestState<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

// ELIMINAR A FUTURO \/ DELAY ES PARA VISUALIZAR LOADERS
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// ELIMINAR A FUTURO /\ DELAY ES PARA VISUALIZAR LOADERS

export const useAxios = <T,>() => {

    const { getToken } = useAuth()
    const [state, setState] = useState<HttpRequestState<T>>({
        data: null,
        error: null,
        loading: false,
    });

    /**
     * Ejecuta una solicitud HTTP usando axios.
     * 
     * @param {AxiosRequestConfig} config - La configuración de la solicitud HTTP. Debe incluir al menos la URL de la solicitud y el método.
     * @param {string} config.url - La URL a la que se realiza la solicitud.
     * @param {string} [config.method] - El método HTTP a utilizar (por ejemplo, 'GET', 'POST', etc.). Si no se especifica, se usará 'GET' por defecto.
     * @param {any} [config.data] - Los datos que se enviarán con la solicitud. Útil para solicitudes POST o PUT.
     * @param {object} [config.headers] - Los encabezados HTTP adicionales que se enviarán con la solicitud.
     * @returns {Promise<void>} - Una promesa que se resuelve cuando la solicitud se completa.
     * 
     * @example
     * const { data, error, loading, makeRequest } = useAxios<MyDataType>();
     * 
     * const fetchData = async () => {
     *   await makeRequest({
     *     url: '/api/my-endpoint',
     *     method: 'GET',
     *   });
     * };
     */
    const makeRequest = useCallback(async (config: AxiosRequestConfig) => {
        setState({ data: null, error: null, loading: true });
        try {

            await delay(1000);

            const token = getToken();
            if (token) {
                config = {
                    ...config,
                    headers: {
                        ...config.headers,
                        'Authorization': `Bearer ${token}`
                    }
                }
            }

            const response = await axios(config);

            if (!response || !response.data) {
                throw new Error('Respuesta inesperada del servidor.');
            }

            setState(prevState => ({
                ...prevState,
                data: response.data,
            }));

        } catch (error: any) {

            let errorMessage = 'Error en la petición';

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const status = error.response.status;

                    if (status === 500 || error.response.data.status == 'error') {
                        errorMessage = 'Ha ocurrido un error en el servidor. Por favor, contacte al equipo de soporte o administración para resolver el problema.';
                    } else if (status >= 400 && status <= 499) {
                        errorMessage = error.response.data?.message || 'Error en la petición';
                    } else {
                        errorMessage = error.response.data?.message || 'Error en la petición';
                    }
                } else if (error.request) {
                    errorMessage = 'No se recibió respuesta del servidor';
                } else {
                    errorMessage = `Error inesperado: ${error.message}`;
                }
            } else {
                errorMessage = `Error inesperado: ${error.message}`;
            }

            setState(prevState => ({
                ...prevState,
                error: errorMessage,
            }));

            throw new Error(errorMessage)

        } finally {

            setState(prevState => ({
                ...prevState,
                loading: false,
            }));

        }
    }, [getToken]);

    return {
        ...state,
        makeRequest,
    };
};