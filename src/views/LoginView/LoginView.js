import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors, authSlice } from "../../redux/auth";
import Alert from "../../components/alert/Alert";
import styles from "./LoginView.module.css";

const initialState = {
  email: "",
  password: "",
};
const LoginView = () => {
  const [state, setState] = useState(initialState);
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => authSelectors.getError(state));

  useEffect(() => {
    error && setAlert(true);

    const alertTimeout = setTimeout(() => {
      setAlert(false);
      error && dispatch(authSlice.error.actions.resetError());

      return () => {
        clearTimeout(alertTimeout);
      };
    }, 3000);
  }, [error, dispatch]);

  const handleChange = ({ target: { name, value } }) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authOperations.login(state));
    setState(initialState);
  };

  const { email, password } = state;

  return (
    <>
      {error && <Alert title={error} show={alert} />}

      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="emailInput" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="emailInput"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="passwordInput" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="passwordInput"
              value={password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-secondary custom-btn">
            Login
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default LoginView;
