import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegiones } from '@hooks/useRegiones';
import { Cadete } from '@src/types/club/cadete';

const cadeteSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    apellido: z.string().min(1, "El apellido es requerido"),
    rut: z.string().regex(/^\d{7,8}-[\dKk]$/, "RUT inválido"),
    fecha_nacimiento: z.string().optional().refine(
        date => date === undefined || !isNaN(Date.parse(date)),
        "Fecha de nacimiento inválida"
    ),
    fecha_admision: z.string().optional().refine(
        date => date === undefined || !isNaN(Date.parse(date)),
        "Fecha de admisión inválida"
    ),
    email: z.string().email("Email inválido"),
    telefono: z.string().regex(/^\d{9}$/, "Teléfono inválido"),
    region: z.string().min(1, "La región es requerida"),
    ciudad: z.string().min(1, "La ciudad es requerida"),
    direccion: z.string().min(1, "La dirección es requerida"),
    club: z.string().optional()
});

const useCadeteForm = (cadete?: Cadete) => {
    const [selectedCiudad, setSelectedCiudad] = useState(cadete?.ciudad || '');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { regiones, ciudades, selectedRegion, handleSelectedRegion } = useRegiones(cadete?.region);

    const { register, handleSubmit, formState: { errors } } = useForm<Cadete>({
        resolver: zodResolver(cadeteSchema),
        defaultValues: {
            nombre: cadete?.nombre || '',
            apellido: cadete?.apellido || '',
            rut: cadete?.rut || '',
            fecha_nacimiento: cadete?.fecha_nacimiento ? cadete.fecha_nacimiento : undefined,
            fecha_admision: cadete?.fecha_admision ? cadete.fecha_admision : undefined,
            email: cadete?.email || '',
            telefono: cadete?.telefono ? Number(cadete.telefono) : undefined,
            region: cadete?.region || '',
            ciudad: cadete?.ciudad || '',
            direccion: cadete?.direccion || '',
            club: cadete?.club || ''
        }
    });

    const onSubmit = handleSubmit((values) => {
        console.log({ values, imageFile });
    });

    return {
        regiones,
        ciudades,
        selectedRegion,
        selectedCiudad,
        register,
        errors,
        handleSelectedRegion,
        setSelectedCiudad,
        setImageFile,
        onSubmit,
    };
};

export default useCadeteForm;
