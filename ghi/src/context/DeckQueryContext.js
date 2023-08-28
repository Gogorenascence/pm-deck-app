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

    return (
        <DeckQueryContext.Provider value={{ deckQuery, setDeckQuery }}>
            {children}
        </DeckQueryContext.Provider>
    );
};

export { DeckQueryContext, DeckQueryContextProvider };
