import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: combineReducers({
        user: userSlice.reducer
    }),
});

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;