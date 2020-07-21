import db from "../../db/dbConfig";
import contactsSlice from "./contactsSlice";

// HELPERS

const collectionConfig = {
  title: "contact book",
  userCollection: "user contacts",
};

const getCollectionPath = (state) => {
  const collectionId = state.contacts.collectionId;

  return (
    collectionId &&
    db.firestore
      .collection(collectionConfig.title)
      .doc(collectionId)
      .collection(collectionConfig.userCollection)
  );
};

const findCollection = async (state) => {
  const uid = state.auth.uid;

  const collection = await db.firestore.collection(collectionConfig.title);
  return await collection.where("uid", "==", uid).get();
};

// CREATE NEW COLLECTION

const createCollection = () => async (dispatch, getState) => {
  const userName = getState().auth.user.name;
  const uid = getState().auth.uid;
  dispatch(contactsSlice.loading.actions.createCollectionRequest());

  try {
    await db.firestore
      .collection(collectionConfig.title)
      .add({ uid, userName });

    const userCollection = await findCollection(getState());

    userCollection.docs.forEach((elem) => {
      dispatch(
        contactsSlice.collectionId.actions.createCollectionSuccess(elem.id)
      );
    });
  } catch (error) {
    dispatch(contactsSlice.error.actions.createCollectionError(error.message));
  }
};

// SET USER COLLECTION ID

const setUserCollectionId = () => async (dispatch, getState) => {
  dispatch(contactsSlice.loading.actions.getCollectionIdRequest());

  try {
    dispatch(contactsSlice.collectionId.actions.getCollectionIdSuccess(null));

    const userCollection = await findCollection(getState());

    userCollection.docs.forEach((elem) => {
      dispatch(
        contactsSlice.collectionId.actions.getCollectionIdSuccess(elem.id)
      );
    });
  } catch (error) {
    dispatch(contactsSlice.error.actions.getCollectionIdError(error.message));
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

  dispatch(contactsSlice.loading.actions.addContactRequest());

  try {
    const userCollection = getCollectionPath(getState());

    await userCollection.add({ contact });
    const data = await userCollection.get();

    const contacts = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data().contact,
    }));

    dispatch(contactsSlice.items.actions.addContactSuccess(contacts));
  } catch (error) {
    dispatch(contactsSlice.error.actions.addContactError(error.message));
  }
};

// FETCH CONTACTS

const fetchContacts = () => async (dispatch, getState) => {
  dispatch(contactsSlice.loading.actions.fetchContactsRequest());

  try {
    const userCollection = getCollectionPath(getState());

    const data = await userCollection.get();

    const contacts = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data().contact,
    }));

    dispatch(contactsSlice.items.actions.fetchContactsSuccess(contacts));
  } catch (error) {
    dispatch(contactsSlice.error.actions.fetchContactsError(error.message));
  }
};

// DELETE CONTACT

const deleteContact = (id) => async (dispatch, getState) => {
  dispatch(contactsSlice.loading.actions.deleteContactRequest());

  try {
    const userCollection = getCollectionPath(getState());
    await userCollection.doc(id).delete();

    dispatch(contactsSlice.items.actions.deleteContactSuccess(id));
  } catch (error) {
    dispatch(contactsSlice.error.actions.deleteContactError(error.message));
  }
};

// TOGGLE FAVORITE

const toggleFavorite = (contact) => async (dispatch, getState) => {
  dispatch(contactsSlice.loading.actions.toggleFavoriteRequest());

  try {
    const userCollection = getCollectionPath(getState());
    await userCollection
      .doc(contact.id)
      .update({ contact: { ...contact, favorite: !contact.favorite } });

    dispatch(
      contactsSlice.items.actions.toggleFavoriteSuccess({
        ...contact,
        favorite: !contact.favorite,
      })
    );
  } catch (error) {
    dispatch(contactsSlice.error.actions.toggleFavoriteError(error.message));
  }
};

// EDIT CONTACT

const editContact = (editedContact, { name, number, selectedGroup }) => async (
  dispatch,
  getState
) => {
  dispatch(contactsSlice.loading.actions.editContactRequest());

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

    dispatch(contactsSlice.items.actions.editContactSuccess(newContact));
  } catch (error) {
    dispatch(contactsSlice.error.actions.editContactError(error.message));
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
