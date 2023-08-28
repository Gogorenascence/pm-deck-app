import { createContext, useState } from "react";


const DeckQueryContext = createContext();

const DeckQueryContextProvider = ({ children }) => {

    const [deckQuery, setDeckQuery] = useState({
        deckName: "",
        description: "",
        cardName: "",
        strategies: "",
        seriesName: "",
    });
    const [deckSortState, setDeckSortState] = useState("none");

    return (
        <DeckQueryContext.Provider value={{
            deckQuery,
            setDeckQuery,
            deckSortState,
            setDeckSortState,
            }}>
            {children}
        </DeckQueryContext.Provider>
    );
};

export { DeckQueryContext, DeckQueryContextProvider };
