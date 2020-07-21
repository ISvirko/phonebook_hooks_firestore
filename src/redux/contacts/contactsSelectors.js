import { createSelector } from "@reduxjs/toolkit";

const getContacts = (state) => state.contacts.items;

const getCollectionId = (state) => state.contacts.collectionId;

const getLoading = (state) => state.contacts.loading;

const getFilter = (state) => state.contacts.filter;

const getError = (state) => state.contacts.error;

const getContactById = createSelector(
  [(_, id) => id, getContacts],
  (id, contacts) => contacts.find((contact) => contact.id === id)
);

const getIsInEditMode = createSelector([getContacts], (contacts) =>
  contacts.find((contact) => contact.isInEditMode)
);

const getGroup = (state) => state.contacts.groupSort;

const getFilteredContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

const getVisibleContacts = createSelector(
  [getFilteredContacts, getGroup],
  (filteredContacts, group) => {
    switch (group) {
      case "family":
        return filteredContacts.filter(
          (contact) => contact.selectedGroup === "family"
        );

      case "friends":
        return filteredContacts.filter(
          (contact) => contact.selectedGroup === "friends"
        );

      case "co-workers":
        return filteredContacts.filter(
          (contact) => contact.selectedGroup === "co-workers"
        );

      default:
        return filteredContacts;
    }
  }
);

export default {
  getContacts,
  getCollectionId,
  getLoading,
  getFilter,
  getVisibleContacts,
  getContactById,
  getIsInEditMode,
  getGroup,
  getError,
};
