import React from "react";
import { CSSTransition } from "react-transition-group";
import showAlert from "./showAlert.module.css";

const Alert = ({ title, show }) => (
  <CSSTransition in={show} timeout={250} unmountOnExit classNames={showAlert}>
    <div className="alert alert-danger alert-custom">{title}</div>
  </CSSTransition>
);

export default Alert;
