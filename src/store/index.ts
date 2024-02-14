import { configureStore, combineReducers } from '@reduxjs/toolkit';
import brandsSlice from './brands-slice';
import snacksSlice from './snacks-slice';
import uiSlice from './ui-slice';

const rootReducer = combineReducers({});
export type IRootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: { brands: brandsSlice.reducer, snacks: snacksSlice.reducer, ui: uiSlice.reducer },
});

export type AppDispatch = typeof store.dispatch;

export default store;
