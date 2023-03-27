import { useEffect, useState } from "react";
import { Routes, Route, createBrowserRouter, RouterProvider, Router } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Form from "./scenes/form";
// import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AdminDashboard from "./scenes/AdminDashboard/AdminDashboard";
import RootLayout from "./Layout/RootLayout";
import ErrorElement from "./ErrorElement";
import Brand from "./scenes/Brand/Brand";
import Classification from "./scenes/Classification/Classification";
import AssetManagement from "./scenes/AssetManagement/AssetManagement";
import AssetServiceManagement from "./scenes/AssetServiceManagement/AssetServiceManagement";
import AssetRequestList from "./scenes/AssetRequestList/AssetRequestList";

import SignIn from "./SignIn/SignIn.jsx";
import UserDashboard from "./scenes/UserDashboard/UserDashboard";
import AssetRequest from "./scenes/AssetUserRequest/AssetRequest";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: '/brand',
        element: <Brand />,
      },
      {
        path: '/classification',
        element: <Classification />,
      },
      {
        path: '/assetmanagement',
        element: <AssetManagement />,
      },
      {
        path: '/requestlist',
        element: <AssetRequestList />,
      },
      {
        path: '/servicemanagement',
        element: <AssetServiceManagement />,
      },
      {
        path: '/dashboard',
        element: <UserDashboard />,
      },
      {
        path: '/request',
        element: <AssetRequest />,
      }

    ]
  },

])

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUserAuthentication = localStorage.getItem('isLoggedIn');
    if (storedUserAuthentication) {
      setIsAuthenticated(true);
    }}
  ,[]);

  const toggleSidebar = (props) => {
    // console.log("Add",props);
    setIsSidebar(props);
  };

  const handleLogin = (props) => {
    setIsAuthenticated(props);
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
  }



  return (

    <>
      {isAuthenticated ? (
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <RouterProvider router={router} />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      ) : (
        <SignIn onLogin={handleLogin}/>
      )}
      
    </>

  );
}

export default App;
