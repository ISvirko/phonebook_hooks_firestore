import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../navigation/Navigation";
import Logo from "../logo/Logo";
import ThemeToggler from "../themeToggler/ThemeToggler";
import UserMenu from "../userMenu/UserMenu";
import AuthNav from "../authNav/AuthNav";
import { authSelectors } from "../../redux/auth";
import styles from "./AppBar.module.css";

const AppBar = () => {
  const isAuth = useSelector((state) => authSelectors.isAuth(state));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary nav-menu">
      <div className={styles.logoWrapper}>
        <Logo />
        <ThemeToggler />
      </div>
      <div className={styles.navWrapper}>
        <Navigation />
      </div>
      <div className={styles.authWrapper}>
        {isAuth ? <UserMenu /> : <AuthNav />}
      </div>
    </nav>
  );
};

export default AppBar;
