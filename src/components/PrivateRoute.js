import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loginRoute } from "../routes";
import { authSelectors } from "../redux/auth";

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  const isAuth = useSelector((state) => authSelectors.isAuth(state));

  return (
    <Route
      {...routeProps}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to={loginRoute.path} />
      }
    />
  );
};

export default PrivateRoute;
