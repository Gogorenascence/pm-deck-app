import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import GameBoard from "./GameBoard";


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
        setActivePluck
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
    const [hand, setHand] = useState([])
    const [ownership, setOwnership] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [selectedPluckIndex, setSelectedPluckIndex] = useState(null)


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

        document.title = "Card Create - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

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
            activePluck: activePluck
        }));
    }, [playerMainDeck, playerPluckDeck, hand, ownership, playArea, activePluck]);

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
    }

    const shufflePluckDeck = () => {
        console.log(player)
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

    const drawCard = () => {
        if (hand.length < 8) {
            const newHand = [...hand]
            const newMainDeck = [...playerMainDeck.cards]
            newHand.push(newMainDeck[0])
            setHand(newHand)
            setPlayerMainDeck({
                name: selectedMainDeck.name,
                cards: newMainDeck.slice(1)
            });
        } else {
            console.error("Hand is full")
        }
    }

    const drawPluck = () => {
        if (ownership.length < 8) {
            const newOwnership = [...ownership]
            const newPluckDeck = [...playerPluckDeck.cards]
            newOwnership.push(newPluckDeck[0])
            setOwnership(newOwnership)
            setPlayerPluckDeck({
                name: selectedPluckDeck.name,
                cards: newPluckDeck.slice(1)
            });
        } else {
            console.error("Ownership is full")
        }
    }

    const selectCard = (index) => {
        selectedIndex === index? setSelectedIndex(null): setSelectedIndex(index)
    }

    const selectPluck = (index) => {
        selectedPluckIndex === index? setSelectedPluckIndex(null): setSelectedPluckIndex(index)
    }

    const playCard = (zone) => {
        if (selectedIndex !== null) {
            const playedCard = player.hand[selectedIndex]
            const playZones = {...player.playArea}
            const selectZone = playZones[zone]
            const newHand = [...player.hand]
            selectZone.push(playedCard)
            setHand(newHand.filter((_, i) => i !== selectedIndex))
            setSelectedIndex(null)
            setPlayArea(playZones)
        }
    }

    const playPluck = (zone) => {
        if (selectedPluckIndex !== null) {
            const playedPluck = player.ownership[selectedPluckIndex]
            const pluckZones = {...player.activePluck}
            const selectZone = pluckZones[zone]
            const newOwnership = [...player.ownership]
            selectZone.push(playedPluck)
            setOwnership(newOwnership.filter((_, i) => i !== selectedPluckIndex))
            setSelectedPluckIndex(null)
            setActivePluck(pluckZones)
        }
    }

    const preprocessText = (text) => {
        return text.split("//").join("\n");
    };

    return (
        <div>
            <div style={{display: "flex"}}>
                <div>
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
                    {player.hand.length > 0 || player.ownership.length > 0?
                        // <p>{player.hand.length}</p>: null
                        <>
                            <div className="card-pool-fill">
                                {player.hand.map((card, index) => {
                                    return (
                                        <div style={{display: "flex", justifyContent: "center"}}>
                                            <img
                                                onClick={() => selectCard(index)}
                                                className={
                                                    selectedIndex === index?
                                                    "selected builder-card pointer glow3"
                                                :
                                                    "builder-card pointer glow3"
                                                }
                                                title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="card-pool-fill">
                                {player.ownership.map((card, index) => {
                                    return (
                                        <div style={{display: "flex", justifyContent: "center"}}>
                                            <img
                                                onClick={() => selectPluck(index)}
                                                className={
                                                    selectedPluckIndex === index?
                                                    "selected builder-card pointer glow3"
                                                :
                                                    "builder-card pointer glow3"
                                                }
                                                title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                        </div>
                                    );
                                })}
                            </div>
                        </>: null
                    }
                    <button onClick={checkPlayer}>Player Info</button>

                </div>
                <GameBoard
                    playArea={player.playArea}
                    activePluck={player.activePluck}
                    drawCard={drawCard}
                    drawPluck={drawPluck}
                    mainDeck={player.mainDeck}
                    pluckDeck={player.pluckDeck}
                    playCard={playCard}
                    playPluck={playPluck}
                />
            </div>
        </div>
    );
}

export default SimulatorPage;
