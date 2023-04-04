import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    account_id: "",
    description: "",
    strategies: [],
    cards: [],
    pluck: [],
    side: [],
    views: 0,
    cover_card: "",
};

export const deckSlice = createSlice({
    name: "deck",
    initialState: initialState,
    reducers: {
        getDeck: (state, action) => {
            state.deck = action.payload;
        },
        updateId: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { getDeck, updateId } = deckSlice.actions;
