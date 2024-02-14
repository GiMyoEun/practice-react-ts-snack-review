import { createSlice } from '@reduxjs/toolkit';

export type uiType = {
    type: string;

    brand: string;
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        type: '',
        brand: '',
    },
    reducers: {
        changeUi(state, action) {
            state.type = action.payload.type;
            state.brand = action.payload.brand;
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
