import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './App';

import Nprogress from 'nprogress';

import Login from './pages/login/index';
import FormPage from './pages/form/index';
import DynamicForm from './pages/dynamicForm/index';
import DataTable from './pages/dataTable/index';

import TableService from "./services/table";
import DynamicFormService from './services/dynamicForm';

export const RequireAuth = () => {
    const location = useLocation();
    const { setAuthenticated } = useContext(AuthContext);

    if (!localStorage.getItem("access_token") && !sessionStorage.getItem("access_token")) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    setAuthenticated(true);
    return <Outlet />;
}

export const AuthPages = () => {
    const location = useLocation();
    if (localStorage.getItem("access_token") || sessionStorage.getItem("access_token")) {
        return <Navigate to="/form_page" state={{ from: location }} />;
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
        route: "/login",
        component: <Login />,
        private: false,
    },
    {
        route: "/form_page",
        component: <FormPage />,
        private: true,
    }, {
        route: "/dynamic_form",
        loader: dynamicFormLoader,
        component: <DynamicForm />,
    }, {
        route: "/data_table",
        loader: tableLoader,
        component: <DataTable />,
    },
];



export default routes;
