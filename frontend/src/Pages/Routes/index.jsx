import { Navigate, useRoutes } from "react-router-dom";

import { Home } from "../Screens/Home";

const AppRoutes = () => {

    let routes = useRoutes([
        {path: "/home", element: <Home/>},
        {path: "/*", element: <Navigate replace to={"/home"}/>},
    ]);
    
    return routes;
}

export { AppRoutes };