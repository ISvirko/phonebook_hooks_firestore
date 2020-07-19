import React from "react";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ContactListItem from "../contactListItem/ContactListItem";
import EditForm from "../editForm.js/EditForm";
import { contactsSelectors } from "../../redux/contacts";
import styles from "./ContactList.module.css";

const itemFade = {
  enter: styles.enter,
  enterActive: styles.enterActive,
  exit: styles.exit,
  exitActive: styles.exitActive,
};

const ContactList = () => {
  const contacts = useSelector((state) =>
    contactsSelectors.getVisibleContacts(state)
  );

  const isInEditMode = useSelector((state) =>
    contactsSelectors.getIsInEditMode(state)
  );

  return (
    <TransitionGroup component="ul" style={{ width: "800" }}>
      {contacts &&
        contacts.map((contact) => (
          <CSSTransition key={contact.id} timeout={250} classNames={itemFade}>
            {contact.isInEditMode ? (
              <EditForm editedContact={isInEditMode} />
            ) : (
              <ContactListItem contactId={contact.id} />
            )}
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
};

export default ContactList;
