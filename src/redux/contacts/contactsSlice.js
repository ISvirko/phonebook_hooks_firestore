import { createSlice } from "@reduxjs/toolkit";

// HELPERS

const deleteContact = (state, { payload }) =>
  state.filter((contact) => contact.id !== payload);

const toggleFavorite = (state, { payload }) => {
  return state.map((contact) =>
    contact.id === payload.id ? payload : contact
  );
};

const changeEditMode = (state, { payload }) => {
  return state.map((contact) => {
    return contact.id === payload
      ? { ...contact, isInEditMode: !contact.isInEditMode }
      : { ...contact, isInEditMode: false };
  });
};

const editContact = (state, { payload }) => {
  return state.map((contact) =>
    contact.id === payload.id ? payload : contact
  );
};

// ITEMS REDUCERS

const items = createSlice({
  name: "contacts",
  initialState: [],

  reducers: {
    fetchContactsSuccess: (_, { payload }) => payload,
    addContactSuccess: (_, { payload }) => payload,
    deleteContactSuccess: deleteContact,
    toggleFavoriteSuccess: toggleFavorite,
    changeEditMode: changeEditMode,
    editContactSuccess: editContact,
  },
  extraReducers: { "auth/logoutSuccess": () => [] },
});

// FILTER REDUCERS

const filter = createSlice({
  name: "contacts",
  initialState: "",

  reducers: {
    handleFilter: (_, { payload }) => payload,
    resetSearch: () => "",
  },
});

// ERROR REDUCERS

const error = createSlice({
  name: "contacts",
  initialState: null,

  reducers: {
    fetchContactsError: (_, { payload }) => payload,
    addContactError: (_, { payload }) => payload,
    deleteContactError: (_, { payload }) => payload,
    toggleFavoriteError: (_, { payload }) => payload,
    editContactError: (_, { payload }) => payload,
    getCollectionIdError: (_, { payload }) => payload,
    createCollectionError: (_, { payload }) => payload,
    resetError: () => null,
  },
});

// GROUPSORT REDUCERS

const groupSort = createSlice({
  name: "contacts",
  initialState: "",

  reducers: {
    sortByGroup: (_, { payload }) => payload,
    resetSearch: () => "",
  },
});

// GET COLLECTION ID REDUCERS

const collectionId = createSlice({
  name: "contacts",
  initialState: null,

  reducers: {
    getCollectionIdSuccess: (_, { payload }) => payload,
    createCollectionSuccess: (_, { payload }) => payload,
  },
  extraReducers: { "auth/logoutSuccess": () => null },
});

// LOADING REDUCERS

const loading = createSlice({
  name: "contacts",
  initialState: false,

  reducers: {
    createCollectionRequest: () => true,
    createCollectionSuccess: () => false,
    createCollectionError: () => false,

    getCollectionIdRequest: () => true,
    getCollectionIdSuccess: () => false,
    getCollectionIdError: () => false,

    fetchContactsRequest: () => true,
    fetchContactsSuccess: () => false,
    fetchContactsError: () => false,

    addContactRequest: () => true,
    addContactSuccess: () => false,
    addContactError: () => false,

    deleteContactRequest: () => true,
    deleteContactSuccess: () => false,
    deleteContactError: () => false,

    toggleFavoriteRequest: () => true,
    toggleFavoriteSuccess: () => false,
    toggleFavoriteError: () => false,

    editContactRequest: () => true,
    editContactSuccess: () => false,
    editContactError: () => false,
  },
});

export default { items, filter, loading, error, groupSort, collectionId };
