import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import routes, { RequireAuth, AuthPages } from "./routes";
import Header from './components/header';
import { createContext, useState } from 'react';

export const AuthContext = createContext({
    authenticated: false,
    setAuthenticated: (auth) => { }
});

const App = () => {
    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            console.log(route)
            if (route.route) {
                if (route.private) {
                    return <Route key={route.key} element={<RequireAuth />}>
                        <Route exact path={route.route} element={route.component} />
                    </Route>
                }
                if (route.isAuthPage) {
                    return <Route key={route.key} element={<AuthPages />}>
                        <Route exact path={route.route} element={route.component} />
                    </Route>
                }
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            <Header />
            <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/Login" />} />
            </Routes>
        </AuthContext.Provider>
    )
}

export default App
