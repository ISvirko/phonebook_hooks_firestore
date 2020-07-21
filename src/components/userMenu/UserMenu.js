import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authOperations, authSelectors } from "../../redux/auth";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => authSelectors.getUserName(state));
  const avatar =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f60e.svg/480px-Emoji_u1f60e.svg.png";

  return (
    <div className={styles.container}>
      <img src={avatar} alt="" width="40" className={styles.avatar} />
      <span className={styles.name}>Welcome, {name}</span>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => dispatch(authOperations.logout())}
      >
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  );
};

export default UserMenu;
