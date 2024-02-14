import { createSlice } from '@reduxjs/toolkit';

const snacksSlice = createSlice({
    name: 'snacks',
    initialState: {
        items: [],
        reviews: [],
    },
    reducers: {
        replaceSnacks(state, action) {
            state.items = action.payload.items;
        },
        replaceSnackReview(state, action) {
            state.reviews = action.payload.items;
        },
        updateSnackReviewsTemp(state, action) {
            state.reviews = state.reviews.concat(action.payload.items);
        },
    },
});

export const snacksActions = snacksSlice.actions;

export default snacksSlice;
