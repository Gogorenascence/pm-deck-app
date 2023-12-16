import React from "react";
import { PullsContextProvider } from "./PullsContext";
import { QueryContextProvider } from "./QueryContext";
import { DeckQueryContextProvider } from "./DeckQueryContext";
import { AuthContextProvider } from "./AuthContext";
import { BuilderQueryContextProvider } from "./BuilderQueryContext";
import { GamePlayQueryContextProvider } from "./GamePlayQueryContext.js";
import { GameStateContextProvider } from "./GameStateContext";
import { SimulatorActionsContextProvider } from "./SimulatorActionsContext.js";
import { MainActionsContextProvider } from "./MainActionsContext.js";
import { PluckActionsContextProvider } from "./PluckActionsContext.js";


const AppProvider = ({ children }) => {
    return (
        <AuthContextProvider>
            <BuilderQueryContextProvider>
                <GamePlayQueryContextProvider>
                    <PullsContextProvider>
                        <QueryContextProvider>
                            <DeckQueryContextProvider>
                                <GameStateContextProvider>
                                    <SimulatorActionsContextProvider>
                                        <MainActionsContextProvider>
                                            <PluckActionsContextProvider>
                                                {children}
                                            </PluckActionsContextProvider>
                                        </MainActionsContextProvider>
                                    </SimulatorActionsContextProvider>
                                </GameStateContextProvider>
                            </DeckQueryContextProvider>
                        </QueryContextProvider>
                    </PullsContextProvider>
                </GamePlayQueryContextProvider>
            </BuilderQueryContextProvider>
        </AuthContextProvider>
    );
};

export default AppProvider;
