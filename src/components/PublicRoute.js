import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { homeRoute } from "../routes";
import { authSelectors } from "../redux/auth";

const PublicRoute = ({ component: Component, restricted, ...routeProps }) => {
  const isAuth = useSelector((state) => authSelectors.isAuth(state));

  return (
    <Route
      {...routeProps}
      render={(props) =>
        isAuth && restricted ? (
          <Redirect to={homeRoute.path} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
