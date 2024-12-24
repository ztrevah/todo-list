import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal-slice";
import userReducer from "./slices/user-slice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer,
    },
});

