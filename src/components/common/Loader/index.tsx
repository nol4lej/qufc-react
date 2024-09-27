interface LoaderProps {
    width?: string;
    height?: string;
    color?: string;
}

/**
 * Componente Loader que muestra una animación de carga.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.width='64'] - Ancho del loader en píxeles. Valor por defecto: '64'.
 * @param {string} [props.height='64'] - Alto del loader en píxeles. Valor por defecto: '64'.
 * @returns El componente Loader.
 */
export const Loader = ({ width = '64', height = '64' }: LoaderProps) => {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div
                className={`border-8 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full`}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
            </div>
        </div>
    );
}