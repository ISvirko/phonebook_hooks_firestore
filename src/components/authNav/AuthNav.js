import React from "react";
import { NavLink } from "react-router-dom";
import { registerRoute, loginRoute } from "../../routes";

const AuthNav = () => (
  <>
    <NavLink
      to={registerRoute.path}
      exact={registerRoute.exact}
      className="navbar-brand"
      activeStyle={{ color: "#343a40" }}
    >
      {registerRoute.label}
    </NavLink>
    <NavLink
      to={loginRoute.path}
      exact={loginRoute.exact}
      className="navbar-brand"
      activeStyle={{ color: "#343a40" }}
    >
      {loginRoute.label}
    </NavLink>
  </>
);

export default AuthNav;
