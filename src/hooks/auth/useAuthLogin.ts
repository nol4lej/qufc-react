import { AUTH_LOGIN } from '@config/envs';
import { useAxiosClient } from '@services/axios';
import { TokenService } from '@services/storage/token';
import { Usuario } from '@src/types/usuario';
import { useState } from 'react';

interface UserLogin {
    user: Usuario;
    token: string
}

export const useAuthLogin = () => {

    const axios = useAxiosClient()

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<UserLogin | null>(null);

    const authLogin = async (rut: string, password: string) => {
        setLoading(true)
        try {
            const response = await axios.post<UserLogin>(AUTH_LOGIN, { rut, password });
            setData(response.data);
            TokenService.setToken(response.data.token)
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        authLogin,
    };
};
