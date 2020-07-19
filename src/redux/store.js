import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth";
import { contactsReducer } from "./contacts";
import { themeReducer } from "./theme";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["darkTheme", "uid", "collectionId"],
};

const rootReducer = combineReducers({
  contacts: combineReducers({
    items: contactsReducer.items.reducer,
    filter: contactsReducer.filter.reducer,
    loading: contactsReducer.loading.reducer,
    error: contactsReducer.error.reducer,
    groupSort: contactsReducer.groupSort.reducer,
  }),

  collectionId: contactsReducer.collectionId.reducer,

  darkTheme: themeReducer.darkTheme.reducer,

  auth: combineReducers({
    user: authReducer.user.reducer,
    error: authReducer.error.reducer,
  }),

  uid: authReducer.uid.reducer,
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
