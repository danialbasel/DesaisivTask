import { createContext, useEffect, useState } from 'react';
import { useLocation, Navigate, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Nprogress from 'nprogress';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import routes, { RequireAuth, AuthPages } from './routes';
import Header from './components/header';
import Login from './pages/login/index';

import './App.css'

export const AuthContext = createContext({
    authenticated: false,
    setAuthenticated: (auth) => { },
    showError: false,
    setShowError: (flag) => { },
    errorMsg: '',
    setErrorMsg: (msg) => { },
});

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const Layout = () => {
        const location = useLocation();

        useEffect(() => {
            Nprogress.done(false);

        }, [location])
        return (
            <>
                <Header />
                {showError && <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <b>{errorMsg}</b>
                </Alert>}
                <Outlet />
                
            </>
        );
    }

    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                {
                    element: <Navigate to="/login" />,
                    path: '*'
                },
                {
                    element: <AuthPages />,
                    children: [
                        {
                            path: '/login',
                            element: <Login />
                        }]
                },
                {
                    element: <RequireAuth />,
                    children: [...(routes.map((route) => {
                        return {
                            path: route.route,
                            element: route.component,
                            loader: route.loader
                        }
                    }))]
                }
            ]
        }
    ])
    const data = {
        authenticated,
        setAuthenticated,
        showError,
        setShowError,
        errorMsg,
        setErrorMsg,
    }
    return (
        <AuthContext.Provider value={data}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    )
}

export default App
