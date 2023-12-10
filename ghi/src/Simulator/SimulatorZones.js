import React, {useContext, useState} from "react";
import {
    menuSound,
    activateSound,
    flipSound
} from "../Sounds/Sounds";
import { GameStateContext } from "../context/GameStateContext";

function PlayAreaZone({
objectName,
stringName,
zoneArray,
selectedIndex,
playingFaceDown,
playCard,
setShowPlayAreaModal,
handleHoveredCard,
setFaceDown,
faceDown,
discardCard
}){

    const {player, volume, addToLog} = useContext(GameStateContext)
    const [showPlayAreaMenu, setShowPlayAreaMenu] = useState({
        fighter_slot: false,
        aura_slot: false,
        move_slot: false,
        ending_slot: false
    })

    const handleMenu = (event) => {
        event.preventDefault()
        setShowPlayAreaMenu({
            ...showPlayAreaMenu,
            [objectName]: !showPlayAreaMenu[objectName]
        })
        menuSound(volume)
    }

    const handleMenuClose = () => {
        setShowPlayAreaMenu({
            ...showPlayAreaMenu,
            [objectName]: false
        })
    }

    return(
        <div>
            <div className={showPlayAreaMenu[objectName]? "zone-menu": "hidden2"}>
                <div className="card-menu-item"
                    onClick={() => {
                        activateSound(volume)
                        addToLog("System", "system", `${player.name} is resolving "${zoneArray[0].name}"`)
                    }}
                ><p>Resolve</p></div>
                <div className="card-menu-item"
                    onClick={() => {
                        if (faceDown[objectName] === true){
                            addToLog("System", "system", `${player.name} revealed "${zoneArray[0].name}"`)
                        }
                        setFaceDown({...faceDown, [objectName]: !faceDown[objectName]})
                        flipSound(volume)
                        }
                    }
                ><p>Flip</p></div>
                <div className="card-menu-item"
                    // onClick={() => handlePlaceCardFromHand(index)}
                ><p>Swap</p></div>
                <div className="card-menu-item"
                    // onClick={() => discardCardFromHand(index)}
                ><p>Move</p></div>
                <div className="card-menu-item"
                    // onClick={() => topDeckCard(index)}
                ><p>Return to Hand</p></div>
                <div className="card-menu-item"
                    onClick={() => {
                        discardCard(zoneArray[zoneArray.length-1], 0, objectName)
                        handleMenuClose()
                    }}
                ><p>Discard</p></div>
            </div>
            <div className={selectedIndex === null? "matCard" : "matCardSelect"}
                onClick={() => { if (!playingFaceDown) {
                        playCard(objectName)
                        setFaceDown({...faceDown, [objectName]: false})
                    } else {
                        playCard(objectName, objectName)}
                    }
                }
            >
                {zoneArray.length > 0 ?
                    <>
                        {zoneArray.length > 1 ?
                            <div className="matCardOverlay"
                                onClick={() => setShowPlayAreaModal({name: stringName, zone: zoneArray})}
                                onMouseEnter={() => handleHoveredCard(zoneArray[zoneArray.length-1])}
                            >
                                <h1 className="fontSize60">{zoneArray.length}</h1>
                            </div> :null
                        }
                        <img
                            onDoubleClick={() => {
                                discardCard(zoneArray[zoneArray.length-1], 0, objectName)
                                setFaceDown({...faceDown, [objectName]: false})
                                handleMenuClose()
                            }}
                            onContextMenu={(event) => handleMenu(event)}
                            onClick={() => {
                                setFaceDown({...faceDown, [objectName]: !faceDown[objectName]})
                                flipSound(volume)
                            }}
                            onMouseEnter={() => handleHoveredCard(zoneArray[zoneArray.length-1])}
                            className="builder-card5 pointer glow3"
                            src={!faceDown[objectName]?
                                    (zoneArray[zoneArray.length-1].picture_url ?
                                        zoneArray[zoneArray.length-1].picture_url :
                                        "https://i.imgur.com/krY25iI.png"
                                    ):
                                    "https://i.imgur.com/krY25iI.png"
                                }
                            alt={zoneArray[zoneArray.length-1].name}/>
                    </>
                :null}
            </div>
        </div>
    )
}


function ActivePluckZone({
    objectName,
    zoneArray,
    selectedPluckIndex,
    playPluck,
    discardPluck,
    handleHoveredCard,
}){

    const {volume} = useContext(GameStateContext)

    return(
        <div>
            {/* <div className="zone-menu">
                <div className="card-menu-item"
                    // onClick={() => handleCardFromHand(index)}
                ><p></p></div>
                <div className="card-menu-item"
                    onClick={() => {
                        // setPlayingFaceDown(true)
                        // handleCardFromHand(index)
                    }}
                ><p>Play Face-Down</p></div>
                <div className="card-menu-item"
                    // onClick={() => handlePlaceCardFromHand(index)}
                ><p>Place</p></div>
                <div className="card-menu-item"
                    // onClick={() => discardCardFromHand(index)}
                ><p>Discard</p></div>
                <div className="card-menu-item"
                    // onClick={() => topDeckCard(index)}
                ><p>Decktop</p></div>
                <div className="card-menu-item"
                    // onClick={() => bottomDeckCard(index)}
                ><p>Deckbottom</p></div>
            </div> */}
            <div className={selectedPluckIndex === null? "matCard":"matCardSelect"}
                onClick={() => playPluck(objectName)}
            >
                {zoneArray.length > 0 ?
                    <>
                        {zoneArray.length > 1 ?
                            <div className="matCardOverlay">
                                <h1 className="fontSize60">{zoneArray.length}</h1>
                            </div> :null
                        }
                        <img
                            onDoubleClick={() => discardPluck(zoneArray[zoneArray.length-1], 0, objectName)}
                            onMouseEnter={() => handleHoveredCard(zoneArray[zoneArray.length-1])}
                            className="builder-card5 pointer glow3"

                            src={zoneArray[zoneArray.length-1].picture_url ?
                                    zoneArray[zoneArray.length-1].picture_url :
                                    "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                            alt={zoneArray[zoneArray.length-1].name}/>
                    </>
                :null}
            </div>
        </div>
    )
}


function ExtraZone({
    objectName,
    stringName,
    zoneArray,
    selectedIndex,
    playCard,
    setShowPlayAreaModal,
    handleHoveredCard,
    discardCard,
    playingFaceDown
}){

    const {player, volume, addToLog} = useContext(GameStateContext)
    const [showPlayAreaMenu, setShowPlayAreaMenu] = useState({
        slot_5: false,
        slot_6: false,
        slot_7: false,
        slot_8: false
    })

    const handleMenu = (event) => {
        event.preventDefault()
        setShowPlayAreaMenu({
            ...showPlayAreaMenu,
            [objectName]: !showPlayAreaMenu[objectName]
        })
        menuSound(volume)
    }

    const handleMenuClose = () => {
        setShowPlayAreaMenu({
            ...showPlayAreaMenu,
            [objectName]: false
        })
    }
    return(
        <div>
            <div className={showPlayAreaMenu[objectName]? "zone-menu2": "hidden2"}>
                <div className="card-menu-item"
                    onClick={() => {
                        activateSound(volume)
                        addToLog("System", "system", `${player.name} is resolving "${zoneArray[0].name}"`)
                    }}
                ><p>Resolve</p></div>
                <div className="card-menu-item"
                    // onClick={() => handlePlaceCardFromHand(index)}
                ><p>Swap</p></div>
                <div className="card-menu-item"
                    // onClick={() => discardCardFromHand(index)}
                ><p>Move</p></div>
                <div className="card-menu-item"
                    // onClick={() => topDeckCard(index)}
                ><p>Return to Hand</p></div>
                <div className="card-menu-item"
                    onClick={() => {
                        discardCard(zoneArray[zoneArray.length-1], 0, objectName)
                        handleMenuClose()
                    }}
                ><p>Discard</p></div>
            </div>
            <div className={selectedIndex !== null && playingFaceDown === false ? "matCardSelect" : "matCard"}
                onClick={() => playCard(objectName)}
            >
                {zoneArray.length > 0 ?
                    <>
                        {zoneArray.length > 1 ?
                            <div className="matCardOverlay"
                                onClick={() => setShowPlayAreaModal({name: stringName, zone: zoneArray})}
                                onMouseEnter={() => handleHoveredCard(zoneArray[zoneArray.length-1])}
                            >
                                <h1 className="fontSize60">{zoneArray.length}</h1>
                            </div> :null
                        }
                        <img
                            onDoubleClick={() => {
                                discardCard(zoneArray[zoneArray.length-1], 0, objectName)
                                handleMenuClose()
                            }}
                            onContextMenu={(event) => handleMenu(event)}
                            onClick={(event) => handleMenu(event)}
                            onMouseEnter={() => handleHoveredCard(zoneArray[zoneArray.length-1])}
                            className="builder-card5 pointer glow3"
                            src={zoneArray[zoneArray.length-1].picture_url ?
                                zoneArray[zoneArray.length-1].picture_url :
                                "https://i.imgur.com/krY25iI.png"}
                            alt={zoneArray[zoneArray.length-1].name}/>
                    </>
                :null}
            </div>
        </div>
    )
}


export {PlayAreaZone, ActivePluckZone, ExtraZone};
