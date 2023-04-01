import {
    Col,
    Row,
    Card,
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

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();
        setCards(data.cards.sort((a,b) => a.card_number - b.card_number));
    };

    useEffect(() => {
        getCards();
    },[]);

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
        }else{
            const mainIndex = main_list.indexOf(card);
            const newMainList = [...main_list];
            newMainList.splice(mainIndex, 1);
            setMainList(newMainList);
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
        };
            // window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    }

    return (
        <div className="white-space">
        <h1 className="left-h1">Deck Builder</h1>
        <div style={{display: "grid", gridTemplateColumns: "30% 29% 30%" }}>
        <form
            onSubmit={handleSubmit}
            id="create-deck-page"
            // style={{display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
            <h2 className="left">Build your deck</h2>
            <h5 className="label">Name </h5>
            <input
                type="text"
                placeholder=" Deck Name"
                onChange={handleChange}
                name="name"
                value={deck.name}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
            </input>
            <br/>
            <h5 className="label">Cover Card</h5>
            <select
                type="text"
                placeholder=" Cover Card"
                onChange={handleCoverCardChange}
                name="cover_card"
                value={deck.cover_card}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
                <option value="">Cover Card</option>
                {uniqueList.sort((a,b) => a.card_number - b.card_number).map((card) => (
                    <option value={card.picture_url}>{card.name}</option>
                    ))}
            </select>
            <br/>
            <h5 className="label"> Description </h5>
            <textarea
                type="text"
                placeholder=" Deck Description"
                onChange={handleChange}
                name="description"
                value={deck.description}
                style={{width: "370px", height: "94px", margin: "5px 5px 0px 5px"}}>
            </textarea>
            <h5 className="label">Strategies </h5>
            <select
                multiple
                name="strategies"
                style={{width: "370px", height: "94px", margin: "5px 5px 0px 5px"}}
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
                    Create
            </Button>
            <br/>
        </form>
        <div>
            <h2 className="left">Cover Card</h2>
            <Card
                style={{ width: '347px', margin: '5px', borderRadius: "17px", overflow: "hidden"}}
                >
                    {selectedCard ? (
                        <Card.Img
                            src={selectedCard}
                            alt="Card image"
                            variant="bottom"/>
                            ):(
                        <Card.Img
                            src={"logo4p.png"}
                            alt="Card image"
                            variant="bottom"/>)}
            </Card>
        </div>
        <DBCardSearch/>
            </div>
            <div className="scrollable">
                <Row xs="auto" className="justify-content-start">
                    {cards.map((card) => {
                        return (
                            <Col>
                                    <Card
                                        style={{ width: '140px', margin: '5px 5px 5px 5px', borderRadius: "9px", overflow: "hidden"}}
                                        onClick={() => handleClick(card)}
                                        >
                                        <Card.Img
                                            title={card.name}
                                            src={card.picture_url ? card.picture_url : "logo4p.png"}
                                            alt="Card image"
                                            variant="bottom"/>
                                    </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>

            <div className="maindeck">
                <h2
                    className="left"
                    style={{margin: "1% 0.5%", fontWeight: "700"}}
                >Main Deck</h2>
                    {main_list.length > 0 ?
                    <Row xs="auto" className="justify-content-start">
                        {main_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                            return (
                                <Col>
                                        <Card
                                            style={{ width: '140px', margin: '5px 5px 10px 5px', borderRadius: "9px", overflow: "hidden"}}
                                            onClick={() => handleRemoveCard(card)}
                                            >
                                            <Card.Img
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                alt="Card image"
                                                variant="bottom"/>
                                        </Card>
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

            <div className="pluckdeck">
                <h2
                    className="left"
                    style={{margin: "1% 0.5%", fontWeight: "700"}}
                >Pluck Deck</h2>
                    {pluck_list.length > 0 ?
                    <Row xs="auto" className="justify-content-start">
                        {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                            return (
                                <Col>
                                        <Card
                                            style={{ width: '140px', margin: '5px 5px 10px 5px', borderRadius: "9px", overflow: "hidden"}}
                                            onClick={() => handleRemoveCard(card)}
                                            >
                                            <Card.Img
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                alt="Card image"
                                                variant="bottom"/>
                                        </Card>
                                </Col>
                            );
                        })}
                    </Row> :
                <h4 className="left">No cards added</h4>}
                {pluck_list.length > 0 ?
                <h3
                    className="left"
                    style={{margin: "1% 0.5%", fontWeight: "700"}}
                >Cards: {pluck_list.length}</h3>:
                null}
            </div>
    </div>
    );
}


export default DeckBuilder;
