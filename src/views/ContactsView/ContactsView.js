import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../../components/contactForm/ContactForm";
import ContactList from "../../components/contactList/ContactList";
import Filter from "../../components/filter/Filter";
import FilterByGroup from "../../components/filterByGroup/FilterByGroup";
import ResetButton from "../../components/resetButton/ResetButton";
import Spinner from "../../components/spinner/Spinner";
import Alert from "../../components/alert/Alert";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import styles from "./ContactsView.module.css";

const ContactsView = () => {
  const contacts = useSelector((state) => contactsSelectors.getContacts(state));
  const darkTheme = useSelector((state) => state.darkTheme);
  const collectionId = useSelector((state) => state.collectionId);
  const isLoading = useSelector((state) => contactsSelectors.getLoading(state));
  const error = useSelector((state) => contactsSelectors.getError(state));
  const [isAlert, setAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    collectionId
      ? dispatch(contactsOperations.fetchContacts())
      : dispatch(contactsOperations.createCollection());
  }, [dispatch, collectionId]);

  useEffect(() => {
    error && setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Spinner />}

      {error && <Alert title={error} show={isAlert} />}

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

      {contacts && <ContactList />}
    </div>
  );
};

export default ContactsView;
