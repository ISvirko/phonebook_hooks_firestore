import db from "../../db/dbConfig";
import contactsActions from "./contactsActions";

// HELPERS

const collectionConfig = {
  title: "contacts",
  userCollection: "userContacts",
};

const getCollectionPath = (state) => {
  const collectionId = state.collectionId;

  return (
    collectionId &&
    db.firestore
      .collection(collectionConfig.title)
      .doc(collectionId)
      .collection(collectionConfig.userCollection)
  );
};

const findCollection = async (state) => {
  const uid = state.uid;

  const collection = await db.firestore.collection(collectionConfig.title);
  return await collection.where("uid", "==", uid).get();
};

// CREATE NEW COLLECTION

const createCollection = () => async (dispatch, getState) => {
  const userName = getState().auth.user.name;
  const uid = getState().uid;
  dispatch(contactsActions.createCollectionRequest());

  try {
    await db.firestore
      .collection(collectionConfig.title)
      .add({ uid, userName });

    const userCollection = await findCollection(getState());

    userCollection.docs.forEach((elem) => {
      dispatch(contactsActions.createCollectionSuccess(elem.id));
    });
  } catch (error) {
    dispatch(contactsActions.createCollectionError(error.message));
  }
};

// SET USER COLLECTION ID

const setUserCollectionId = () => async (dispatch, getState) => {
  dispatch(contactsActions.getCollectionIdRequest());

  try {
    const userCollection = await findCollection(getState());

    userCollection.docs.forEach((elem) => {
      dispatch(contactsActions.getCollectionIdSuccess(elem.id));
    });
  } catch (error) {
    dispatch(contactsActions.getCollectionIdError(error.message));
  }
};

// ADD CONTACT

const addContact = ({ name, number, selectedGroup }) => async (
  dispatch,
  getState
) => {
  const contacts = getState().contacts.items;
  const existingContact = contacts.find((contact) => contact.name === name);
  if (existingContact) {
    alert(`${name} already exists`);
    return;
  }

  const contact = {
    name,
    number,
    selectedGroup,
    favorite: false,
    isInEditMode: false,
  };

  dispatch(contactsActions.addContactRequest());

  try {
    const userCollection = getCollectionPath(getState());

    await userCollection.add({ contact });
    const data = await userCollection.get();

    const contacts = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data().contact,
    }));

    dispatch(contactsActions.addContactSuccess(contacts));
  } catch (error) {
    dispatch(contactsActions.addContactError(error.message));
  }
};

// FETCH CONTACTS

const fetchContacts = () => async (dispatch, getState) => {
  dispatch(contactsActions.fetchContactsRequest());

  try {
    const userCollection = getCollectionPath(getState());

    if (userCollection) {
      const data = await userCollection.get();

      const contacts = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().contact,
      }));

      dispatch(contactsActions.fetchContactsSuccess(contacts));
    } else {
      dispatch(contactsActions.fetchContactsSuccess([]));
    }
  } catch (error) {
    dispatch(contactsActions.fetchContactsError(error.message));
  }
};

// DELETE CONTACT

const deleteContact = (id) => async (dispatch, getState) => {
  dispatch(contactsActions.deleteContactRequest());

  try {
    const userCollection = getCollectionPath(getState());
    await userCollection.doc(id).delete();

    dispatch(contactsActions.deleteContactSuccess(id));
  } catch (error) {
    dispatch(contactsActions.deleteContactError(error.message));
  }
};

// TOGGLE FAVORITE

const toggleFavorite = (contact) => async (dispatch, getState) => {
  dispatch(contactsActions.toggleFavoriteRequest());

  try {
    const userCollection = getCollectionPath(getState());
    await userCollection
      .doc(contact.id)
      .update({ contact: { ...contact, favorite: !contact.favorite } });

    dispatch(
      contactsActions.toggleFavoriteSuccess({
        ...contact,
        favorite: !contact.favorite,
      })
    );
  } catch (error) {
    dispatch(contactsActions.toggleFavoriteError(error.message));
  }
};

// EDIT CONTACT

const editContact = (editedContact, { name, number, selectedGroup }) => async (
  dispatch,
  getState
) => {
  dispatch(contactsActions.editContactRequest());

  const newContact = {
    ...editedContact,
    name: name,
    number: number,
    selectedGroup: selectedGroup,
    isInEditMode: false,
  };

  try {
    const userCollection = getCollectionPath(getState());
    await userCollection.doc(editedContact.id).update({
      contact: newContact,
    });

    dispatch(contactsActions.editContactSuccess(newContact));
  } catch (error) {
    dispatch(contactsActions.editContactError(error.message));
  }
};

export default {
  setUserCollectionId,
  createCollection,
  addContact,
  fetchContacts,
  deleteContact,
  toggleFavorite,
  editContact,
};
