import React from "react";
import { useDispatch } from "react-redux";
import { contactsOperations } from "../../../redux/contacts";
import styles from "./Favorites.module.css";

const Favorites = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <label className={contact && contact.favorite ? styles.star : styles.label}>
      <input
        className={styles.input}
        type="checkbox"
        checked={contact && contact.favorite}
        onChange={() => dispatch(contactsOperations.toggleFavorite(contact))}
      />
    </label>
  );
};

export default Favorites;
