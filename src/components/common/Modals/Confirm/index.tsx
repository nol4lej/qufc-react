import { ModalProps } from "@src/types/common";
import { Modal } from "../Template";

interface ConfirmModalProps extends ModalProps {
    handleOnSubmit: () => void;
    submitError: string | null;
    success: boolean;
    confirmMessage: string;
    successMessage: string;
}

export const ConfirmModal = ({ show, onClose, handleOnSubmit, success, submitError, confirmMessage, successMessage }: ConfirmModalProps) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                {submitError ? (
                    <div className="flex flex-col items-center space-y-4">
                        <i className="bi bi-exclamation-triangle-fill text-red-600 text-5xl"></i>
                        <span className="text-red-600 text-xl font-semibold text-center">{submitError}</span>
                        <button
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : success ? (
                    <div className="flex flex-col items-center space-y-4">
                        <i className="bi bi-check-circle-fill text-green-600 text-5xl"></i>
                        <span className="text-green-600 text-xl font-semibold">{successMessage}</span>
                        <button
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <i className="bi bi-check-circle-fill text-green-600 text-5xl"></i>
                        <span className="text-xl font-semibold text-gray-800">{confirmMessage}</span>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleOnSubmit}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};
