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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["darkTheme", "uid", "collectionId"],
};

const rootReducer = combineReducers({
  contacts: combineReducers({
    items: contactsSlice.items.reducer,
    filter: contactsSlice.filter.reducer,
    loading: contactsSlice.loading.reducer,
    error: contactsSlice.error.reducer,
    groupSort: contactsSlice.groupSort.reducer,
  }),

  collectionId: contactsSlice.collectionId.reducer,

  darkTheme: themeSlice.darkTheme.reducer,

  auth: combineReducers({
    user: authSlice.user.reducer,
    error: authSlice.error.reducer,
  }),

  uid: authSlice.uid.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
