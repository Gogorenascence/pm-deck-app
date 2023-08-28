import React from "react";
import { PullsContextProvider } from "./PullsContext";
import { QueryContextProvider } from "./QueryContext";
import { DeckQueryContextProvider } from "./DeckQueryContext";
import { AuthContextProvider } from "./AuthContext";

const AppProvider = ({ children }) => {
    return (
        <AuthContextProvider>
            <PullsContextProvider>
                <QueryContextProvider>
                    <DeckQueryContextProvider>
                        {children}
                    </DeckQueryContextProvider>
                </QueryContextProvider>
            </PullsContextProvider>
        </AuthContextProvider>
    );
};

export default AppProvider;
