import { getCategoriasPosiciones } from "@services/fichaTecnica";
import { Categoria, Posicion } from "@src/types/club";
import { Cadete } from "@src/types/club/cadete";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface DataForm {
    categorias: Categoria["nombre"];
    posiciones: Posicion["nombre"];
}

const useFichaTecnicaForm = (cadeteId: Cadete["id"]) => {

    const { register, handleSubmit, formState: { errors } } = useForm<DataForm>();

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [posiciones, setPosiciones] = useState<Posicion[]>([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await getCategoriasPosiciones();
                // console.log(response.data);
                setCategorias(response.data.categorias);
                setPosiciones(response.data.posiciones)
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategorias()
    }, [])

    const onSubmit = handleSubmit(values => {
        console.log({ values, cadeteId });
    })

    return {
        register,
        errors,
        onSubmit,
        categorias,
        posiciones
    }

}

export default useFichaTecnicaForm;