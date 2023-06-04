import {
    Col,
    Row,
    Button,
} from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import { NavLink, useParams} from 'react-router-dom';


function DeckEditPage() {
    const [deck, setDeck] = useState({
        name: "",
        account_id: "",
        description: "",
        strategies: [],
        cards: [],
        pluck: [],
        side: [],
        views: 0,
        cover_card: "",
    });

    const {deck_id} = useParams();

    const [deck_list, setDeckList] = useState([]);
    const [main_list, setMainList] = useState([]);
    const [pluck_list, setPluckList] = useState([]);
    const combinedList = main_list.concat(pluck_list);
    const [uniqueList, setUniqueList] = useState([]);

    const [selectedList, setSelectedList] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const [cards, setCards] = useState([]);

    const [showMore, setShowMore] = useState(20);
    const [listView, setListView] = useState(false);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();
        const sortedCards = [...data.cards].sort(sortMethods[sortState].method);

        setCards(sortedCards);
    };

    const getDeck = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/`);
        const deckData = await response.json();
        if (deckData["pluck"] === null){
            deckData["pluck"] = []
        }
        if (deckData["side"] === null){
            deckData["side"] = []
        }
        setDeck(deckData);
        console.log(deckData)
    };

    const getDeckList = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/list/`);
        const deckListData = await response.json();
        setDeckList(deckListData)
        setMainList(deckListData[0])
        setPluckList(deckListData[1])
    };

    const getExtraData = async() =>{
        setSelectedList(deck.strategies)
        setSelectedCard(deck.cover_card)
        const id_list = []
        const newList = []
        console.log(newList)
        for (let card of combinedList){
            if (!id_list.includes(card.id)){
                console.log(card)
                id_list.push(card.id)
                newList.push(card)
            }
        }
        setUniqueList(newList);
    }

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

    useEffect(() => {
        getDeck();
        getDeckList();
        getCards();
    },[]);

    useEffect(() => {
        getExtraData();
    }, [deck, deck_list, main_list, pluck_list]);

    const sortMethods = {
        none: { method: (a,b) => a.card_number - b.card_number },
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
        .filter(card => query.extraEffect? card.extra_effects.some(effect => effect.includes(query.extraEffect)):card.extra_effects)
        .filter(card => query.reaction? card.reactions.some(reaction => reaction.includes(query.reaction)):card.reactions)
        .filter(card => query.tag? card.card_tags.some(tag => tag.includes(query.tag)):card.card_tags)
        .sort(sortMethods[sortState].method)

    const handleShowMore = (event) => {
        setShowMore(showMore + 20);
    };

    const handleChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    const handleCoverCardChange = (event) => {
        setSelectedCard( event.target.value );
        setDeck({ ...deck, [event.target.name]: event.target.value });
        console.log(selectedCard)
    };

    const handleStrategyChange = e => {
        let { options } = e.target;
        options = Array.apply(null, options)
        const selectedValues = options.filter(x => x.selected).map(x => x.value);
        setSelectedList(selectedValues);
        console.log(selectedValues)
    }

    const handleClick = (card) => {
        console.log(card)
        if (card.card_type[0] == '64108dee159c81c7afebd104' ||
            card.card_type[0] == '640ce4bf5f6730657ad873be' ||
            card.card_type[0] == '64108db9159c81c7afebd103'){
            setPluckList([...pluck_list, card]);
            console.log(pluck_list);
        }else{
            setMainList([...main_list, card]);
            console.log(main_list);
        }
        getExtraData();
    }

    const handleRemoveCard = (card) => {
        if (card.card_type[0] == '64108dee159c81c7afebd104' ||
            card.card_type[0] == '640ce4bf5f6730657ad873be' ||
            card.card_type[0] == '64108db9159c81c7afebd103'){
                const pluckIndex = pluck_list.indexOf(card);
                const newPluckList = [...pluck_list];
                newPluckList.splice(pluckIndex, 1);
                setPluckList(newPluckList);
                if (card.picture_url == selectedCard){
                    setSelectedCard(null)
                }
        }else{
            const mainIndex = main_list.indexOf(card);
            const newMainList = [...main_list];
            newMainList.splice(mainIndex, 1);
            setMainList(newMainList);
            if (card.picture_url == selectedCard){
                setSelectedCard(null)
            }
        }
        getExtraData();
    }

    const clearMain = async() => {
        setMainList([]);
        const picture_urls = []
        for (let card of main_list){
            picture_urls.push(card.picture_url)
        }
        if (picture_urls.includes(selectedCard)){
            setSelectedCard(null);
        }
    }

    const clearPluck = async() => {
        setPluckList([]);
        const picture_urls = []
        for (let card of pluck_list){
            picture_urls.push(card.picture_url)
        }
        if (picture_urls.includes(selectedCard)){
            setSelectedCard(null);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...deck};
        const main = []
        const pluck = []
        for (let card of main_list){
            main.push(card.card_number)
        }
        for (let card of pluck_list){
            pluck.push(card.card_number)
        }
        data["cards"] = main;
        data["pluck"] = pluck;
        data["strategies"] = selectedList
        console.log(data)

        const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(cardUrl, fetchConfig);
        if (response.ok) {
            await response.json();
            setDeck({
                name: "",
                account_id: "",
                description: "",
                strategies: [],
                cards: [],
                pluck: [],
                side: [],
                views: 0,
                cover_card: "",
            });
            window.location.href = `${process.env.PUBLIC_URL}/decks/${deck_id}`;
        };
    }

    const handleListView = (event) => {
        setListView(!listView);
    };

    return (
        <div className="white-space">
            <h1 className="left-h1">Deck Edit</h1>
            <Row xs={3} sm={3} md={3} lg={3}>
                <form
                    style={{marginBottom: "45px", width: "435px"}}
                    onSubmit={handleSubmit}
                    id="create-deck-page">
                    <h2 className="left">Deck Details</h2>
                    <h5 className="label">Name </h5>
                    <input
                        className="builder-input"
                        type="text"
                        placeholder=" Deck Name"
                        onChange={handleChange}
                        name="name"
                        value={deck.name}>
                    </input>
                    <br/>
                    <h5 className="label">Cover Card</h5>
                    <select
                        className="builder-input"
                        type="text"
                        placeholder=" Cover Card"
                        onChange={handleCoverCardChange}
                        name="cover_card"
                        value={deck.cover_card}>
                        <option value="">Cover Card</option>
                        {uniqueList.sort((a,b) => a.card_number - b.card_number).map((card) => (
                            <option value={card.picture_url}>{card.name}</option>
                            ))}
                    </select>
                    <br/>
                    <h5 className="label"> Description </h5>
                    <textarea
                        className="builder-text"
                        type="text"
                        placeholder=" Deck Description"
                        onChange={handleChange}
                        name="description"
                        value={deck.description}>
                    </textarea>
                    <h5 className="label">Strategies</h5>
                    <h7 className="label"><em>hold ctrl/cmd to select more than one</em></h7>
                    <select
                        className="builder-text"
                        multiple
                        name="strategies"
                        onChange={handleStrategyChange}
                        >
                        <option value="">Strategy</option>
                        <option value="Aggro" selected={deck.strategies.includes("Aggro")}>Aggro</option>
                        <option value="Combo" selected={deck.strategies.includes("Combo")}>Combo</option>
                        <option value="Control" selected={deck.strategies.includes("Control")}>Control</option>
                        <option value="Mid-range" selected={deck.strategies.includes("Mid-range")}>Mid-range</option>
                        <option value="Ramp" selected={deck.strategies.includes("Ramp")}>Ramp</option>
                        <option value="Second Wind" selected={deck.strategies.includes("Second Wind")}>Second Wind</option>
                        <option value="Stall" selected={deck.strategies.includes("Stall")}>Stall</option>
                        <option value="Toolbox" selected={deck.strategies.includes("Toolbox")}>Toolbox</option>
                        <option value="other" selected={deck.strategies.includes("other")}>other</option>
                    </select>
                    {/* {...deck.strategies.includes("Aggro")? selected:null} */}
                    <br/>
                    <Button
                        style={{width: "67px", margin: "5px"}}
                        variant="dark"
                        onClick={handleSubmit}
                    >
                            Save
                    </Button>
                    <NavLink to={`/decks/${deck.id}/`}>
                        <Button
                            style={{width: "67px", margin: "5px"}}
                            variant="dark"
                            >
                            Back
                        </Button>
                    </NavLink>
                    <Button
                        className="left"
                        variant="danger"
                        onClick={clearMain}
                    >
                            Clear Main
                    </Button>
                    <Button
                        className="left"
                        variant="danger"
                        onClick={clearPluck}
                    >
                            Clear Pluck
                    </Button>
                    <br/>
                </form>
                <div style={{ width: "350px"}}>
                    <h2 className="left">Cover Card</h2>
                    {selectedCard ? (
                        <img
                            className="cover-card"
                            src={selectedCard}
                            alt={selectedCard.name}/>
                            ):(
                        <img
                            className="cover-card"
                            src={"logo4p.png"}
                            alt="Card Image"/>)}
                </div>

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
                        <option value="64079f10b2b376b6cd0454f6">Trigger</option>
                        <option value="6407aaae5139f66679d6ac52">Limited</option>
                        <option value="64079f5db2b376b6cd0454f7">Critical</option>
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
                    {listView?
                        <Button
                            className="left"
                            variant="dark"
                            onClick={handleListView}
                        >
                            Deck Image View
                        </Button>:
                        <Button
                            className="left"
                            variant="dark"
                            onClick={handleListView}
                        >
                            Deck List View
                        </Button>}
                    <br/>
                </div>

                </Row>
                <div className="cardpool">
                    <div style={{marginLeft: "0px"}}>
                        <h2
                            className="left"
                            style={{margin: "1% 20px", fontWeight: "700"}}
                        >Card Pool</h2>
                        <div className="scrollable">
                            <div style={{marginLeft: "20px"}}>
                                <Row xs="auto" className="justify-content-start">
                                    {all_cards.slice(0, showMore).map((card) => {
                                        return (
                                            <Col style={{padding: "5px"}}>
                                                    <img
                                                        onClick={() => handleClick(card)}
                                                        className={combinedList.includes(card) ? "selected builder-card" : "builder-card"}
                                                        title={card.name}
                                                        src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                        alt={card.name}
                                                        variant="bottom"/>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                            {showMore < all_cards.length ?
                                <Button
                                    variant="dark"
                                    style={{ width: "97%", margin:".5% 0% .5% 1.5%"}}
                                    onClick={handleShowMore}>
                                    Show More Cards ({all_cards.length - showMore} Remaining)
                                </Button> : null }
                        </div>
                    </div>
                </div>
                {listView?
                                <div className="deck-list">
                                    <div className="maindeck3">
                                    <div style={{marginLeft: "20px"}}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <h2
                                                className="left"
                                                style={{margin: "2% 0% 1% 0%", fontWeight: "700"}}
                                            >Main Deck</h2>
                                            <img className="logo" src="https://i.imgur.com/C2Pxj3s.png" />
                                            {main_list.length > 0 ?
                                            <h5
                                                className="left"
                                                style={{margin: "1% 0%", fontWeight: "700"}}
                                            >{main_list.length}</h5>:
                                            null}
                                        </div>
                                        {main_list.length > 0 ?<>
                                                {main_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                                    return (
                                                        <Col style={{padding: "5px"}}>
                                                            <div className="card-container">
                                                                <h5 onClick={() => handleRemoveCard(card)}>{card.name}</h5>
                                                                <img
                                                                    className="card-image"
                                                                    src={card.picture_url}
                                                                    alt={card.name}
                                                                />
                                                            </div>
                                                        </Col>

                                                    );
                                                })}
                                            </>:
                                        <h4 className="left no-cards">No cards added</h4>}
                                    </div>
                                </div>

                                <div className="pluckdeck3">
                                    <div style={{marginLeft: "20px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                            <h2
                                                className="left"
                                                style={{margin: "2% 0% 1% 0%", fontWeight: "700"}}
                                            >Pluck Deck</h2>
                                            <img className="logo" src="https://i.imgur.com/C2Pxj3s.png" />
                                            {pluck_list.length > 0 ?
                                            <h5
                                                className="left"
                                                style={{margin: "1% 0%", fontWeight: "700"}}
                                            >{pluck_list.length}</h5>:
                                            null}
                                        </div>
                                        {pluck_list.length > 0 ?<>
                                                {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                                    return (
                                                        <Col style={{padding: "5px"}}>
                                                            <div className="card-container">
                                                                <h5 onClick={() => handleRemoveCard(card)}>{card.name}</h5>
                                                                <img
                                                                    className="card-image"
                                                                    src={card.picture_url}
                                                                    alt={card.name}
                                                                />
                                                            </div>
                                                        </Col>
                                                    );
                                                })}
                                            </>:
                                        <h4 className="left no-cards">No cards added</h4>}
                                    </div>
                                </div>
                            </div>
                :<>
                    <div className="maindeck">
                        <div style={{marginLeft: "20px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                                <h2
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >Main Deck</h2>
                                <img className="logo" src="https://i.imgur.com/C2Pxj3s.png" />
                                {main_list.length > 0 ?
                                <h5
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >{main_list.length}</h5>:
                                null}
                            </div>

                            {main_list.length > 0 ?
                            <Row xs="auto" className="justify-content-start" style={{marginBottom: "8px"}}>
                                {main_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                            <img
                                                className="builder-card2"
                                                onClick={() => handleRemoveCard(card)}
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                alt={card.name}/>
                                        </Col>
                                    );
                                })}
                            </Row> :
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                    </div>

                    <div className="pluckdeck">
                        <div style={{marginLeft: "20px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                                <h2
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >Pluck Deck</h2>
                                <img className="logo" src="https://i.imgur.com/C2Pxj3s.png" />
                                {pluck_list.length > 0 ?
                                <h5
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >{pluck_list.length}</h5>:
                                null}
                            </div>
                            {pluck_list.length > 0 ?
                            <Row xs="auto" className="justify-content-start" style={{marginBottom: "8px"}}>
                                {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                            <img
                                                className="builder-card2"
                                                onClick={() => handleRemoveCard(card)}
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                alt={card.name}
                                                variant="bottom"/>
                                        </Col>
                                    );
                                })}
                            </Row> :
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                </div>
            </>}
        </div>
    );
}


export default DeckEditPage;
