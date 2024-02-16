import { createSlice } from '@reduxjs/toolkit';

const snacksSlice = createSlice({
    name: 'snacks',
    initialState: {
        items: [],
        reviews: [],
        starAver: 0,
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
        replaceStarAver(state, action) {
            state.starAver = action.payload.starAver;
        },
        setInitSnackReviews(state) {
            state.reviews = [];
            state.starAver = 0;
        },
    },
});

export const snacksActions = snacksSlice.actions;

export default snacksSlice;
