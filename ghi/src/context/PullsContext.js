import { createContext, useState } from "react";

const PullsContext = createContext();

const PullsContextProvider = ({ children }) => {
    const [pulls, setPulls] = useState([]);
    const [usePool, setUsePool] = useState(true);

    return (
        <PullsContext.Provider value={{
            pulls,
            setPulls,
            usePool,
            setUsePool
        }}>
            {children}
        </PullsContext.Provider>
    );
};

export { PullsContext, PullsContextProvider };
