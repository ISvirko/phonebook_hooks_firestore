import React from "react";
import { useSelector } from "react-redux";
import AppBar from "../appBar/AppBar";
import { themeSelectors } from "../../redux/theme";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const darkTheme = useSelector((state) => themeSelectors.getTheme(state));

  return (
    <div className={darkTheme ? "dark-theme" : ""}>
      <div className={styles.wrapper}>
        <AppBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
