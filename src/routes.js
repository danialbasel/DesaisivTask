import { Navigate, Outlet, useLocation } from "react-router-dom";

import Login from './pages/login/index';
import FormPage from './pages/form/index';
import DynamicForm from './pages/dynamicForm/index';
import DataTable from './pages/dataTable/index';

//export const RequireAuth = () => {
//    let location = useLocation();

//    if (!localStorage.getItem("access_token") && !sessionStorage.getItem("access_token")) {
//        return <Navigate to="/login" state={{ from: location }} />;
//    }

//    return <Outlet />;
//}

//export const AuthPages = () => {
//    let location = useLocation();

//    if (localStorage.getItem("accessToken") || sessionStorage.getItem("access_token")) {
//        return <Navigate to="/dataTable" state={{ from: location }} />;
//    }

//    return <Outlet />;
//}

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
