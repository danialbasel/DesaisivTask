import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from './pages/login/index';
import FormPage from './pages/form/index';
import DynamicForm from './pages/dynamicForm/index';
import DataTable from './pages/dataTable/index';
import { AuthContext } from './App';
import { useContext } from 'react';
import TableService from "./services/table";
import Nprogress from 'nprogress';
import DynamicFormService from "./services/dynamicForm";

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
const tableLoader = async () => {
    const params = {
        size: 10
    };
    return await TableService.GetRows(params);

}

const dynamicFormLoader = async () => {
    return await DynamicFormService.GetForms()
}

export const NavigateTo = (Navigate, path) => {
    Nprogress.start();
    Navigate(path);
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
        loader: dynamicFormLoader,
        component: <DynamicForm />,
        private: true,
        isAuthPage: false,
    }, {
        name: "DataTable",
        key: "dataTable",
        route: "/dataTable",
        loader: tableLoader,
        component: <DataTable />,
        private: true,
        isAuthPage: false,
    },
];



export default routes;
