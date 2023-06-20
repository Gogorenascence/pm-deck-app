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
        cardNumber: "",
        heroID: "",
        series: "",
        illustrator: "",
        type: "",
        cardClass: "",
        extraEffect: "",
        reaction: "",
        tag: "",
    });

    const [listView, setListView] = useState(false);
    const [sortState, setSortState] = useState("none");
    const [showMore, setShowMore] = useState(20);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        const sortedCards = [...data.cards].sort(sortMethods[sortState].method);

        const typedCards = []
        for (let card of sortedCards){
            if (card.card_type[0] === "64079ed6b2b376b6cd0454f5") {
                card["cardType"] = "Fighter"
            }
            else if (card.card_type[0] === "6407bb289b4fb23f5ddab698") {
                card["cardType"] = "Aura"
            }
            else if (card.card_type[0] === "6407a3bbc503d0c6f5a33238") {
                card["cardType"] = "Move"
            }
            else if (card.card_type[0] === "640ce41c5f6730657ad8739f") {
                card["cardType"] = "Ending"
            }
            else if (card.card_type[0] === "64108e0e159c81c7afebd105") {
                card["cardType"] = "Any Type"
            }
            else if (card.card_type[0] === "64108dee159c81c7afebd104") {
                card["cardType"] = "Item"
            }
            else if (card.card_type[0] === "640ce4bf5f6730657ad873be") {
                card["cardType"] = "Event"
            }
            else if (card.card_type[0] === "64108db9159c81c7afebd103") {
                card["cardType"] = "Comeback"
            }

            card["effectText"] = card.effect_text.split("//")

            if (card.second_effect_text){
                card["secondEffectText"] = card.second_effect_text.split("//")
            }

            typedCards.push(card)
        }
        setCards(typedCards);
        console.log(cards)

    };

    const getRandomCard = async() =>{
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex].card_number;
        console.log(randomCard.card_number)
        window.location.href = `${process.env.PUBLIC_URL}/cards/${randomCard}`;
    }

    useEffect(() => {
        getCards();
    // eslint-disable-next-line
    },[]);

    const sortMethods = {
        none: { method: (a,b) => b.id.localeCompare(a.id) },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        card_number: { method: (a,b) => a.card_number - b.card_number },
    };

    const handleQuery = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
        setShowMore(20)
    };

    const handleQueryReset = (event) => {
        setQuery({
            cardName: "",
            cardText: "",
            cardNumber: "",
            heroID: "",
            series: "",
            illustrator: "",
            type: "",
            cardClass: "",
            extraEffect: "",
            reaction: "",
            tag: "",
        });
        setShowMore(20)
    };

    const handleSort = (event) => {
        setSortState(event.target.value);
    };

    const handleShowMore = (event) => {
        setShowMore(showMore + 20);
    };

    const handleListView = (event) => {
        setListView(!listView);
        setShowMore(20)
    };

    const all_cards = cards.filter(card => card.name.toLowerCase().includes(query.cardName.toLowerCase()))
        .filter(card => (card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase()))
        .filter(card => card.card_number.toString().includes(query.cardNumber))
        .filter(card => card.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
        .filter(card => card.series_name.toLowerCase().includes(query.series.toLowerCase()))
        .filter(card => card.illustrator.toLowerCase().includes(query.illustrator.toLowerCase()))
        .filter(card => query.type? card.card_type.some(type => type.includes(query.type)):card.card_type)
        .filter(card => card.card_class.includes(query.cardClass))
        .filter(card => query.extraEffect? card.extra_effects.some(effect => effect.includes(query.extraEffect)):card.extra_effects)
        .filter(card => query.reaction? card.reactions.some(reaction => reaction.includes(query.reaction)):card.reactions)
        .filter(card => query.tag? card.card_tags.some(tag => tag.includes(query.tag)):card.card_tags)
        .sort(sortMethods[sortState].method)


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
                <option value="64079ed6b2b376b6cd0454f5">Fighter</option>
                <option value="6407bb289b4fb23f5ddab698">Aura</option>
                <option value="6407a3bbc503d0c6f5a33238">Move</option>
                <option value="640ce41c5f6730657ad8739f">Ending</option>
                <option value="64108e0e159c81c7afebd105">Any Type</option>
                <option value="64108dee159c81c7afebd104">Item</option>
                <option value="640ce4bf5f6730657ad873be">Event</option>
                <option value="64108db9159c81c7afebd103">Comeback</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Class"
                style={{width: "115px", height: "37px"}}
                name="cardClass"
                value={query.cardClass}
                onChange={handleQuery}>
                <option value="">Class</option>
                <option value="Staunch">Staunch</option>
                <option value="Power">Power</option>
                <option value="Unity">Unity</option>
                <option value="Canny">Canny</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Extra Effect"
                style={{width: "115px", height: "37px"}}
                name="extraEffect"
                value={query.extraEffect}
                onChange={handleQuery}>
                <option value="">Extra Effect</option>
                <option value="64079f10b2b376b6cd0454f6">Trigger</option>
                <option value="6407aaae5139f66679d6ac52">Limited</option>
                <option value="64079f5db2b376b6cd0454f7">Critical</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Reaction"
                style={{width: "115px", height: "37px"}}
                name="reaction"
                value={query.reaction}
                onChange={handleQuery}>
                <option value="">Reaction</option>
                <option value="64079f9fb2b376b6cd0454f8">Block</option>
                <option value="6407a068c503d0c6f5a33231">Counter</option>
                <option value="6407a0a9c503d0c6f5a33232">Endure</option>
                <option value="6407ab1c5139f66679d6ac53">Redirect</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Tag"
                style={{width: "115px", height: "37px"}}
                name="tag"
                value={query.tag}
                onChange={handleQuery}>
                <option value="">Tag</option>
                <option value="6407a27fc503d0c6f5a33233">5 HP</option>
                <option value="6407a29bc503d0c6f5a33234">Focus</option>
                <option value="6407ac305139f66679d6ac54">Auto</option>
                <option value="64124686d762a869c0b2e12d">Stay</option>
                <option value="640ce5e85f6730657ad873cb">Max</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Sorted By"
                style={{width: "115px", height: "37px"}}
                value={sortState}
                onChange={handleSort}>
                <option value="none">Sorted By</option>
                <option value="newest">Newest</option>
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
            {listView?
                <Button
                    className="left"
                    variant="dark"
                    onClick={handleListView}
                >
                    Image View
                </Button>:
                <Button
                    className="left"
                    variant="dark"
                    onClick={handleListView}
                >
                    List View
                </Button>}
            {listView?
                <div className="card-list3">
                    {all_cards.slice(0, showMore).map(card => {
                        return (
                            <NavLink to={`/cards/${card.card_number}`} className="nav-link">
                                    <div className={card.card_class ? `big${card.card_class}2` : "bigNoClass2"}>
                                        <h3 style={{fontWeight: "600", margin: "12px"}}>{card.name}</h3>
                                        <h5 style={{fontWeight: "600", margin: "12px"}}>{card.card_class} {card.cardType}</h5>
                                        {card.effectText.map((line) =>
                                        <h6 style={{fontWeight: "400", margin: "3px 12px"}}>
                                            {line}</h6>)}
                                        {card.secondEffectText?
                                        <>{card.secondEffectText.map((line) =>
                                        <h6 style={{fontWeight: "400", margin: "12px 12px 3px 12px"}}>
                                            {line}</h6>)}</>
                                        :null}

                                    </div>
                            </NavLink>
                        );
                    })}
                </div>
            :
            <div className="card-list">
                {all_cards.slice(0, showMore).map(card => {
                    return (
                        <NavLink to={`/cards/${card.card_number}`}>
                                <img className="card-list-card"
                                    title={card.name}
                                    src={card.picture_url ? card.picture_url : "logo4p.png"}
                                    alt={card.name}/>
                        </NavLink>
                    );
                })}
            </div>
            }
            {showMore < all_cards.length ?
                <Button
                    variant="dark"
                    style={{ width: "100%", marginTop:"3%"}}
                    onClick={handleShowMore}>
                    Show More Cards ({all_cards.length - showMore} Remaining)
                </Button> : null }
    </div>
    );
}

export default CardsPage;
