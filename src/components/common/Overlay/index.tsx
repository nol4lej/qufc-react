import useLockBodyScroll from "@hooks/useLockBodyScroll";

interface OverlayProps {
    show: boolean;
    onClose: () => void;
    zIndex?: number;
}

export const Overlay: React.FC<OverlayProps> = ({ show, onClose, zIndex = 50 }) => {

    useLockBodyScroll(show);

    if (!show) return null;

    return (
        <div 
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
            style={{ zIndex }}
            onClick={onClose}>
        </div>
    );
};