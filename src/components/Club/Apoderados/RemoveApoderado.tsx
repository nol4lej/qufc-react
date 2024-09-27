import { Modal } from "@components/common/Modals";
import { useModal } from "@hooks/common";
import { removeApoderadoFromCadete } from "@services/cadetes";
import { Cadete } from "@src/types/club/cadete";

const RemoveApoderado = ({ apoderadoId }: { apoderadoId: Cadete["id"] }) => {

    const { showModal, handleOpenModal, handleCloseModal } = useModal()

    const handleRemoveApoderado = async () => {
        try {
            if (!apoderadoId) return;
            const response = await removeApoderadoFromCadete(apoderadoId);
            console.log(response);
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <button
                onClick={handleOpenModal}
                className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 inline-flex items-center">
                <i className="bi bi-trash3"></i>
            </button>

            <Modal show={showModal} onClose={handleCloseModal}>
                <div className="flex flex-col items-center mt-6">
                    <i className="bi bi-exclamation-triangle text-red-500 text-4xl"></i>
                    <h2 className="text-lg font-semibold mb-1">Confirmar Eliminación</h2>
                    <p className="text-gray-600 mb-6 text-center">¿Estás seguro de que deseas eliminar a este apoderado? Esta acción no se puede deshacer.</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleRemoveApoderado}
                            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">
                            Confirmar
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2">
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default RemoveApoderado;