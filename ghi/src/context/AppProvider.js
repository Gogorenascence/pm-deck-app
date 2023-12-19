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
import { AppContextProvider } from "./AppContext.js";
import { CardSetQueryContextProvider } from "./CardSetQueryContext.js";


const AppProvider = ({ children }) => {
    return (
        <AppContextProvider>
            <AuthContextProvider>
                <BuilderQueryContextProvider>
                    <GamePlayQueryContextProvider>
                        <PullsContextProvider>
                            <QueryContextProvider>
                                <DeckQueryContextProvider>
                                    <CardSetQueryContextProvider>
                                        <GameStateContextProvider>
                                            <SimulatorActionsContextProvider>
                                                <MainActionsContextProvider>
                                                    <PluckActionsContextProvider>
                                                        {children}
                                                    </PluckActionsContextProvider>
                                                </MainActionsContextProvider>
                                            </SimulatorActionsContextProvider>
                                        </GameStateContextProvider>
                                    </CardSetQueryContextProvider>
                                </DeckQueryContextProvider>
                            </QueryContextProvider>
                        </PullsContextProvider>
                    </GamePlayQueryContextProvider>
                </BuilderQueryContextProvider>
            </AuthContextProvider>
        </AppContextProvider>
    );
};

export default AppProvider;
