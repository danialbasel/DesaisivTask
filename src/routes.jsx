import { Navigate, Outlet, useLocation } from "react-router-dom";

import Login from './pages/login/index';
import FormPage from './pages/form/index';
import DynamicForm from './pages/dynamicForm/index';
import DataTable from './pages/dataTable/index';
import { AuthContext } from './App';
import { useContext } from 'react';

export const RequireAuth = () => {
    let location = useLocation();
    const { setAuthenticated } = useContext(AuthContext);

    if (!localStorage.getItem("access_token") && !sessionStorage.getItem("access_token")) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    setAuthenticated(true);
    return <Outlet />;
}

export const AuthPages = () => {
    let location = useLocation();

    if (localStorage.getItem("access_token") || sessionStorage.getItem("access_token")) {
        return <Navigate to="/formPage" state={{ from: location }} />;
    }

    return <Outlet />;
}

const routes = [
    {
        name: "Login",
        key: "login",
        route: "/login",
        component: <Login />,
        private: false,
        isAuthPage: true,
    },
    {
        name: "FormPage",
        key: "formPage",
        route: "/formPage",
        component: <FormPage />,
        private: true,
        isAuthPage: false,
    }, {
        name: "DynamicForm",
        key: "dynamicForm",
        route: "/dynamicForm",
        component: <DynamicForm />,
        private: true,
        isAuthPage: false,
    }, {
        name: "DataTable",
        key: "dataTable",
        route: "/dataTable",
        component: <DataTable />,
        private: true,
        isAuthPage: false,
    },
];

export default routes;
