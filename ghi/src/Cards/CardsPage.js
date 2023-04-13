import {
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

function CardsPage() {

    const [cards, setCards] = useState([]);

    const [query, setQuery] = useState({
        cardName: "",
        cardText: "",
        cardNumber: 0,
        heroID: "",
        series: "",
        illustrator: "",
        type: "",
        cardClass: "",
        extraEffect: "",
        reaction: "",
        tag: "",
    });

    const [sortState, setSortState] = useState("none");

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        const sortedCards = [...data.cards].sort(sortMethods[sortState].method);

        const filteredCards = sortedCards.reverse().filter(card => {
        if (query.cardName && !card.name.toLowerCase().includes(query.cardName.toLowerCase())) {
            return false;
        }
        if (query.cardText && !(card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase())) {
            return false;
        }
        if (query.cardNumber && card.card_number !== query.cardNumber) {
            return false;
        }
        if (query.heroID && !card.hero_id.toLowerCase().includes(query.heroID.toLowerCase())) {
            return false;
        }
        if (query.series && !card.series_name.toLowerCase().includes(query.series.toLowerCase())) {
            return false;
        }
        if (query.illustrator && !card.illustrator.toLowerCase().includes(query.illustrator.toLowerCase())) {
            return false;
        }
        if (query.type && card.card_type !== query.type) {
            return false;
        }
        if (query.cardClass && card.card_class !== query.cardClass) {
            return false;
        }
        if (query.extraEffect && !card.effect_texts.includes(query.extraEffect)) {
            return false;
        }
        if (query.reaction && !card.reactions.includes(query.reaction)) {
            return false;
        }
        if (query.tag && !card.card_tags.includes(query.tag)) {
            return false;
        }
        return true;
    });

    setCards(filteredCards);

    };

    const getRandomCard = async() =>{
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex].card_number;
        console.log(randomCard.card_number)
        window.location.href = `${process.env.PUBLIC_URL}/cards/${randomCard}`;
    }

    useEffect(() => {
        getCards();
    },[]);

    const sortMethods = {
        none: { method: (a,b) => b.id.localeCompare(a.id) },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        card_number: { method: (a,b) => a.card_number - b.card_number },
    };

    const handleSort = (event) => {
        setSortState(event.target.value);
        getCards();
    };

    const handleQuery = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
        getCards();
    };

    const handleQueryReset = (event) => {
        setQuery({
            cardName: "",
            cardText: "",
            cardNumber: 0,
            heroID: "",
            series: "",
            illustrator: "",
            type: "",
            cardClass: "",
            extraEffect: "",
            reaction: "",
            tag: "",
        });
        getCards();
    };


    return (
        <div className="white-space">
            <h1 className="left-h1">Card Search</h1>
            <h2 className="left">Search our collection of cards</h2>
            <input
                className="left"
                type="text"
                placeholder=" Card Name Contains..."
                style={{width: "740px", height: "37px"}}
                name="cardName"
                value={query.cardName}
                onChange={handleQuery}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Card Text Contains..."
                style={{width: "740px", height: "37px"}}
                name="cardText"
                value={query.cardText}
                onChange={handleQuery}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Card Number"
                style={{width: "177px", height: "37px"}}
                name="cardNumber"
                value={query.cardNumber}
                onChange={handleQuery}>
            </input>
            <input
                className="left"
                type="text"
                placeholder=" Hero ID"
                style={{width: "177px", height: "37px"}}
                name="heroID"
                value={query.heroID}
                onChange={handleQuery}>
            </input>
            <input
                className="left"
                type="text"
                placeholder=" Series"
                style={{width: "177px", height: "37px"}}
                name="series"
                value={query.series}
                onChange={handleQuery}>
            </input>
            <input
                className="left"
                type="text"
                placeholder=" Illustrator"
                style={{width: "177px", height: "37px"}}
                name="illustrator"
                value={query.illustrator}
                onChange={handleQuery}>
            </input>
            <br/>
            <select
                className="left"
                type="text"
                placeholder=" Type"
                style={{width: "115px", height: "37px"}}
                name="type"
                value={query.type}
                onChange={handleQuery}>
                <option value="">Type</option>
                <option value="fighter">Fighter</option>
                <option value="aura">Aura</option>
                <option value="move">Move</option>
                <option value="ending">Ending</option>
                <option value="any_type">Any Type</option>
                <option value="item">Item</option>
                <option value="event">Event</option>
                <option value="comeback">Comeback</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Class"
                style={{width: "115px", height: "37px"}}
                name="cardClass"
                value={query.cardClass}
                onChange={handleQuery}>
                <option value="class">Class</option>
                <option value="staunch">Staunch</option>
                <option value="power">Power</option>
                <option value="unity">Unity</option>
                <option value="canny">Canny</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Extra Effect"
                style={{width: "115px", height: "37px"}}
                name="extraEffect"
                value={query.extraEffect}
                onChange={handleQuery}>
                <option value="extra_effect">Extra Effect</option>
                <option value="trigger">Trigger</option>
                <option value="limited">Limited</option>
                <option value="critical">Critical</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Reaction"
                style={{width: "115px", height: "37px"}}
                name="reaction"
                value={query.reaction}
                onChange={handleQuery}>
                <option value="reaction">Reaction</option>
                <option value="block">Block</option>
                <option value="counter">Counter</option>
                <option value="endure">Endure</option>
                <option value="redirect">Redirect</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Tag"
                style={{width: "115px", height: "37px"}}
                name="tag"
                value={query.tag}
                onChange={handleQuery}>
                <option value="tag">Tag</option>
                <option value="5_hp">5 HP</option>
                <option value="focus">Focus</option>
                <option value="auto">Auto</option>
                <option value="stay">Stay</option>
                <option value="max_1">Max</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Sorted By"
                style={{width: "115px", height: "37px"}}
                value={sortState}
                onChange={handleSort}>
                <option value="none">Sorted By</option>
                <option value="none">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">A-Z</option>
                <option value="card_number">Card Number</option>
            </select>
            <br/>
            <Button
                className="left"
                variant="dark"
                onClick={handleQueryReset}
                >
                Reset Filters
            </Button>
            <Button
                className="left"
                variant="dark"
                onClick={getRandomCard}
                >
                Random Card
            </Button>
            <div className="card-list">
                {cards.sort(sortMethods[sortState].method).map(card => {
                    return (
                        <NavLink to={`/cards/${card.card_number}`}>
                                <img className="card-list-card"
                                    title={card.name}
                                    src={card.picture_url ? card.picture_url : "logo4p.png"}
                                    alt={card.name}
                                    variant="bottom"/>
                        </NavLink>
                    );
                })}
            </div>
    </div>
    );
}

export default CardsPage;
