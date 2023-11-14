import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";


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

        console.log(player)
    }

    useEffect(() => {
        console.log(playerMainDeck)
        console.log(playerPluckDeck)
        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            mainDeck: playerMainDeck.cards,
            pluckDeck: playerPluckDeck.cards,
            hand: hand,
            ownership: ownership,
        }));
    }, [playerMainDeck, playerPluckDeck, hand, ownership]);

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
        console.log(shuffledDeck)
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
        console.log(shuffledDeck)
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
        console.log(player.hand)
        console.log(hand)
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

    return (
        <div className="play-area">
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
            </div>
            <button onClick={fillDecks}>Get Deck</button>


            {player.mainDeck.length > 0 ?
                <>
                <button onClick={gameStart}>Game Start</button>
                <button onClick={drawCard}>Draw Card</button>
                <button onClick={drawPluck}>Draw Pluck</button>
                </>:null
            }
            {player.hand.length > 0 ?
                // <p>{player.hand.length}</p>: null
                <>
                    {player.hand.map(card => <p>{card.name}</p>)}
                    {player.ownership.map(card => <p>{card.name}</p>)}
                </>: null
            }
            <button onClick={checkPlayer}>Player Info</button>
            {/* <img className="player-mat"
                src="pm-deck-builder-mat.png"/> */}
        </div>
    );
}

export default SimulatorPage;
