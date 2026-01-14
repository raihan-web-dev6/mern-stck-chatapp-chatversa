import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import messageslice from './messageslice.js';
// store.js
export const store = configureStore({
  reducer: {
    user: userSlice,
    message: messageslice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
