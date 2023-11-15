import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";


function GameBoard({
    playArea,
    activePluck,
    mainDeck,
    pluckDeck,
    drawCard,
    drawPluck,
    playCard,
    playPluck
}) {

    const main_deck = mainDeck || [];
    const fighter = playArea.fighter_slot || [];
    const aura = playArea.aura_slot || [];
    const move = playArea.move_slot || [];
    const ending = playArea.ending_slot || [];
    const slot5 = playArea.slot_5 || []
    const slot6 = playArea.slot_6 || []
    const slot7 = playArea.slot_7 || []
    const slot8 = playArea.slot_8 || []

    const pluck_deck = pluckDeck || [];
    const pluck_slot1 = activePluck.slot_1 || [];
    const pluck_slot2 = activePluck.slot_2 || [];
    const pluck_slot3 = activePluck.slot_3 || [];
    const pluck_slot4 = activePluck.slot_4 || [];

    const preprocessText = (text) => {
        return text.split("//").join("\n");
    };

    return (
        <div>
            <div className="field_box">
                <div style={{display: "flex"}}>
                    <div className="matCard"
                        onClick={() => playCard("slot_5")}
                    >
                        {slot5.length > 0 ?
                            <>
                                {slot5.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{slot5.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={slot5[0].picture_url ? slot5[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={slot5[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playCard("slot_6")}
                    >
                        {slot6.length > 0 ?
                            <>
                                {slot6.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{slot6.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={slot6[0].picture_url ? slot6[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={slot6[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playCard("slot_7")}
                    >
                        {slot7.length > 0 ?
                            <>
                                {slot7.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{slot7.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={slot7[0].picture_url ? slot7[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={slot7[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playCard("slot_8")}
                    >
                        {slot8.length > 0 ?
                            <>
                                {slot8.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{slot8.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={slot8[0].picture_url ? slot8[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={slot8[0].name}/>
                            </>
                        :null}
                    </div>
                </div>
                <div className="margin-top-10" style={{display: "flex"}}>
                    <div className="matLabel"><h5 className="margin-bottom-0">Defending</h5></div>
                    <div className="matLabel"><h5 className="margin-bottom-0">Defending</h5></div>
                    <div className="matLabel"><h5 className="margin-bottom-0">Defending</h5></div>
                    <div className="matLabel"><h5 className="margin-bottom-0">Defending</h5></div>
                </div>
                <div style={{display: "flex"}}>
                    <div className="matCard"
                        onClick={() => playCard("fighter_slot")}
                    >
                        {fighter.length > 0 ?
                            <>
                                {fighter.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{fighter.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={fighter[0].picture_url ? fighter[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={fighter[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playCard("aura_slot")}
                    >
                        {aura.length > 0 ?
                            <>
                                {aura.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{aura.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={aura[0].picture_url ? aura[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={aura[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playCard("move_slot")}
                    >
                        {move.length > 0 ?
                            <>
                                {move.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{move.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={move[0].picture_url ? move[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={move[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playCard("ending_slot")}
                    >
                        {ending.length > 0 ?
                            <>
                                {ending.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{ending.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${ending.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={ending[0].picture_url ? ending[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={ending[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard margin-left"></div>
                    <div className="matCard"
                        onClick={() => drawCard()}
                    >
                        {main_deck.length > 1 ?
                            <div className="matCardOverlay">
                                <h1>{main_deck.length}</h1>
                            </div> :null
                        }
                        <img
                            // onClick={() => playCard(card, index, "main")}
                            className="builder-card5 pointer glow3"
                            // title={`${ending.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                            src="https://i.imgur.com/krY25iI.png"
                            alt="deck"/>
                    </div>
                </div>
                <div className="matLabel2 margin-top-20"><h5 className="margin-bottom-0">Active Pluck</h5></div>
                <div style={{display: "flex"}}>
                    <div className="matCard"
                        onClick={() => playPluck("slot_1")}
                    >
                        {pluck_slot1.length > 0 ?
                            <>
                                {pluck_slot1.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{pluck_slot1.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={pluck_slot1[0].picture_url ? pluck_slot1[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={pluck_slot1[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playPluck("slot_2")}
                    >
                        {pluck_slot2.length > 0 ?
                            <>
                                {pluck_slot2.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{pluck_slot2.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={pluck_slot2[0].picture_url ? pluck_slot2[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={pluck_slot2[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playPluck("slot_3")}
                    >
                        {pluck_slot3.length > 0 ?
                            <>
                                {pluck_slot3.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{pluck_slot3.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={pluck_slot3[0].picture_url ? pluck_slot3[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={pluck_slot3[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard"
                        onClick={() => playPluck("slot_4")}
                    >
                        {pluck_slot4.length > 0 ?
                            <>
                                {pluck_slot4.length > 1 ?
                                    <div className="matCardOverlay">
                                        <h1>{pluck_slot4.length}</h1>
                                    </div> :null
                                }
                                <img
                                    // onClick={() => playCard(card, index, "main")}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={pluck_slot4[0].picture_url ? pluck_slot4[0].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={pluck_slot2[0].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard margin-left"></div>
                    <div className="matCard"
                        onClick={() => drawPluck()}
                    >
                        {main_deck.length > 1 ?
                            <div className="matCardOverlay">
                                <h1>{pluck_deck.length}</h1>
                            </div> :null
                        }
                        <img
                            // onClick={() => playCard(card, index, "main")}
                            className="builder-card5 pointer glow3"
                            // title={`${ending.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                            src="https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"
                            alt="pluck deck"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameBoard;
