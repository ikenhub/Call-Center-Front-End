import React from 'react';
import { useLocation } from 'react-router-dom';
import ReturnButton from './ReturnButton';

const Layout = ({ children }) => {
    const location = useLocation();
    // Define pages where you don't want to show the ReturnButton
    const excludedPages = ['/dashboard', '/login'];

    // Check if current location should exclude the ReturnButton
    const shouldExcludeReturnButton = excludedPages.some(page => location.pathname.includes(page));

    return (
        <div>
            {!shouldExcludeReturnButton && <ReturnButton />}
            {children}
        </div>
    );
};

export default Layout;
