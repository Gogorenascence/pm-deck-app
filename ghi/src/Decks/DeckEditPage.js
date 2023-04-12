import {
    Col,
    Row,
    Card,
    Button,
} from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import DBCardSearch from "../Builder/DBCardSearch";
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

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();
        setCards(data.cards.sort((a,b) => a.card_number - b.card_number));
    };

    const getDeck = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/`);
        const deckData = await response.json();
        setDeck(deckData);
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

    useEffect(() => {
        getDeck();
        getDeckList();
    },[]);

    useEffect(() => {
        getExtraData();
        getCards();
        console.log(selectedList);
        console.log(selectedCard);
        console.log(combinedList);
        console.log(uniqueList);
    }, [selectedCard, deck, deck_list]);

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
                    <h5 className="label">Strategies </h5>
                    <select
                        className="builder-text"
                        multiple
                        name="strategies"
                        onChange={handleStrategyChange}
                        >
                        <option value="">Strategy</option>
                        <option value="Aggro">Aggro</option>
                        <option value="Combo">Combo</option>
                        <option value="Control">Control</option>
                        <option value="Mid-range">Mid-range</option>
                        <option value="Ramp">Ramp</option>
                        <option value="Second_wind">Second Wind</option>
                        <option value="Stall">Stall</option>
                        <option value="Toolbox">Toolbox</option>
                        <option value="other">other</option>
                    </select>
                    <br/>
                    <Button
                            className="left"
                            variant="dark"
                        onClick={handleSubmit}
                    >
                            Save Changes
                    </Button>
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
                <DBCardSearch/>
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
                                {cards.map((card) => {
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
                        </div>
                    </div>
                </div>
                <div className="maindeck">
                    <div style={{marginLeft: "20px"}}>
                    <h2
                        className="left"
                        style={{margin: "1% 0%", fontWeight: "700"}}
                    >Main Deck</h2>
                        {main_list.length > 0 ?
                        <Row xs="auto" className="justify-content-start">
                            {main_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                return (
                                    <Col style={{padding: "5px"}}>
                                        <img
                                            className="builder-card"
                                            onClick={() => handleRemoveCard(card)}
                                            title={card.name}
                                            src={card.picture_url ? card.picture_url : "logo4p.png"}
                                            alt={card.name}/>
                                    </Col>
                                );
                            })}
                        </Row> :
                    <h4 className="left">No cards added</h4>}
                    {main_list.length > 0 ?
                    <h3
                        className="left"
                        style={{margin: "1% 0.5%", fontWeight: "700"}}
                    >Cards: {main_list.length}</h3>:
                    null}
                </div>
                </div>

                <div className="pluckdeck">
                    <div style={{marginLeft: "20px"}}>
                    <h2
                        className="left"
                        style={{margin: "1% 0%", fontWeight: "700"}}
                    >Pluck Deck</h2>
                        {pluck_list.length > 0 ?
                        <Row xs="auto" className="justify-content-start">
                            {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                return (
                                    <Col style={{padding: "5px"}}>
                                        <img
                                            className="builder-card"
                                            onClick={() => handleRemoveCard(card)}
                                            title={card.name}
                                            src={card.picture_url ? card.picture_url : "logo4p.png"}
                                            alt={card.name}
                                            variant="bottom"/>
                                    </Col>
                                );
                            })}
                        </Row> :
                    <h4 className="left">No cards added</h4>}
                    {pluck_list.length > 0 ?
                    <h3
                        className="left"
                        style={{margin: "1% 0%", fontWeight: "700"}}
                    >Cards: {pluck_list.length}</h3>:
                    null}
                </div>
            </div>
        </div>
    );
}


export default DeckEditPage;
