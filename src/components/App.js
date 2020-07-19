import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Spinner from "../components/spinner/Spinner";
import routes from "../routes";
import { authOperations, authSelectors } from "../redux/auth";
import { contactsOperations } from "../redux/contacts";

const App = () => {
  const uid = useSelector((state) => authSelectors.isAuth(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [uid, dispatch]);

  useEffect(() => {
    dispatch(contactsOperations.setUserCollectionId());
  }, [uid, dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {routes.map((route) => {
              return route.private ? (
                <PrivateRoute key={route.label} {...route} />
              ) : (
                <PublicRoute
                  key={route.label}
                  {...route}
                  restricted={route.restricted}
                />
              );
            })}
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
