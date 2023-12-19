import { createContext, useState } from "react";


const CardSetQueryContext = createContext();

const CardSetQueryContextProvider = ({ children }) => {
    const [query, setQuery] = useState({
        cardName: "",
        cardText: "",
        cardNumber: "",
        heroID: "",
        series: "",
        startingNum: "",
        type: "",
        cardClass: "",
        extraEffect: "",
        reaction: "",
        tag: "",
    });
    const [sortState, setSortState] = useState("none");

    const [listView, setListView] = useState(false);
    const [showMore, setShowMore] = useState(20);

    return (
        <CardSetQueryContext.Provider value={{
            query,
            setQuery,
            sortState,
            setSortState,
            listView,
            setListView,
            showMore,
            setShowMore
            }}>
            {children}
        </CardSetQueryContext.Provider>
    );
};

export { CardSetQueryContext, CardSetQueryContextProvider };
