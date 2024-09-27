import { useEffect, useState } from 'react';
import { useRegionesStore } from '@store/regiones';
import { Region } from '@src/types/store/regionesStore';

export const useRegiones = (userRegion?: Region["nombre"]) => {
    
    const { regiones, ciudades, setCiudades } = useRegionesStore();
    const [selectedRegion, setSelectedRegion] = useState<Region["nombre"] | string>(userRegion || '');

    useEffect(() => {
        if (userRegion) {
            const regionData = regiones.find((region: Region) => region.nombre === userRegion);
            setCiudades(regionData?.ciudades || []);
        }
    }, [userRegion, setCiudades, regiones]);

    const handleSelectedRegion = (value: Region["nombre"]) => {
        console.log(value);
        
        const regionData = regiones.find((region) => region.nombre === value);
        setSelectedRegion(value);
        setCiudades(regionData?.ciudades || []);
    };

    return {
        regiones,
        ciudades,
        selectedRegion,
        handleSelectedRegion,
    };
};
