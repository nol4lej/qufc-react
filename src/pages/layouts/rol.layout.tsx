import { useUserRole } from "@hooks/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function RolLayout({ rol }: { rol: string }) {
    const { isRoleMatching } = useUserRole();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isRoleMatching(rol)) {
            navigate('/dashboard');
        }
    }, [rol, isRoleMatching, navigate]);

    return <Outlet />;
}