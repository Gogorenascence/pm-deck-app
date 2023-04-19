import {
    Col,
    Row,
    Button,
} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import DBCardSearch from "./DBCardSearch";

function DeckBuilder() {
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

    const [main_list, setMainList] = useState([]);
    const [pluck_list, setPluckList] = useState([]);
    const combinedList = main_list.concat(pluck_list);
    const uniqueList = [...new Set(combinedList)];

    const [selectedList, setSelectedList] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const [cards, setCards] = useState([]);

    const [showMore, setShowMore] = useState(20);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();
        setCards(data.cards.sort((a,b) => a.card_number - b.card_number));
    };


    useEffect(() => {
        getCards();
    },[]);

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

        const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(cardUrl, fetchConfig);
        if (response.ok) {
            await response.json();
            const deck_id = await response.json().id;
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
            <h1 className="left-h1">Deck Builder</h1>
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
                            Create Deck
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
                            alt={selectedCard.name}
                            variant="bottom"/>
                            ):(
                        <img
                            className="cover-card"
                            src={"logo4p.png"}
                            alt="Card Image"
                            variant="bottom"/>)}
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
                                {cards.slice(0, showMore).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                                <img
                                                    onClick={() => handleClick(card)}
                                                    className={uniqueList.includes(card) ? "selected builder-card" : "builder-card"}
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                        </Col>
                                    );
                                })}
                            </Row>
                            </div>
                            {showMore < cards.length ?
                                <Button
                                    variant="dark"
                                    style={{ width: "97%", margin:".5% 0% .5% 1.5%"}}
                                    onClick={handleShowMore}>
                                    Show More Cards ({cards.length - showMore} Remaining)
                                </Button> : null }
                        </div>
                    </div>
                </div>
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
                                            className="builder-card"
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
                    <h4 className="left no-cards">No cards added</h4>}
                </div>
            </div>
        </div>
    );
}


export default DeckBuilder;
