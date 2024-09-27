import { useAuthStore } from "@store/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthLogin } from "@hooks/auth";
import { useEffect } from "react";
import { z } from "zod";

const loginSchema = z.object({
    rut: z.string().min(1, "RUT es requerido"),
    password: z.string().min(1, "Contraseña es requerido"),
});

interface FormData {
    rut: string;
    password: string;
}

export const useLoginForm = () => {

    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    });
    const { data, error, loading, authLogin } = useAuthLogin();

    useEffect(() => {
        if (data) {
            console.log(data);
            const { user, token } = data;
            setAuth(user, token)
            navigate('/dashboard');
        }
    }, [data, navigate, setAuth]);

    useEffect(() => {
        if (error) {
            console.log(error);
            setError("root", { message: error || "Ha ocurrido un error en la autenticación." });
        }
    }, [error, setError]);

    const onSubmit = handleSubmit(({ rut, password }) => {
        clearErrors();
        authLogin(rut, password);
    });

    const handleChange = () => {
        clearErrors();
    };

    return {
        register,
        errors,
        onSubmit,
        authError: errors.root?.message || error,
        loading,
        handleChange
    };
}