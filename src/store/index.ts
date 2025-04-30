import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import  Cateogryslice  from "./Cateogries/Act/Cateogyslice";
import Productsslice from "./Products/Act/Productsslice";
import Cartslice from "./Cart/Cartslice";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import Wishlist from "@store/Wish/Wishslice";
import Authslice from "./Auth/Authslice";
import Orderslice  from "./orders/orderslice";
 const persistConfig = {
   key: "root",
   storage,
   whitelist: ["items"], // only navigation will be persisted
};
 const cartPersistConfig = {
   key: "Cartslice",
   storage,
   whitelist: ["items"],
 };

 const wishlistPersistConfig = {
   key: "wish",
   storage,
   whitelist: ["items"],
};
  const AuthlistPersistConfig = {
    key: "Auth",
    storage,
    whitelist: ["user","accessToken"],
  };
const rootreducer = combineReducers({
  Authslice: persistReducer(AuthlistPersistConfig, Authslice),
  Cateogryslice,
  Productsslice,
  Orderslice,
  Cartslice: persistReducer(cartPersistConfig, Cartslice),
  Wishlist: persistReducer(wishlistPersistConfig, Wishlist), // ✅ Fixed
});

// Infer the `RootState` and `AppDispatch` types from the store itself;
export const store = configureStore({
  reducer: rootreducer,
});

  export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
