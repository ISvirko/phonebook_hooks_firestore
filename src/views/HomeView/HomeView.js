import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerRoute, loginRoute, contactsRoute } from "../../routes";
import { authSelectors } from "../../redux/auth";
import styles from "./HomeView.module.css";

const HomeView = () => {
  const isAuth = useSelector((state) => authSelectors.isAuth(state));

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h1 className={styles.title}>Keep your contacts organized</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          possimus totam deserunt aperiam placeat veniam consequuntur nulla
          incidunt. Culpa, quaerat.
        </p>
        {!isAuth ? (
          <p>
            <Link to={registerRoute.path}>Register </Link> your account or
            <Link to={loginRoute.path}> Log in</Link>
          </p>
        ) : (
          <Link to={contactsRoute.path}>My Phonebook</Link>
        )}
      </div>
      <div>
        <img
          src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/address-book-512.png"
          width="500"
          alt="phonebook"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default HomeView;
