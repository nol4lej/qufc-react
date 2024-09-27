import ApoderadoForm from './ApoderadoForm';
import { Apoderado } from '@src/types/club/cadete';
import { useModal } from '@hooks/common';
import { Modal } from '@components/common/Modals';

interface ApoderadoModalFormProps {
    apoderado?: Apoderado;
    cadeteId?: string;
}

/**
 * Componente ApoderadoModalForm
 *
 * Este componente muestra un botón para agregar o editar un apoderado. 
 * Si se proporciona `cadeteId`, se muestra el botón "Agregar apoderado". 
 * Si se proporciona `apoderado`, se muestra el botón para editar con un ícono de lápiz.
 * Al hacer clic en los botones, se abre un modal que contiene el formulario `apoderadoForm`.
 *
 * @param {ApoderadoModalFormProps} props - Las propiedades del componente.
 * @param {Apoderado} [props.apoderado] - Objeto apoderado que contiene los datos de una fila de la tabla apoderadoTable.
 * @param {string} [props.cadeteId] - ID del cadete que proviene de apoderadoComponent.
 * @returns
 */
const ApoderadoModalForm = ({ apoderado, cadeteId }: ApoderadoModalFormProps) => {

    const { showModal, handleOpenModal, handleCloseModal } = useModal()

    return (
        <>
            {
                cadeteId &&
                <button
                    className="w-full sm:w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handleOpenModal}>
                    Agregar Apoderado
                </button>
            }

            {
                apoderado &&
                <button
                    onClick={handleOpenModal}
                    className="text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 font-medium rounded-lg text-sm p-2.5 inline-flex items-center">
                    <i className="bi bi-pen"></i>
                </button>

            }

            <Modal show={showModal} onClose={handleCloseModal}>
                <ApoderadoForm apoderado={apoderado} onClose={handleCloseModal} />
            </Modal>
        </>
    );
};

export default ApoderadoModalForm;
