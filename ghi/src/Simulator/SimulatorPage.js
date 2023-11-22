import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import GameBoard from "./GameBoard";
import PositionSlider from "./PositionSlider";
import CardInfoPanel from "./CardInfoPanel";
import {
    specialSound,
    destroySound,
    shuffleSound,
    summonSound,
    drawSound,
    gainSound,
} from "../Sounds/Sounds";


function SimulatorPage() {

    const {
        player,
        setPlayer,
        playerMainDeck,
        setPlayerMainDeck,
        playerPluckDeck,
        setPlayerPluckDeck,
        playArea,
        setPlayArea,
        activePluck,
        setActivePluck,
        transformRotateX,
        setTransformRotateX,
        scale,
        setScale,
        position,
        setPosition,
        showExtra,
        setShowExtra
    } = useContext(GameStateContext)

    const [selectedMainDeck, setSelectedMainDeck] = useState({
        name: "",
        cards: []
    })
    const [selectedPluckDeck, setSelectedPluckDeck] = useState({
        name: "",
        cards: []
    })
    const [decks, setDecks] = useState([])
    const [cards, setCards] = useState([])
    const [hand, setHand] = useState(player.hand)
    const [ownership, setOwnership] = useState(player.ownership)
    const [discard, setDiscard] = useState(player.mainDiscard)
    const [pluckDiscard, setPluckDiscard] = useState(player.pluckDiscard)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [selectedPluckIndex, setSelectedPluckIndex] = useState(null)
    const [hoveredCard, setHoveredCard] = useState("")
    const [prompt, setPrompt] = useState({
        message: "",
        action: "",
    })

    const [showCardMenu, setShowCardMenu] = useState({
        show: false,
        index: null
    })
    const [showPluckMenu, setShowPluckMenu] = useState(null)

    const getDecks = async() =>{
        // setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const data = await response.json();
        setDecks(data.decks.sort((a,b) => a.name.localeCompare(b.name)));
        // setLoading(false)
    };

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/full_cards/`);
        const cardData = await response.json();
        setCards(cardData.cards);
    };

    useEffect(() => {
        getCards();
        getDecks();

        document.title = "Simulator - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    useEffect(() => {
        if (showCardMenu.index === null && selectedPluckIndex === null) {
            setPrompt({message: "", action: ""})
        }
    }, [showCardMenu, showPluckMenu])

    const handleChangeDeck = (event) => {
        const deckID = event.target.value
        const deckFound = decks.find(deck => deck.id === deckID)
        setSelectedMainDeck({
            name: deckFound.name + " Main",
            cards: deckFound.cards
        });
        setSelectedPluckDeck({
            name: deckFound.name + " Pluck",
            cards: deckFound.pluck
        })
    };

    const fillDecks = (event) => {
        const filledMainDeck = selectedMainDeck.cards.map(cardNumber =>
            cards.find(card => card.card_number === cardNumber)
        );
        const filledPluckDeck = selectedPluckDeck.cards.map(cardNumber =>
            cards.find(card => card.card_number === cardNumber)
        );
        setPlayerMainDeck({name: selectedMainDeck.name, cards: filledMainDeck})
        setPlayerPluckDeck({name: selectedPluckDeck.name, cards: filledPluckDeck})
    }

    useEffect(() => {
        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            mainDeck: playerMainDeck.cards,
            pluckDeck: playerPluckDeck.cards,
            hand: hand,
            ownership: ownership,
            playArea: playArea,
            activePluck: activePluck,
            mainDiscard: discard,
            pluckDiscard: pluckDiscard
        }));
    }, [playerMainDeck, playerPluckDeck, hand, ownership, playArea, activePluck, discard, pluckDiscard]);

    const shuffleMainDeck = () => {
        console.log(player)
        const shuffledDeck = [...playerMainDeck.cards]
        let currentMainIndex = shuffledDeck.length, randomMainIndex;
        // While there remain elements to shuffle.
        while (currentMainIndex !== 0) {
            // Pick a remaining element.
            randomMainIndex = Math.floor(Math.random() * currentMainIndex);
            currentMainIndex--;
            // And swap it with the current element.
            [shuffledDeck[currentMainIndex], shuffledDeck[randomMainIndex]] = [
            shuffledDeck[randomMainIndex], shuffledDeck[currentMainIndex]];
        }
        setPlayerMainDeck({name: selectedMainDeck.name, cards: shuffledDeck});
        shuffleSound()
    }

    const shufflePluckDeck = () => {
        const shuffledDeck = [...playerPluckDeck.cards]
        let currentPluckIndex = shuffledDeck.length, randomPluckIndex;
        // While there remain elements to shuffle.
        while (currentPluckIndex !== 0) {
            // Pick a remaining element.
            randomPluckIndex = Math.floor(Math.random() * currentPluckIndex);
            currentPluckIndex--;
            // And swap it with the current element.
            [shuffledDeck[currentPluckIndex], shuffledDeck[randomPluckIndex]] = [
            shuffledDeck[randomPluckIndex], shuffledDeck[currentPluckIndex]];
        }
        setPlayerPluckDeck({name: selectedPluckDeck.name, cards: shuffledDeck});
        shuffleSound()
    }

    const gameStart = () => {
        const shuffledMainDeck = [...playerMainDeck.cards]
        let currentMainIndex = shuffledMainDeck.length, randomMainIndex;
        // While there remain elements to shuffle.
        while (currentMainIndex !== 0) {
            // Pick a remaining element.
            randomMainIndex = Math.floor(Math.random() * currentMainIndex);
            currentMainIndex--;
            // And swap it with the current element.
            [shuffledMainDeck[currentMainIndex], shuffledMainDeck[randomMainIndex]] = [
            shuffledMainDeck[randomMainIndex], shuffledMainDeck[currentMainIndex]];
        }
        setHand(shuffledMainDeck.slice(0,6))
        setPlayerMainDeck({name: selectedMainDeck.name, cards: shuffledMainDeck.slice(6)});

        const shuffledPluckDeck = [...playerPluckDeck.cards]
        let currentPluckIndex = shuffledPluckDeck.length, randomPluckIndex;
        // While there remain elements to shuffle.
        while (currentPluckIndex !== 0) {
            // Pick a remaining element.
            randomPluckIndex = Math.floor(Math.random() * currentPluckIndex);
            currentPluckIndex--;
            // And swap it with the current element.
            [shuffledPluckDeck[currentPluckIndex], shuffledPluckDeck[randomPluckIndex]] = [
            shuffledPluckDeck[randomPluckIndex], shuffledPluckDeck[currentPluckIndex]];
        }
        setOwnership([shuffledPluckDeck[0]])
        setPlayerPluckDeck({name: selectedPluckDeck.name, cards: shuffledPluckDeck.slice(1)});
    }

    const checkPlayer = () => {
        console.log(player)
    }

    const playerPrompt = (message) => {
        setPrompt(message)
    }

    const drawCard = () => {
        if (hand.length < 8) {
            console.log(player.mainDeck)
            const newHand = [...hand]
            const newMainDeck = [...playerMainDeck.cards]
            newHand.push(newMainDeck[0])
            drawSound()
            setHand(newHand)
            setPlayerMainDeck({
                name: selectedMainDeck.name,
                cards: newMainDeck.slice(1)
            });
        } else {
            console.error("Hand is full")
        }
    }

    const addCardFromDeck = (index, unfurling) => {
        if (hand.length < 8) {
            const newHand = [...hand]
            const newMainDeck = [...playerMainDeck.cards]
            const cardToAdd = newMainDeck[index]
            newHand.push(cardToAdd)
            drawSound()
            setHand(newHand)
            const newShuffledMainDeck = newMainDeck.filter((_, i) => i !== index)
            if (unfurling === false) {
                let currentMainIndex = newShuffledMainDeck.length, randomMainIndex;
                while (currentMainIndex !== 0) {
                    randomMainIndex = Math.floor(Math.random() * currentMainIndex);
                    currentMainIndex--;
                    [newShuffledMainDeck[currentMainIndex], newShuffledMainDeck[randomMainIndex]] = [
                    newShuffledMainDeck[randomMainIndex], newShuffledMainDeck[currentMainIndex]];
                }
                shuffleSound()
            }
            setPlayerMainDeck({
                name: selectedMainDeck.name,
                cards: newShuffledMainDeck
            });
        } else {
            console.error("Hand is full")
        }
    }

    const addCardFromDiscard = (index) => {
        if (hand.length < 8) {
            const newHand = [...hand]
            const newDiscardPile = [...discard]
            const cardToAdd = newDiscardPile[index]
            newHand.push(cardToAdd)
            setHand(newHand)
            setDiscard(newDiscardPile.filter((_, i) => i !== index))
            drawSound();
        } else {
            console.error("Hand is full")
        }
    }

    const discardFromDeck = (index) => {
        const newDiscardPile = [...discard]
        const newMainDeck = [...playerMainDeck.cards]
        const cardToDiscard = newMainDeck[index]
        newDiscardPile.push(cardToDiscard)
        setDiscard(newDiscardPile)
        setPlayerMainDeck({
            name: selectedMainDeck.name,
            cards: newMainDeck.filter((_, i) => i !== index)
        });
        destroySound()
    }

    const drawPluck = () => {
        if (ownership.length < 8) {
            const newOwnership = [...ownership]
            const newPluckDeck = [...playerPluckDeck.cards]
            newOwnership.push(newPluckDeck[0])
            setOwnership(newOwnership)
            gainSound()
            setPlayerPluckDeck({
                name: selectedPluckDeck.name,
                cards: newPluckDeck.slice(1)
            });
        } else {
            console.error("Ownership is full")
        }
    }

    const addPluckFromDeck = (index, unfurling) => {
        if (ownership.length < 8) {
            const newOwnership = [...ownership]
            const newPluckDeck = [...playerPluckDeck.cards]
            const cardToAdd = newPluckDeck[index]
            newOwnership.push(cardToAdd)
            gainSound()
            setOwnership(newOwnership)
            const newShuffledPluckDeck = newPluckDeck.filter((_, i) => i !== index)
            if (unfurling === false) {
                let currentPluckIndex = newShuffledPluckDeck.length, randomPluckIndex;
                while (currentPluckIndex !== 0) {
                    randomPluckIndex = Math.floor(Math.random() * currentPluckIndex);
                    currentPluckIndex--;
                    [newShuffledPluckDeck[currentPluckIndex], newShuffledPluckDeck[randomPluckIndex]] = [
                    newShuffledPluckDeck[randomPluckIndex], newShuffledPluckDeck[currentPluckIndex]];
                }
                shuffleSound()
            }
            setPlayerPluckDeck({
                name: selectedPluckDeck.name,
                cards: newShuffledPluckDeck
            });
        } else {
            console.error("Ownership is full")
        }
    }

    const addPluckFromDiscard = (index) => {
        if (ownership.length < 8) {
            const newOwnership = [...ownership]
            const newDiscardPile = [...pluckDiscard]
            const cardToAdd = newDiscardPile[index]
            newOwnership.push(cardToAdd)
            setOwnership(newOwnership)
            gainSound()
            setPluckDiscard(newDiscardPile.filter((_, i) => i !== index));
        } else {
            console.error("Ownership is full")
        }
    }

    const handleShowCardMenu = (index) => {
        showCardMenu.index === index?
            setShowCardMenu({show: false, index: null}):
            setShowCardMenu({show: true, index: index})
    }

    const selectCard = (index) => {
        selectedIndex === index? setSelectedIndex(null): setSelectedIndex(index)
        console.log(showCardMenu.index, showPluckMenu)
        setShowCardMenu({show: false, index: index})
        setPrompt({
            message: "Select a Zone to Play Your Card!",
            action: "playArea"
        })
    }

    const selectPluck = (index) => {
        selectedPluckIndex === index? setSelectedPluckIndex(null): setSelectedPluckIndex(index)
        console.log(showCardMenu.index, showPluckMenu)
        setPrompt({
            message: "Select a Zone to Play Your Pluck!",
            action: "activePluck"
        })
    }

    const playCard = (zone) => {
        if (selectedIndex !== null) {
            const playedCard = player.hand[selectedIndex]
            const playZones = {...player.playArea}
            const selectZone = playZones[zone]
            const newHand = [...player.hand]
            console.log(selectedIndex)
            setPrompt({message: "", action: ""})
            selectZone.push(playedCard)
            summonSound()
            setHand(newHand.filter((_, i) => i !== selectedIndex))
            setSelectedIndex(null)
            setPlayArea(playZones)
            setShowCardMenu({show: false, index: null})
        }
    }

    const playPluck = (zone) => {
        if (selectedPluckIndex !== null) {
            const playedPluck = player.ownership[selectedPluckIndex]
            const pluckZones = {...player.activePluck}
            const selectZone = pluckZones[zone]
            const newOwnership = [...player.ownership]
            console.log(selectedPluckIndex)
            setPrompt({message: "", action: ""})
            selectZone.push(playedPluck)
            setOwnership(newOwnership.filter((_, i) => i !== selectedPluckIndex))
            setSelectedPluckIndex(null)
            specialSound()
            setActivePluck(pluckZones)
        }
    }

    const discardCard = (card, index, zone) => {
        const newPlayArea = {...player.playArea}
        const selectZone = newPlayArea[zone]
        console.log(player)
        const newDiscardPile = [...player.mainDiscard]

        newDiscardPile.push(card)
        const newSelectZone = selectZone.filter((_, i) => i !== index)
        destroySound()
        newPlayArea[zone] = newSelectZone

        setDiscard(newDiscardPile)
        setPlayArea(newPlayArea)
    }

    const discardCardFromHand = (index) => {
        const discardedCard = player.hand[index]
        const newDiscardPile = [...player.mainDiscard]
        const newHand = [...player.hand]
        newDiscardPile.push(discardedCard)
        setHand(newHand.filter((_, i) => i !== index))
        setDiscard(newDiscardPile)
        destroySound()
        setShowCardMenu({show: false, index: null})
    }

    const topDeckCard = (index) => {
        const toppedCard = player.hand[index]
        const newCards = [...player.mainDeck]
        console.log(newCards)
        const newHand = [...player.hand]
        newCards.unshift(toppedCard)
        setHand(newHand.filter((_, i) => i !== index))
        setPlayerMainDeck({...playerMainDeck, cards: newCards})
        setShowCardMenu({show: false, index: null})
    }

    const bottomDeckCard = (index) => {
        const bottomCard = player.hand[index]
        const newCards = [...player.mainDeck]
        console.log(newCards)
        const newHand = [...player.hand]
        newCards.push(bottomCard)
        setHand(newHand.filter((_, i) => i !== index))
        setPlayerMainDeck({...playerMainDeck, cards: newCards})
        setShowCardMenu({show: false, index: null})
    }

    const discardPluck = (card, index, zone) => {
        const newActivePluck = {...player.activePluck}
        const selectZone = newActivePluck[zone]
        const newDiscardPile = [...player.pluckDiscard]

        newDiscardPile.push(card)
        const newSelectZone = selectZone.filter((_, i) => i !== index)
        newActivePluck[zone] = newSelectZone
        destroySound()
        setPluckDiscard(newDiscardPile)
        setActivePluck(newActivePluck)
    }

    const discardPluckFromOwnership = (index) => {
        const discardedPluck = player.ownership[index]
        const newDiscardPile = [...player.pluckDiscard]
        const newOwnership = [...player.ownership]
        newDiscardPile.push(discardedPluck)
        setOwnership(newOwnership.filter((_, i) => i !== index))
        destroySound()
        setPluckDiscard(newDiscardPile)
    }

    const handleHoveredCard = (cardItem) => {
        setHoveredCard(cardItem)
    }

    const handleChangeTransformRotateX = (event) => {
        setTransformRotateX(`${event.target.value}deg`);
    };

    const handleChangeScale = (change) => {
        if (change === 'increase') {
            if (scale < 1.4) {
                setScale(scale + 0.1);
            }
        } else {
            if (scale > 0.5) {
                setScale(scale - 0.1 );
            }
        }
    }

    const handleChangePosition = (direction) => {
        const MOVE_AMOUNT = 30;
        const y_pos = position.y_pos
        const x_pos = position.x_pos
        if (direction === 'up') {
            setPosition({...position, y_pos: y_pos - MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (direction === 'down') {
            setPosition({...position, y_pos: y_pos + MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (direction === 'left') {
            setPosition({...position, x_pos: x_pos - MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (direction === 'right') {
            setPosition({...position, x_pos: x_pos + MOVE_AMOUNT });
            //this.forceUpdate();
        } else {
            setPosition({...position, x_pos: 0, y_pos: 0 });
            //this.forceUpdate();
        }
    }

    const fieldStyle = {
        transform: transformRotateX && scale && position.x_pos !== undefined && position.y_pos !== undefined ?
            "perspective(1000px) rotateX(" + transformRotateX + ") scale(" + scale + ") translate(" + position.x_pos + "px, " + position.y_pos + "px)"
            : "perspective(1000px) rotateX(45deg) scale(1.0) translate(0px, 0px)",
    }

    return (
        <div className="cd-inner">
            <CardInfoPanel hoveredCard={hoveredCard}/>
            <div className={prompt.message? "promptBar pointer": "noPromptBar"}
                onClick={() => setPrompt({message: "", action: ""})}
            >
                <h1>{prompt.message}</h1>
            </div>
            <div>
            <div className="deckSelect">
                <h5 className="label">Select a Deck </h5>
                <select
                    className="builder-input"
                    type="text"
                    placeholder=" Deck"
                    onChange={handleChangeDeck}
                    name="Deck">
                    <option value="">Deck</option>
                    {decks.map((deck) => (
                        <option value={deck.id}>{deck.name}</option>
                        ))}
                </select>
                <button onClick={fillDecks}>Get Deck</button>

                {player.mainDeck.length > 0 ?
                    <>
                        <button onClick={gameStart}>Game Start</button>
                    </>:null
                }

                <button onClick={checkPlayer}>Player Info</button>
            </div>
                <GameBoard
                    playArea={player.playArea}
                    activePluck={player.activePluck}
                    drawCard={drawCard}
                    addCardFromDeck={addCardFromDeck}
                    addCardFromDiscard={addCardFromDiscard}
                    drawPluck={drawPluck}
                    addPluckFromDeck={addPluckFromDeck}
                    addPluckFromDiscard={addPluckFromDiscard}
                    mainDeck={player.mainDeck}
                    pluckDeck={player.pluckDeck}
                    ownership={player.ownership}
                    showPluckMenu={showPluckMenu}
                    setShowPluckMenu={setShowPluckMenu}
                    playCard={playCard}
                    playPluck={playPluck}
                    fieldStyle={fieldStyle}
                    mainDiscard={player.mainDiscard}
                    discardCard={discardCard}
                    discardFromDeck={discardFromDeck}
                    pluckDiscard={player.pluckDiscard}
                    discardPluck={discardPluck}
                    discardPluckFromOwnership={discardPluckFromOwnership}
                    handleHoveredCard={handleHoveredCard}
                    selectPluck={selectPluck}
                    selectedPluckIndex={selectedPluckIndex}
                    shuffleMainDeck={shuffleMainDeck}
                    shufflePluckDeck={shufflePluckDeck}
                    showExtra={showExtra}
                    setShowExtra={setShowExtra}
                    />

                {player.hand.length > 0 || player.ownership.length > 0?
                    <>
                        <div className="card-pool-fill-hand">
                            {player.hand.map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <div>
                                            <div className={showCardMenu.index === index && showCardMenu.show === true? "card-menu": "hidden2"}>
                                                <div className="card-menu-item"
                                                    onClick={() => selectCard(index)}
                                                ><p>Play Face-Up</p></div>
                                                <div className="card-menu-item"><p>Play Face-Down</p></div>
                                                <div className="card-menu-item"><p>Place</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => discardCardFromHand(index)}
                                                ><p>Discard</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => topDeckCard(index)}
                                                ><p>Decktop</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => bottomDeckCard(index)}
                                                ><p>Deckbottom</p></div>
                                            </div>
                                            <img
                                                onClick={() => handleShowCardMenu(index)}
                                                onMouseEnter={() => handleHoveredCard(card)}
                                                className={
                                                    showCardMenu.index === index?
                                                    "selected3 builder-card-hand pointer"
                                                :
                                                    "builder-card-hand pointer"
                                                }
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                            </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>: null
                }
            </div>
            <PositionSlider
                handleChangePosition={handleChangePosition}
                handleChangeScale={handleChangeScale}
                handleChangeTransformRotateX={handleChangeTransformRotateX}
            />
        </div>
    );
}

export default SimulatorPage;
