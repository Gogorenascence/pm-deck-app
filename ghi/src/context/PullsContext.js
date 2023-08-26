import { createContext, useState } from "react";

const PullsContext = createContext();

const PullsContextProvider = ({ children }) => {
    const [pulls, setPulls] = useState([]);

    return (
        <PullsContext.Provider value={{ pulls, setPulls }}>
            {children}
        </PullsContext.Provider>
    );
};

export { PullsContext, PullsContextProvider };


const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {
    const [query, setQuery] = useState([]);

    return (
        <QueryContext.Provider value={{ query, setQuery }}>
            {children}
        </QueryContext.Provider>
    );
};

export { QueryContext, QueryContextProvider };


const DeckQueryContext = createContext();

const DeckQueryContextProvider = ({ children }) => {
    const [deckQuery, setDeckQuery] = useState([]);

    return (
        <DeckQueryContext.Provider value={{ deckQuery, setDeckQuery }}>
            {children}
        </DeckQueryContext.Provider>
    );
};

export { DeckQueryContext, DeckQueryContextProvider };
