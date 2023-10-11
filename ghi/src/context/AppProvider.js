import React from "react";
import { PullsContextProvider } from "./PullsContext";
import { QueryContextProvider } from "./QueryContext";
import { DeckQueryContextProvider } from "./DeckQueryContext";
import { AuthContextProvider } from "./AuthContext";
import { BuilderQueryContextProvider } from "./BuilderQueryContext";
import { GamePlayQueryContextProvider } from "./GamePlayQueryContext";


const AppProvider = ({ children }) => {
    return (
        <AuthContextProvider>
            <BuilderQueryContextProvider>
                <GamePlayQueryContextProvider>
                    <PullsContextProvider>
                        <QueryContextProvider>
                            <DeckQueryContextProvider>
                                {children}
                            </DeckQueryContextProvider>
                        </QueryContextProvider>
                    </PullsContextProvider>
                </GamePlayQueryContextProvider>
            </BuilderQueryContextProvider>
        </AuthContextProvider>
    );
};

export default AppProvider;
