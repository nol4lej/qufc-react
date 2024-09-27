import { Overlay } from '@components/common';
import { ModalProps } from '@src/types/common';

/**
 * Componente Modal.
 * 
 * @param {Object} props - Props para el componente Modal.
 * @param {boolean} props.show - Indica si el modal se muestra o no.
 * @param {() => void} props.onClose - Función que se llama al cerrar el modal.
 * @param {React.ReactNode} props.children - Contenido del modal.
 * @returns Elemento TSX del modal o null si no se debe mostrar.
 */
export const Modal = ({ show, onClose, children }: ModalProps) => {
    
    if (!show) return null;

    return (
        <>
            <div className="fixed inset-0 z-[61] h-full w-full flex items-center justify-center">
                <Overlay show={show} onClose={onClose} zIndex={60} />
                <div className="rounded-lg shadow-lg z-[62] max-w-lg w-full max-h-95vh overflow-y-auto">

                    <div className="relative bg-white p-6">
                        <button
                            className="absolute text-4xl top-0 right-2 hover:text-gray-900 hover:text-blue-900 hover:font-extrabold"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                        {children}
                    </div>

                </div>
            </div>
        </>
    );
};