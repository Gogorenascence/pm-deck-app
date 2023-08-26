import React from "react";
import { PullsContextProvider } from "./PullsContext";
import { QueryContextProvider } from "./QueryContext";
import { DeckQueryContextProvider } from "./DeckQueryContext";

const AppProvider = ({ children }) => {
    return (
        <PullsContextProvider>
            <QueryContextProvider>
                <DeckQueryContextProvider>
                    {children}
                </DeckQueryContextProvider>
            </QueryContextProvider>
        </PullsContextProvider>
    );
};

export default AppProvider;
