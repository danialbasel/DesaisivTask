import './App.css'
import { useLocation, Navigate, createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import routes, { RequireAuth, AuthPages } from "./routes";
import Header from './components/header';
import { createContext, useEffect, useState } from 'react';
import Login from './pages/login/index';
import Nprogress from 'nprogress';

export const AuthContext = createContext({
    authenticated: false,
    setAuthenticated: (auth) => { }
});

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const Layout = () => {
        let location = useLocation();

        useEffect(() => {
            Nprogress.done(false);

        }, [location])
        return (
            <>
                <Header />
                <Outlet />
            </>
        );
    }

    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                {
                    element: <Navigate to="/Login" />,
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

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    )
}

export default App
