import { createAction } from "@reduxjs/toolkit";

const createCollectionRequest = createAction(
  "contacts/createCollectionRequest"
);
const createCollectionSuccess = createAction(
  "contacts/createCollectionSuccess"
);
const createCollectionError = createAction("contacts/createCollectionError");

const getCollectionIdRequest = createAction("contacts/getCollectionIdRequest");
const getCollectionIdSuccess = createAction("contacts/getCollectionIdSuccess");
const getCollectionIdError = createAction("contacts/getCollectionIdError");

const addContactRequest = createAction("contacts/addContactRequest");
const addContactSuccess = createAction("contacts/addContactSuccess");
const addContactError = createAction("contacts/addContactError");

const fetchContactsRequest = createAction("contacts/fetchContactsRequest");
const fetchContactsSuccess = createAction("contacts/fetchContactsSuccess");
const fetchContactsError = createAction("contacts/fetchContactsError");

const deleteContactRequest = createAction("contacts/deleteContactRequest");
const deleteContactSuccess = createAction("contacts/deleteContactSuccess");
const deleteContactError = createAction("contacts/deleteContactError");

const toggleFavoriteRequest = createAction("contacts/toggleFavoriteRequest");
const toggleFavoriteSuccess = createAction("contacts/toggleFavoriteSuccess");
const toggleFavoriteError = createAction("contacts/toggleFavoriteError");

const editContactRequest = createAction("contacts/editContactRequest");
const editContactSuccess = createAction("contacts/editContactSuccess");
const editContactError = createAction("contacts/editContactError");

const handleFilter = createAction("contacts/handleFilter");

const changeEditMode = createAction("contacts/changeEditMode");

const sortByGroup = createAction("contacts/sortByGroup");

const resetSearch = createAction("contacts/resetSearch");

export default {
  createCollectionRequest,
  createCollectionSuccess,
  createCollectionError,

  getCollectionIdRequest,
  getCollectionIdSuccess,
  getCollectionIdError,

  addContactRequest,
  addContactSuccess,
  addContactError,

  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,

  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,

  toggleFavoriteRequest,
  toggleFavoriteSuccess,
  toggleFavoriteError,

  editContactRequest,
  editContactSuccess,
  editContactError,

  handleFilter,

  changeEditMode,

  sortByGroup,

  resetSearch,
};
