import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        type: "",
        data: null,
    },
    reducers: {
        modalOpen: (state, action) => {
            const { type, data } = action.payload;
            return {
                isOpen: true,
                type,
                data,
            };
        },
        modalClose: () => {
            return {
                isOpen: false,
                data: null,
                type: ""
            };
        }
    }
});

export default modalSlice.reducer;

export const { modalOpen, modalClose } = modalSlice.actions;