import { USUARIO_CREATE, USUARIO_ENDPOINT } from "@config/envs";
import { useAuth, useUserRole } from "@hooks/auth";
import { useModal } from "@hooks/common";
import { useAxiosClient } from "@services/axios";
import { Club } from "@src/types/club";
import { Rol, Subrol, Usuario } from "@src/types/usuario";
import { useEffect, useReducer, useState } from "react";
import { z } from "zod";

interface UsuarioResponse {
    user: Usuario;
}

export interface UsuarioForm {
    nombre: string;
    segundo_nombre: string;
    apellido_paterno: string;
    rut: string;
    rol_id: Rol["id"];
    subroles: Subrol["id"][];
    club: Club["nombre"];
}

const usuarioSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    segundo_nombre: z.string().min(1, "El nombre es requerido"),
    apellido_paterno: z.string().min(1, "El apellido es requerido"),
    rut: z.string().regex(/^\d{7,8}-[\dKk]$/, "El RUT ingresado debe ser sin puntos y con guión."),
    club: z.string().min(1, "El club es requerido."),
    rol_id: z.string().uuid("El rol es requerido."),
    subroles: z.array(z.string().uuid("El subrol es requerido.")).optional()
});

const initialState = {
    loading: false,
    submitError: null,
    success: false,
    isProfesionalSelected: false,
    errors: {} as Record<string, string>,
    user: null as Usuario | null
};

type State = typeof initialState;

const reducer = (state: State, action: Partial<State>) => ({
    ...state,
    ...action,
});

export const useUsuarioForm = (usuarioId?: Usuario["id"]) => {

    const axios = useAxiosClient();
    const { getUsuarioRol, getUsuarioClub, getUsuario } = useAuth();
    const { isProfesionalRol } = useUserRole();
    const { handleCloseModal, handleOpenModal, showModal } = useModal();

    const [state, dispatch] = useReducer(reducer, initialState);
    const [formValues, setFormValues] = useState<UsuarioForm>({
        nombre: '',
        segundo_nombre: '',
        apellido_paterno: '',
        rut: '',
        rol_id: '',
        subroles: [],
        club: ''
    });

    const { loading, submitError, success, user, isProfesionalSelected, errors } = state;

    useEffect(() => {
        if (usuarioId) {
            const fetchUser = async () => {
                try {
                    dispatch({ loading: true });
                    const response = await axios.get<UsuarioResponse>(`${USUARIO_ENDPOINT}/${usuarioId}`);

                    if (response.data && response.data.user) {
                        const user = response.data.user;

                        dispatch({ 
                            success: true,
                            user: user,
                            isProfesionalSelected: isProfesionalRol(user.rol.id)
                        })
                        
                        setFormValues({
                            nombre: user.nombre || '',
                            segundo_nombre: user.segundo_nombre || '',
                            apellido_paterno: user.apellido_paterno || '',
                            rut: user.rut || '',
                            rol_id: user.rol.id || '',
                            subroles: user.subroles?.map(subrol => subrol.id) || [],
                            club: user.club || '',
                        });

                    }

                } catch (error) {
                    console.error(error);
                } finally {
                    dispatch({ loading: false });
                }
            };
            fetchUser();
        }
    }, [usuarioId, axios]);

    const handleCloseConfirmModal = () => {
        dispatch({ submitError: null, success: false });
        handleCloseModal();
    };

    const handleSelectedRol = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rol_id = event.target.value;
        setFormValues((prev) => ({ ...prev, rol_id }));
        dispatch({ isProfesionalSelected: isProfesionalRol(rol_id) });
    };

    const handleSelectedSubRol = (selectedIds: Subrol["id"][]) => {
        dispatch({
            errors: {
                ...errors,
                subroles: '',
            },
        });
        setFormValues((prev) => ({ ...prev, subroles: selectedIds }));
    };

    const handleSelectedClub = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const club = event.target.value;
        setFormValues((prev) => ({ ...prev, club }));
    };

    const validateForm = () => {
        try {
            usuarioSchema.parse(formValues);

            if (isProfesionalSelected && formValues.subroles.length === 0) {
                dispatch({
                    errors: {
                        ...errors,
                        subroles: "Debe seleccionar al menos un subrol para el rol Profesional."
                    }
                });
                return false;
            }

            dispatch({ errors: {} });
            return true;

        } catch (error) {
            
            if (error instanceof z.ZodError) {

                const newErrors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {} as Record<string, string>);

                dispatch({ errors: newErrors });
            }
            return false;
        }
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log(formValues);
        

        if (validateForm()) {

            // Si el rol seleccionado no es 'Profesional', se limpian los subroles antes asignados. (Esto solo por precaución)
            if (!isProfesionalRol(formValues.rol_id)) {
                formValues.subroles = [];
            }

            // Cuando el user sea Admin. de Club, el usuario se creará en su mismo club.
            if (getUsuarioRol?.nombre === "Administrador de Club" && getUsuarioClub) {
                formValues.club = getUsuarioClub.nombre;
            }

            handleOpenModal();
        }
    };

    const handleOnSubmit = () => {
        if (formValues) {
            requestHandler(formValues);
        }
    };

    const requestHandler = async (values: UsuarioForm) => {
        try {
            dispatch({ loading: true });
            await axios.post<UsuarioResponse>(USUARIO_CREATE, values);
            dispatch({ success: true });
            resetForm();
        } catch (error: any) {
            dispatch({ submitError: error.message || "Hubo un problema al crear el usuario." });
        } finally {
            dispatch({ loading: false });
        }
    };

    const resetForm = () => {
        setFormValues({
            nombre: '',
            segundo_nombre: '',
            apellido_paterno: '',
            rut: '',
            rol_id: '',
            subroles: [],
            club: ''
        });
        dispatch({ isProfesionalSelected: false });
        dispatch({ errors: {} })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        dispatch({
            errors: {
                ...errors,
                [e.target.name]: '',
            },
        });
    };

    return {
        loading,
        submitError,
        success,
        user,
        isProfesionalSelected,
        errors,

        formValues,
        onSubmit,
        handleOnSubmit,

        handleChange,
        handleSelectedClub,
        handleSelectedRol,
        handleSelectedSubRol,

        showModal,
        handleCloseConfirmModal,

        getUsuarioRol,
        getUsuario,
        resetForm
    };
};
