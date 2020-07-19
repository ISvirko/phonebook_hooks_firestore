import { createSlice } from "@reduxjs/toolkit";

// HELPERS

const userInitialState = {
  email: null,
  name: null,
};

const setUser = (payload) => {
  return {
    email: payload.email,
    name: payload.displayName,
  };
};

// USER REDUCERS

const user = createSlice({
  name: "auth",
  initialState: {
    userInitialState,
  },

  reducers: {
    registerSuccess: (_, { payload }) => setUser(payload),
    loginSuccess: (_, { payload }) => setUser(payload),
    getCurrentUserSuccess: (_, { payload }) => setUser(payload),
    logoutSuccess: () => userInitialState,
  },
});

// UID REDUCERS

const uid = createSlice({
  name: "auth",
  initialState: null,

  reducers: {
    registerSuccess: (_, { payload }) => payload.uid,
    loginSuccess: (_, { payload }) => payload.uid,
    logoutSuccess: () => null,
  },
});

// ERROR REDUCERS

const error = createSlice({
  name: "auth",
  initialState: null,

  reducers: {
    registerError: (_, { payload }) => payload,
    loginError: (_, { payload }) => payload,
    getCurrentUserError: (_, { payload }) => payload,
    logoutError: (_, { payload }) => payload,
    resetError: () => null,
  },
});

export default { user, error, uid };
