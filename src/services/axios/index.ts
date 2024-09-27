import { useRef } from 'react';
import { createAxiosInstance } from './instance';
import { useAxiosInterceptors } from './interceptors';

export const useAxiosClient = () => {
    const axiosInstance = createAxiosInstance();
    const instanceWithInterceptors = useAxiosInterceptors(axiosInstance);

    // Al crear la instancia de axios usando useRef, evitamos que se genere una nueva instancia
    // en cada renderizado del componente. Esto es importante porque, si la instancia de axios
    // fuera recreada en cada render, cualquier efecto (useEffect) que dependa de axios podría
    // causar un bucle infinito al detectar un cambio en la instancia y volver a ejecutarse.
    // Al mantener la misma instancia de axios a lo largo del ciclo de vida del componente,
    // garantizamos que los efectos no se disparen innecesariamente, evitando así posibles
    // bucles infinitos.

    const axiosRef = useRef(instanceWithInterceptors);

    return axiosRef.current;
};