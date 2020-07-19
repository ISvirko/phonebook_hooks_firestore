import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { homeRoute, contactsRoute } from "../../routes";
import { authSelectors } from "../../redux/auth";

const Navigation = () => {
  const isAuth = useSelector((state) => authSelectors.isAuth(state));

  return (
    <>
      <NavLink
        to={homeRoute.path}
        exact={homeRoute.exact}
        className="navbar-brand"
        activeStyle={{ color: "#343a40" }}
      >
        {homeRoute.label}
      </NavLink>

      {isAuth && (
        <NavLink
          to={contactsRoute.path}
          exact={contactsRoute.exact}
          className="navbar-brand"
          activeStyle={{ color: "#343a40" }}
        >
          {contactsRoute.label}
        </NavLink>
      )}
    </>
  );
};

export default Navigation;
