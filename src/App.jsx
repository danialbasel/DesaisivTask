import './App.css'
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import routes, { RequireAuth, AuthPages } from "./routes";

const App = () => {
    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            console.log(route)
            if (route.route) {
                //if (route.private) {
                //    return <Route key={route.key} element={<RequireAuth />}>
                //        <Route exact path={route.route} element={route.component} />
                //    </Route>
                //}
                //if (route.isAuthPage) {
                //    return <Route key={route.key} element={<AuthPages />}>
                //        <Route exact path={route.route} element={route.component} />
                //    </Route>
                //}
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });
    return (
        <>
            <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/Login" />} />
            </Routes>
        </>
    )
}

export default App
