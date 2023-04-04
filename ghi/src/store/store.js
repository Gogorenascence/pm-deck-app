import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { searchSlice } from "./searchSlice";
import { deckSlice } from "./deckSlice";

export const store = configureStore({
    reducer: {
        [searchSlice.name]: searchSlice.reducer,
        [deckSlice.name]: deckSlice.reducer
    }
});

export const searchActions = searchSlice.actions;
export const deckActions = deckSlice.actions;

setupListeners(store.dispatch);
