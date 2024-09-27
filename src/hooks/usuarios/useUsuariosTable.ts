import { useEffect, useState } from "react";
import { Usuario } from "@src/types/usuario";
import { USUARIO_ENDPOINT } from "@config/envs";
import { useAxiosClient } from "@services/axios";

export const useUsuariosTable = () => {

    const [data, setData] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const axios = useAxiosClient();

    useEffect(() => {

        const fetchRoles = async () => {
            try {
                const response = await axios.get<Usuario[]>(USUARIO_ENDPOINT);
                setData(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, [axios]);

    return {
        data,
        error,
        loading
    }

}