import Fullnav from "@components/Navigation/Fullnav"
import { useAuth } from "@hooks/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

export function PrivateLayout() {

    const navigate = useNavigate();
    const { checkIsLogged } = useAuth();

    useEffect(() => {
        if (!checkIsLogged()) {
            navigate("/login");
        }
    }, [checkIsLogged, navigate])

    return (
        <Fullnav>
            <Outlet />
        </Fullnav>
    )
}