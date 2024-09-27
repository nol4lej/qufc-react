import FichaTecnicaForm from "./FichaTecnicaForm";
import { Cadete } from "@src/types/club/cadete";
import { useModal } from "@hooks/common";
import { Modal } from "@components/common/Modals";

const FichaTecnicaModalForm = ({ cadeteId }: { cadeteId: Cadete["id"] }) => {

    const { showModal, handleCloseModal, handleOpenModal } = useModal();

    return (
        <>
            <button
                className="w-full sm:w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleOpenModal}>
                Crear Ficha Técnica
            </button>

            <Modal show={showModal} onClose={handleCloseModal}>
                <FichaTecnicaForm cadeteId={cadeteId} onClose={handleCloseModal}/>
            </Modal>
        </>
    )
}

export default FichaTecnicaModalForm;