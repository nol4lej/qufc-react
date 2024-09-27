import { createBrowserRouter } from "react-router-dom";

import { PrivateLayout, RolLayout } from "@pages/layouts";

import NotFound from "@pages/not-found";
import LoginPage from "@pages/login";

import RegistrarCadete from "@pages/dashboard/club/cadetes/registrar";
import EditarCadete from "@pages/dashboard/club/cadetes/editar";
import CrearUsuario from "@pages/dashboard/club/usuarios/crear";
import EditarUsuario from "@pages/dashboard/club/usuarios/editar";

import { AdminDashboard, AdminUsuarios } from "@pages/dashboard/admin";
import { ClubDashboard, ClubEstadisticas, ClubUsuarios, ListadoDeCadete } from "@pages/dashboard/club";
import { DashboardPage } from "@pages/dashboard";
import { CadeteDashboard, PerfilCadete } from "@pages/dashboard/cadete";
import { AdminCrearUsuario } from "@pages/dashboard/admin/usuarios/crear";
import { AdminEditarUsuario } from "@pages/dashboard/admin/usuarios/editar";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/dashboard", children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    },
                    {
                        path: "admin",
                        element: <RolLayout rol="SuperAdmin" />,
                        children: [
                            {
                                index: true,
                                element: <AdminDashboard />,
                            },
                            {
                                path: "usuarios",
                                children: [
                                    {
                                        index: true,
                                        element: <AdminUsuarios />
                                    },
                                    {
                                        path: "crear",
                                        element: <AdminCrearUsuario />
                                    },
                                    {
                                        path: "editar/:id",
                                        element: <AdminEditarUsuario />
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        path: "club",
                        element: <RolLayout rol="Administrador de Club" />,
                        children: [
                            {
                                index: true,
                                element: <ClubDashboard />,
                            },
                            {
                                path: "estadisticas",
                                element: <ClubEstadisticas />,
                            },
                            {
                                path: "cadetes",
                                children: [
                                    {
                                        index: true,
                                        element: <ListadoDeCadete />,
                                    },
                                    {
                                        path: "registrar",
                                        element: <RegistrarCadete />,
                                    },
                                    {
                                        path: "editar/:id",
                                        element: <EditarCadete />,
                                    },
                                ]
                            },
                            {
                                path: "usuarios",
                                children: [
                                    {
                                        index: true,
                                        element: <ClubUsuarios />
                                    },
                                    {
                                        path: "crear",
                                        children: [
                                            {
                                                index: true,
                                                element: <CrearUsuario />
                                            }
                                        ]
                                    },
                                    {
                                        path: "editar/:id",
                                        children: [
                                            {
                                                index: true,
                                                element: <EditarUsuario />
                                            }
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        path: "cadete",
                        element: <RolLayout rol="Cadete" />,
                        children: [
                            {
                                index: true,
                                element: <CadeteDashboard />,
                            },
                            {
                                path: "perfil",
                                element: <PerfilCadete />,
                            },
                        ]
                    }

                ]
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <NotFound />,
    }
]);
