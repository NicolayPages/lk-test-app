import * as React from "react";
import Login from "../pages/Login/Login";

const Contacts = React.lazy(() => import("../pages/Contacts/Contacts"));

export const publicRoutes = [{ path: "/login", element: <Login /> }];

export const privateRoutes = [{ path: "/contacts", element: <Contacts /> }];
