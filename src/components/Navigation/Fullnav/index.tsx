import { useEffect, useState, useCallback } from 'react';
import { debounce } from '@lib/utils';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Overlay } from '@components/common';

export default function Fullnav({ children }: { children: React.ReactNode }) {

    const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleToggleSidebar = (newState: boolean) => {
        setShowSidebar(newState);
    };

    const handleResize = useCallback(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        setShowSidebar(!mobile);
    }, []);

    useEffect(() => {
        const handleResizeDebounced = debounce(handleResize, 150);
        window.addEventListener('resize', handleResizeDebounced);
        return () => {
            window.removeEventListener('resize', handleResizeDebounced);
        };
    }, [handleResize]);

    return (
        <div className="flex">

            <Sidebar show={showSidebar} />

            <div className="w-full">

                {isMobile && <Overlay show={showSidebar} onClose={() => handleToggleSidebar(false)} />}
                    
                <Navbar onToggle={() => handleToggleSidebar(!showSidebar)} />

                <div className="m-6 p-6">
                    { children }
                </div>

            </div>
        </div>
    );
}