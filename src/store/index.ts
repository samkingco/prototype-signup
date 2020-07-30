import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducer as accountReducer } from "./account/slice";

const persistConfig = {
  key: "echo_signup_prototype",
  storage,
};

const rootReducer = combineReducers({
  account: accountReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = configureStore({
  reducer: persistedReducer,
});

export let persistor = persistStore(store);

export type AppState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export type GetState = () => AppState;
