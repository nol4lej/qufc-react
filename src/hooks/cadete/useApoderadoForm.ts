import { useRegiones } from '@hooks/useRegiones';
import { Apoderado } from '@src/types/club/cadete';
import { useForm } from 'react-hook-form';

const relaciones = [
    { nombre: "Madre" },
    { nombre: "Padre" },
    { nombre: "Tutor" },
    { nombre: "Abuela" },
    { nombre: "Abuelo" },
    { nombre: "Hermana" },
    { nombre: "Hermano" },
    { nombre: "Tía" },
    { nombre: "Tío" },
    { nombre: "Familiar cercano" },
]

const useApoderadoForm = (apoderado?: Apoderado) => {

    const { regiones, ciudades, selectedRegion, handleSelectedRegion } = useRegiones(apoderado?.region);

    const { register, handleSubmit, formState: { errors } } = useForm<Apoderado>({
        // resolver: zodResolver(apoderadoSchema),
        defaultValues: {
            nombre: apoderado?.nombre || '',
            apellido: apoderado?.apellido || '',
            rut: apoderado?.rut || '',
            email: apoderado?.email || '',
            telefono: apoderado?.telefono ? Number(apoderado.telefono) : undefined,
            region: apoderado?.region || '',
            ciudad: apoderado?.ciudad || '',
            direccion: apoderado?.direccion || '',
            relacion: apoderado?.relacion || undefined,
        }
    });

    const onSubmit = handleSubmit(values => {
        console.log(values);
    
    })

    return {
        register,
        errors,
        onSubmit,
        regiones, 
        ciudades, 
        selectedRegion, 
        handleSelectedRegion,
        relaciones
    };
};

export default useApoderadoForm;
