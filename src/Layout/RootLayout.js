import React, { useState } from 'react';
import Sidebar from '../scenes/global/Sidebar';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { Outlet } from 'react-router-dom';
import Topbar from '../scenes/global/Topbar';

const RootLayout = () => {
    const [isSidebar, setIsSidebar] = useState(false);
    const [isOpenSidebar, setIsOpenSidebar] = useState('');

    const toggleSidebar = (props) => {
        // console.log("Add",props);
        setIsSidebar(props);
    };

    const [theme, colorMode] = useMode();
    return (
        <>
            <Sidebar isSidebar={isSidebar} isOpen={isSidebar} />

            <main className="content">
                <Topbar setIsSidebar={toggleSidebar} />
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;