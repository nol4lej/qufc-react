import { useAuthStore } from "@store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ClubDashboard } from "./club";
import { AdminDashboard } from "./admin";
import { CadeteDashboard } from "./cadete";

interface RoleComponentMap {
    'SuperAdmin': () => JSX.Element;
    'Administrador de Club': () => JSX.Element;
    'Cadete': () => JSX.Element;
}

const roleComponentMap: RoleComponentMap = {
    'SuperAdmin': AdminDashboard,
    'Administrador de Club': ClubDashboard,
    'Cadete': CadeteDashboard,
};

export function DashboardPage() {
    const { rol } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!rol || !roleComponentMap[rol.nombre as keyof RoleComponentMap]) {
            navigate('/login');
        }
    }, [rol, navigate]);

    const SelectedComponent = rol ? roleComponentMap[rol.nombre as keyof RoleComponentMap] : null;

    return (
        <>
            {SelectedComponent ? <SelectedComponent /> : null}
        </>
    );
}