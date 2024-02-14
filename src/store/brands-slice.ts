import { createSlice } from '@reduxjs/toolkit';

const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        items: [],
    },
    reducers: {
        replaceBrands(state, action) {
            state.items = action.payload.items;
        },
    },
});

export const brandsActions = brandsSlice.actions;

export default brandsSlice;
