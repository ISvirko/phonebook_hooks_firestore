import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./auth";
import { contactsSlice } from "./contacts";
import { themeSlice } from "./theme";

// AUTH

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["uid"],
};

const authReducer = combineReducers({
  user: authSlice.user.reducer,
  error: authSlice.error.reducer,
  uid: authSlice.uid.reducer,
});

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

// CONTACTS

const contactsPersistConfig = {
  key: "contacts",
  storage,
  whitelist: ["collectionId"],
};

const contactsReducer = combineReducers({
  items: contactsSlice.items.reducer,
  filter: contactsSlice.filter.reducer,
  loading: contactsSlice.loading.reducer,
  error: contactsSlice.error.reducer,
  groupSort: contactsSlice.groupSort.reducer,
  collectionId: contactsSlice.collectionId.reducer,
});

const contactsPersistedReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

// THEME

const themePersistConfig = {
  key: "theme",
  storage,
  whitelist: ["darkTheme"],
};

const themeReducer = combineReducers({
  darkTheme: themeSlice.darkTheme.reducer,
});

const themePersistedReducer = persistReducer(themePersistConfig, themeReducer);

// STORE

const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    contacts: contactsPersistedReducer,
    theme: themePersistedReducer,
  },

  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
