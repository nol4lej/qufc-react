interface NavbarProps {
    onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggle }) => {
    return (
        <nav className="w-full bg-gray-100 p-6 drop-shadow-md">
            <div className="w-full flex justify-between">
                <div className="flex gap-6">
                    <div>
                        <button onClick={onToggle}>
                            <i className={`bi bi-list`}></i>
                        </button>
                    </div>
                    <div>
                        Administrador
                    </div>
                </div>
                <div>
                    Usuario
                </div>
            </div>
        </nav>
    );
};

export default Navbar;