import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AllCategories from '../features/CategoryInputSlice/categoryInputSlice';
import gethubIdSlice from '../features/HubIdSlice/HubIdSlice';
import getLanguageTagSlice from '../features/LanguageTagSlice/LanguageTagSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const reducer = combineReducers({
  get_all_categories: AllCategories,
  getHubId: gethubIdSlice,
  getLanguageTag: getLanguageTagSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
