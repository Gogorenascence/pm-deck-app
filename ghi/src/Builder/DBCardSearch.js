import {
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";

function DBCardSearch() {

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

    const [sortState, setSortState] = useState("none");

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        const sortedCards = [...data.cards].sort(sortMethods[sortState].method);

        setCards(sortedCards);

    };

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

    const handleQuery = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
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
    };

    const handleSort = (event) => {
        setSortState(event.target.value);
    };

    const all_cards = cards.filter(card => card.name.toLowerCase().includes(query.cardName.toLowerCase()))
        .filter(card => (card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase()))
        .filter(card => card.card_number.toString().includes(query.cardNumber))
        .filter(card => card.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
        .filter(card => card.series_name.toLowerCase().includes(query.series.toLowerCase()))
        .filter(card => card.illustrator.toLowerCase().includes(query.illustrator.toLowerCase()))
        .filter(card => query.type? card.card_type.some(type => type.includes(query.type)):card.card_type)
        .filter(card => card.card_class.includes(query.cardClass))
        .filter(card => query.extraEffect? card.extra_effects.some(effect => effect.toString() == query.extraEffect):card.extra_effects)
        .filter(card => query.reaction? card.reactions.some(reaction => reaction.includes(query.reaction)):card.reactions)
        .filter(card => query.tag? card.card_tags.some(tag => tag.includes(query.tag)):card.card_tags)
        .sort(sortMethods[sortState].method)

    return (
        <div style={{marginLeft: "40px"}}>
            <h2 className="left">Search for cards</h2>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Card Name Contains..."
                name="cardName"
                value={query.cardName}
                onChange={handleQuery}>
            </input>
            <br/>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Card Text Contains..."
                name="cardText"
                value={query.cardText}
                onChange={handleQuery}>
            </input>
            <br/>
            <input
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Card Number"
                name="cardNumber"
                value={query.cardNumber}
                onChange={handleQuery}>
            </input>
            <input
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Hero ID"
                name="heroID"
                value={query.heroID}
                onChange={handleQuery}>
            </input>
            <br/>
            <input
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Series"
                name="series"
                value={query.series}
                onChange={handleQuery}>
            </input>
            <input
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Illustrator"
                name="illustrator"
                value={query.illustrator}
                onChange={handleQuery}>
            </input>
            <br/>
            <select
                className="left dcbsearch-small"
                type="text"
                placeholder=" Type"
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
                className="left dcbsearch-small"
                type="text"
                placeholder=" Class"
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
                className="left dcbsearch-small"
                type="text"
                placeholder=" Extra Effect"
                name="extraEffect"
                value={query.extraEffect}
                onChange={handleQuery}>
                <option value="">Extra Effect</option>
                <option value="1001">Trigger</option>
                <option value="1003">Limited</option>
                <option value="1002">Critical</option>
            </select>
            <br/>
            <select
                className="left dcbsearch-small"
                type="text"
                placeholder=" Reaction"
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
                className="left dcbsearch-small"
                type="text"
                placeholder=" Tag"
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
                className="left dcbsearch-small"
                type="text"
                placeholder=" Sorted By"
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
            <br/>
        </div>
    );
}

export default DBCardSearch;
