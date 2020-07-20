import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors, authSlice } from "../../redux/auth";
import Alert from "../../components/alert/Alert";
import styles from "./RegisterView.module.css";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const RegisterView = () => {
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
    dispatch(authOperations.register(state));
    setState(initialState);
  };

  const { name, email, password } = state;

  return (
    <>
      {error && <Alert title={error} show={alert} />}

      <h1 className={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="nameInp" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="nameInp"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailInp" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="emailInp"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInp" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="passwordInp"
              value={password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-secondary custom-btn">
            Register
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default RegisterView;
