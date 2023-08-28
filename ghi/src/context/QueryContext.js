import { createContext, useState } from "react";


const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {
    const [query, setQuery] = useState({
        cardName: "",
        cardText: "",
        cardNumber: "",
        heroID: "",
        series: "",
        illustrator: "",
        type: "",
        cardClass: "",
        extraEffect: "",
        reaction: "",
        tag: "",
    });
    const [sortState, setSortState] = useState("none");

    return (
        <QueryContext.Provider value={{
            query,
            setQuery,
            sortState,
            setSortState,
            }}>
            {children}
        </QueryContext.Provider>
    );
};

export { QueryContext, QueryContextProvider };
