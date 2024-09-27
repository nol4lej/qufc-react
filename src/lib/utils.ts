/**
 * Técnica utilizada para controlar la frecuencia con la que una funcion es ejecutada.
 * Garantizo que la funcion no sea llamda con demasiada frecuencia en un corto periodo de tiempo.
 * Muy útil en situaciones donde se desencaden muchos eventos en rápida suceción.
 * 
 * @param func - La función que se desea controlar.
 * @param wait - El tiempo de espera en milisegundos antes de permitir la ejecución de la función.
 * @returns Una función que, cuando se llama, restablece el temporizador de espera y ejecuta la función original
 * después del tiempo de espera especificado si no se llama de nuevo dentro de ese periodo.
 */
export function debounce(func: () => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timeout); // Limpia el temporizador existente
        timeout = setTimeout(func, wait); // Establece un nuevo temporizador
    };
}