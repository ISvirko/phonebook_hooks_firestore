import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../../components/contactForm/ContactForm";
import ContactList from "../../components/contactList/ContactList";
import Filter from "../../components/filter/Filter";
import FilterByGroup from "../../components/filterByGroup/FilterByGroup";
import ResetButton from "../../components/resetButton/ResetButton";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import { themeSelectors } from "../../redux/theme";
import styles from "./ContactsView.module.css";

const ContactsView = () => {
  const contacts = useSelector((state) => contactsSelectors.getContacts(state));
  const darkTheme = useSelector((state) => themeSelectors.getTheme(state));
  const collectionId = useSelector((state) =>
    contactsSelectors.getCollectionId(state)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(contactsOperations.setUserCollectionId());
      !collectionId && (await dispatch(contactsOperations.createCollection()));
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch, collectionId]);

  return (
    <div className={styles.wrapper}>
      <ContactForm />
      <h2 className={darkTheme ? styles.titleContDark : styles.titleContacts}>
        Contacts
      </h2>

      {contacts && contacts.length > 1 && (
        <div className={styles.filters}>
          <Filter />
          <FilterByGroup />
          <ResetButton />
        </div>
      )}

      {contacts.length > 0 ? <ContactList /> : <p>No contacts here yet</p>}
    </div>
  );
};

export default ContactsView;
