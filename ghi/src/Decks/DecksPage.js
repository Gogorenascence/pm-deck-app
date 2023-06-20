import {
    Card,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

function DecksPage() {

    const [decks, setDecks] = useState([]);

    const [deckQuery, setDeckQuery] = useState({
        deckName: "",
        description: "",
        cardNumber: "",
        strategies: "",
    });

    const [deckSortState, setDeckSortState] = useState("none");

    const [deckShowMore, setDeckShowMore] = useState(20);

    const getDecks = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const data = await response.json();

        const sortedDecks = [...data.decks].sort(deckSortMethods[deckSortState].method);

        setDecks(sortedDecks.reverse());
    };

    const getRandomDeck = async() =>{
        const randomIndex = Math.floor(Math.random() * decks.length);
        const randomDeck = decks[randomIndex].id;
        window.location.href = `${process.env.PUBLIC_URL}/decks/${randomDeck}`;
    }

    useEffect(() => {
        getDecks();
    // eslint-disable-next-line
    }, []);

    const deckSortMethods = {
        none: { method: (a,b) => b.id.localeCompare(a.id) },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
    };

    const handleDeckQuery = (event) => {
        setDeckQuery({ ...deckQuery, [event.target.name]: event.target.value });
        console.log(event.target.value)
    };

    const handleDeckQueryReset = (event) => {
        setDeckQuery({
            deckName: "",
            description: "",
            cardNumber: "",
            strategy: "",
        });
    };

    const handleDeckSort = (event) => {
        setDeckSortState(event.target.value);
    };

    const handleDeckShowMore = (event) => {
        setDeckShowMore(deckShowMore + 20);
    };

    const all_decks = decks.filter(deck => deck.name.toLowerCase().includes(deckQuery.deckName.toLowerCase()))
        .filter(deck => (deck.description).toLowerCase().includes(deckQuery.description.toLowerCase()))
        .filter(deck => {
            if (deckQuery.cardNumber) {
                const allCards = deck.cards.concat(deck.pluck);
                console.log(allCards)
                const stringifiedCards = allCards.map(card => card.toString());
                return stringifiedCards.some(card => card.includes(deckQuery.cardNumber));
            } else {
                return true;
            }
        })
        .filter(deck => deckQuery.strategy? deck.strategies.some(strategy => strategy.includes(deckQuery.strategy)):deck.strategies)
        .sort(deckSortMethods[deckSortState].method)


    return (
        <div className="white-space">
            <h1 className="left-h1">Deck Search</h1>
            <h2 className="left">Search our collection of decks</h2>
            <input
                className="left"
                type="text"
                placeholder=" Deck Name Contains..."
                name="deckName"
                value={deckQuery.deckName}
                onChange={handleDeckQuery}
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Description Contains..."
                name="description"
                value={deckQuery.description}
                onChange={handleDeckQuery}
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Contains Card Number..."
                name="cardNumber"
                value={deckQuery.cardNumber}
                onChange={handleDeckQuery}
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            {/* <input
                className="left"
                type="text"
                placeholder=" Contains Series..."
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/> */}
            <select
                className="left"
                type="text"
                placeholder=" Strategy"
                name="strategy"
                value={deckQuery.strategy}
                onChange={handleDeckQuery}
                style={{width: "180px", height: "37px"}}>
                <option value="">Strategy</option>
                <option value="Aggro">Aggro</option>
                <option value="Combo">Combo</option>
                <option value="Control">Control</option>
                <option value="Mid-range">Midrange</option>
                <option value="Ramp">Ramp</option>
                <option value="Second Wind">Second Wind</option>
                <option value="Stall">Stall</option>
                <option value="Toolbox">Toolbox</option>
                <option value="other">other</option>
            </select>
            {/* <select
                className="left"
                type="text"
                placeholder=" Class"
                style={{width: "116px", height: "37px"}}>
                <option value="class">Class</option>
                <option value="staunch">Staunch</option>
                <option value="power">Power</option>
                <option value="unity">Unity</option>
                <option value="canny">Canny</option>
            </select> */}
            <select
                className="left"
                type="text"
                placeholder="  Sorted By"
                value={deckSortState}
                onChange={handleDeckSort}
                style={{width: "180px", height: "37px"}}>
                <option value="none">Sorted By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
            <br/>
            <NavLink to="/deckbuilder">
                <Button className="left"
                    variant="dark">
                        Create Deck
                </Button>
            </NavLink>
            <Button
                className="left"
                variant="dark"
                onClick={handleDeckQueryReset}
                >
                Reset Filters
            </Button>
            <Button
                className="left"
                variant="dark"
                onClick={getRandomDeck}
                >
                Random Deck
            </Button>


            <div className="card-list">
                {all_decks.map((deck) => {
                    return (
                        <NavLink to={`/decks/${deck.id}`}>
                            <Card
                                className="text-white text-center card-list-card">
                                <Card.Img
                                    src={deck.cover_card ? deck.cover_card : "logo4p.png"}
                                    alt="Card image"
                                    variant="bottom"/>
                                <Card.ImgOverlay className="blackfooter2 mt-auto">
                                        <h5>{deck.name}</h5>
                                        {/* <h6 style={{margin: '0px 0px 5px 0px', fontWeight: "600"}}
                                        >
                                            User:
                                        </h6> */}
                                        <h6 className="left"
                                            style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                                        >
                                            Strategies: {deck.strategies.join(', ')}
                                        </h6>
                                        <h6 className="left"
                                            style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                                        >
                                            Main Deck: {deck.cards.length}
                                        </h6>
                                        <h6 className="left"
                                            style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                                        >
                                            Pluck Deck: {deck.pluck.length}
                                        </h6>
                                        {/* <Card.Text
                                        className="card-img-overlay container d-flex flex-column justify-content-end"
                                            style={{margin: '0px 0px 0px 0px', fontWeight: "600"}}
                                        >
                                            Views: {deck.views}
                                        </Card.Text> */}
                                </Card.ImgOverlay>
                            </Card>
                        </NavLink>
                    );
                })}
            </div>
            {deckShowMore < all_decks.length ?
                <Button
                    variant="dark"
                    style={{ width: "100%", marginTop:"2%"}}
                    onClick={handleDeckShowMore}>
                    Show More Decks ({all_decks.length - deckShowMore} Remaining)
                </Button> : null }
        </div>
    );
}

export default DecksPage;
