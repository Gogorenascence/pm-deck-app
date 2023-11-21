import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import SimDeckSearch from "./SimDeckSearch";
import SimDeckSearchModal from "./SimDeckSearchModal";
import Ownership from "./Ownership";
import OwnershipModal from "./OwnershipModal";
import UnfurlModal from "./UnfurlModal";


function GameBoard({
    playArea,
    activePluck,
    mainDeck,
    pluckDeck,
    ownership,
    drawCard,
    drawPluck,
    playCard,
    playPluck,
    fieldStyle,
    mainDiscard,
    discardCard,
    pluckDiscard,
    discardPluck,
    handleHoveredCard,
    selectPluck,
    selectedPluckIndex,
    shuffleMainDeck
}) {

    const main_deck = mainDeck || [];
    const fighter = playArea.fighter_slot || [];
    const aura = playArea.aura_slot || [];
    const move = playArea.move_slot || [];
    const ending = playArea.ending_slot || [];
    const slot5 = playArea.slot_5 || [];
    const slot6 = playArea.slot_6 || [];
    const slot7 = playArea.slot_7 || [];
    const slot8 = playArea.slot_8 || [];
    const discard_pile = mainDiscard || [];

    const pluck_deck = pluckDeck || [];
    const pluck_slot1 = activePluck.slot_1 || [];
    const pluck_slot2 = activePluck.slot_2 || [];
    const pluck_slot3 = activePluck.slot_3 || [];
    const pluck_slot4 = activePluck.slot_4 || [];
    const pluck_discard_pile = pluckDiscard || [];

    const [showOwnershipModal, setShowOwnershipModal] = useState(false)
    const [showDeckSearchModal, setShowDeckSearchModal] = useState(false)
    const [showUnfurlModal, setShowUnfurlModal] = useState(false)
    const [showDiscardModal, setShowDiscardModal] = useState(false)
    const [showExtra, setShowExtra] = useState(true)

    const totalSlotLength = slot5.length + slot6.length + slot7.length + slot8.length;

    return (
        <div className={showExtra? "play-area" : "play-area2"}>
            <SimDeckSearchModal
                mainDeck={mainDeck}
                handleHoveredCard={handleHoveredCard}
                showDeckSearchModal={showDeckSearchModal}
                setShowDeckSearchModal={setShowDeckSearchModal}
                mainDiscard={mainDiscard}
                showDiscardModal={showDiscardModal}
                setShowDiscardModal={setShowDiscardModal}
            />
            <OwnershipModal
                ownership={ownership}
                selectPluck={selectPluck}
                handleHoveredCard={handleHoveredCard}
                selectedPluckIndex={selectedPluckIndex}
                showOwnershipModal={showOwnershipModal}
                setShowOwnershipModal={setShowOwnershipModal}
            />
            <UnfurlModal
                mainDeck={mainDeck}
                handleHoveredCard={handleHoveredCard}
                showUnfurlModal={showUnfurlModal}
                setShowUnfurlModal={setShowUnfurlModal}
            />
            <div className="field_box" style={fieldStyle}>
                <div className={showExtra? "flex": "hidden2"}>
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
                                    onClick={() => discardCard(slot5[slot5.length-1], 0, "slot_5")}
                                    onMouseEnter={() => handleHoveredCard(slot5[slot5.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={slot5[slot5.length-1].picture_url ? slot5[slot5.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={slot5[slot5.length-1].name}/>
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
                                    onClick={() => discardCard(slot6[slot6.length-1], 0, "slot_6")}
                                    onMouseEnter={() => handleHoveredCard(slot6[slot6.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={slot6[slot6.length-1].picture_url ? slot6[slot6.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={slot6[slot6.length-1].name}/>
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
                                    onClick={() => discardCard(slot7[slot7.length-1], 0, "slot_7")}
                                    onMouseEnter={() => handleHoveredCard(slot7[slot7.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={slot7[slot7.length-1].picture_url ? slot7[slot7.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={slot7[slot7.length-1].name}/>
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
                                    onClick={() => discardCard(slot8[slot8.length-1], 0, "slot_8")}
                                    onMouseEnter={() => handleHoveredCard(slot8[slot8.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={slot8[slot8.length-1].picture_url ? slot8[slot8.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={slot8[slot8.length-1].name}/>
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
                    <div className={ totalSlotLength > 0 && !showExtra? "notify" : null}
                        style={{marginLeft: "-160px", marginRight: "20px"}}
                    >
                    { !showExtra?
                        <div className="matToggle pointer" onClick={() => setShowExtra(true)}>
                            <img className="logo5 pointer" src="https://i.imgur.com/z4CRxAm.png"/>
                        </div>
                        :
                        <div className="matToggle pointer" onClick={() => setShowExtra(false)}>
                            <img className="logo5" src="https://i.imgur.com/NE539ZZ.png"/>
                        </div>
                    }
                    </div>
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
                                    onClick={() => discardCard(fighter[fighter.length-1], 0, "fighter_slot")}
                                    onMouseEnter={() => handleHoveredCard(fighter[fighter.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={fighter[fighter.length-1].picture_url ? fighter[fighter.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={fighter[fighter.length-1].name}/>
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
                                    onClick={() => discardCard(aura[aura.length-1], 0, "aura_slot")}
                                    onMouseEnter={() => handleHoveredCard(aura[aura.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={aura[aura.length-1].picture_url ? aura[aura.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={aura[aura.length-1].name}/>
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
                                    onClick={() => discardCard(move[move.length-1], 0, "move_slot")}
                                    onMouseEnter={() => handleHoveredCard(move[move.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={move[move.length-1].picture_url ? move[move.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={move[move.length-1].name}/>
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
                                    onClick={() => discardCard(ending[ending.length-1], 0, "ending_slot")}
                                    onMouseEnter={() => handleHoveredCard(ending[ending.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${ending.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={ending[ending.length-1].picture_url ? ending[ending.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={ending[ending.length-1].name}/>
                            </>
                        :null}
                    </div>
                    <SimDeckSearch
                        mainDeck={mainDeck}
                        setShowDeckSearchModal={setShowDeckSearchModal}
                        drawCard={drawCard}
                        setShowUnfurlModal={setShowUnfurlModal}
                        shuffleMainDeck={shuffleMainDeck}
                        mainDiscard={mainDiscard}
                        setShowDiscardModal={setShowDiscardModal}
                    />
                </div>
                <div className="flex">
                    <div className="matLabel margin-top-20"
                        style={{marginLeft: "-160px", marginRight: "20px"}}
                    >
                        <h5 className="margin-bottom-0">Ownership</h5>
                    </div>
                    <div className="matLabel2 margin-top-20"><h5 className="margin-bottom-0">Active Pluck</h5></div>
                </div>

                <div style={{display: "flex"}}>
                    <Ownership
                        ownership={ownership}
                        selectPluck={selectPluck}
                        handleHoveredCard={handleHoveredCard}
                        selectedPluckIndex={selectedPluckIndex}
                        showOwnershipModal={showOwnershipModal}
                        setShowOwnershipModal={setShowOwnershipModal}
                    />

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
                                    onClick={() => discardPluck(pluck_slot1[pluck_slot1.length-1], 0, "slot_1")}
                                    onMouseEnter={() => handleHoveredCard(pluck_slot1[pluck_slot1.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={pluck_slot1[pluck_slot1.length-1].picture_url ? pluck_slot1[pluck_slot1.length-1].picture_url : "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                                    alt={pluck_slot1[pluck_slot1.length-1].name}/>
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
                                    onClick={() => discardPluck(pluck_slot2[pluck_slot2.length-1], 0, "slot_2")}
                                    onMouseEnter={() => handleHoveredCard(pluck_slot2[pluck_slot2.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={pluck_slot2[pluck_slot2.length-1].picture_url ? pluck_slot2[pluck_slot2.length-1].picture_url : "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                                    alt={pluck_slot2[pluck_slot2.length-1].name}/>
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
                                    onClick={() => discardPluck(pluck_slot3[pluck_slot3.length-1], 0, "slot_3")}
                                    onMouseEnter={() => handleHoveredCard(pluck_slot3[pluck_slot3.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={pluck_slot3[pluck_slot3.length-1].picture_url ? pluck_slot3[pluck_slot3.length-1].picture_url : "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                                    alt={pluck_slot3[pluck_slot3.length-1].name}/>
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
                                    onClick={() => discardPluck(pluck_slot4[pluck_slot4.length-1], 0, "slot_4")}
                                    onMouseEnter={() => handleHoveredCard(pluck_slot4[pluck_slot4.length-1])}
                                    className="builder-card5 pointer glow3"
                                    // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                    src={pluck_slot4[pluck_slot4.length-1].picture_url ? pluck_slot4[pluck_slot4.length-1].picture_url : "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                                    alt={pluck_slot4[pluck_slot4.length-1].name}/>
                            </>
                        :null}
                    </div>
                    <div className="matCard margin-left"
                    >
                        {pluck_discard_pile.length > 1 ?
                            <div className="matCardOverlay">
                                <h1>{pluck_discard_pile.length}</h1>
                            </div> :null
                        }
                        {pluck_discard_pile.length > 0 ?
                        <img
                            // onClick={() => discardCard(fighter[fighter.length-1], 0, "fighter_slot")}
                            className="builder-card5 pointer glow3"
                            // title={`${ending.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                            src={pluck_discard_pile[pluck_discard_pile.length-1].picture_url ? pluck_discard_pile[pluck_discard_pile.length-1].picture_url : "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                            alt={pluck_discard_pile[pluck_discard_pile.length-1].name}/>
                            :null}
                    </div>
                    <div className="matCard"
                        onClick={() => drawPluck()}
                    >
                        {pluck_deck.length > 1 ?
                            <div className="matCardOverlay">
                                <h1>{pluck_deck.length}</h1>
                            </div> :null
                        }
                        <img
                            // onClick={() => discardCard(fighter[fighter.length-1], 0, "fighter_slot")}
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
