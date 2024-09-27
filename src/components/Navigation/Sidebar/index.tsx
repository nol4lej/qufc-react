import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ProfileMenu } from './menus';
import { useAuthStore } from '@store/auth';
import { Rol } from '@src/types/usuario';

interface MenuItem {
    title: string;
    subItems: { title: string; path: string; }[];
}

const roleConfig: Record<Rol["nombre"], { title: string; menu: MenuItem[] }> = {
    'SuperAdmin': {
        title: 'Administrador',
        menu: ProfileMenu.superAdmin,
    },
    'Administrador de Club': {
        title: 'Administrador de Club',
        menu: ProfileMenu.administradorClub,
    },
    'Cadete': {
        title: 'Cadete',
        menu: ProfileMenu.cadete,
    },
};

const Sidebar = ({ show }: { show: boolean }) => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const location = useLocation();
    const { rol } = useAuthStore();

    useEffect(() => {
        if (rol && roleConfig[rol.nombre]) {
            const roleData = roleConfig[rol.nombre];
            setItems(roleData.menu || []);
        } else {
            setItems([]);
        }
    }, [rol]);

    return (
        <aside className={`
            fixed md:relative z-[60]
            ${show ? 'block' : 'hidden'}
            min-w-60 w-max bg-gray-100 border-r-1 h-screen overflow-y-auto shadow-md rounded-r-lg
        `}>
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    {rol && roleConfig[rol.nombre]?.title}
                </h2>

                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li key={index} className="border-b border-gray-300 pb-4">
                            <span className="block text-lg font-semibold text-gray-900 mb-2">
                                {item.title}
                            </span>
                            <ul className="space-y-2">
                                {item.subItems.map((subItem, subIndex) => (
                                    <li key={subIndex} className="text-gray-700">
                                        <NavLink
                                            to={subItem.path}
                                            className={`
                                                block px-4 py-2 rounded-md transition-colors duration-200 
                                                ${location.pathname === subItem.path ? "bg-blue-500 text-white hover:bg-blue-300" : "hover:bg-blue-100"} `}
                                        >
                                            {subItem.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
