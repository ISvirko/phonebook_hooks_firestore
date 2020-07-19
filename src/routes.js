import { lazy } from "react";

const routes = [
  {
    path: "/",
    label: "Home",
    exact: true,
    component: lazy(() => import("./views/HomeView/HomeView")),
    private: false,
    restricted: false,
  },
  {
    path: "/register",
    label: "Register",
    exact: true,
    component: lazy(() => import("./views/RegisterView/RegisterView")),
    private: false,
    restricted: true,
  },
  {
    path: "/login",
    label: "Login",
    exact: true,
    component: lazy(() => import("./views/LoginView/LoginView.js")),
    private: false,
    restricted: true,
  },
  {
    path: "/contacts",
    label: "Contacts",
    exact: true,
    component: lazy(() => import("./views/ContactsView/ContactsView.js")),
    private: true,
    restricted: false,
  },
];

export default routes;

export const homeRoute = routes.find((route) => route.label === "Home");
export const registerRoute = routes.find((route) => route.label === "Register");
export const loginRoute = routes.find((route) => route.label === "Login");
export const contactsRoute = routes.find((route) => route.label === "Contacts");
