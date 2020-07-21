import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "../appBar/AppBar";
import Spinner from "../../components/spinner/Spinner";
import Alert from "../../components/alert/Alert";
import { themeSelectors } from "../../redux/theme";
import { authSelectors, authSlice } from "../../redux/auth";
import { contactsSelectors, contactsSlice } from "../../redux/contacts";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  // THEME

  const darkTheme = useSelector((state) => themeSelectors.getTheme(state));

  // LOADING

  const authLoading = useSelector((state) => authSelectors.getLoading(state));
  const contactsLoading = useSelector((state) =>
    contactsSelectors.getLoading(state)
  );

  const dispatch = useDispatch();

  // ERROR

  const authError = useSelector((state) => authSelectors.getError(state));
  const contactsError = useSelector((state) =>
    contactsSelectors.getError(state)
  );
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    (authError || contactsError) && setAlert(true);

    const alertTimeout = setTimeout(() => {
      setAlert(false);
      authError && dispatch(authSlice.error.actions.resetError());
      contactsError && dispatch(contactsSlice.error.actions.resetError());

      return () => {
        clearTimeout(alertTimeout);
      };
    }, 3000);
  }, [authError, contactsError, dispatch]);

  return (
    <div className={darkTheme ? "dark-theme" : ""}>
      <div className={styles.wrapper}>
        <AppBar />

        {(authLoading || contactsLoading) && <Spinner />}

        {authError && <Alert title={authError} show={alert} />}
        {contactsError && <Alert title={contactsError} show={alert} />}

        {children}
      </div>
    </div>
  );
};

export default Layout;
