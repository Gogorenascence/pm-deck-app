import {
    Button,
    Container,
    Modal,
} from "react-bootstrap";
import { useParams} from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react'


function CardAddToDeckModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [card, setCard] = useState([]);
    const {card_number} = useParams();

    const [decks, setDecks] = useState([]);
    const [deck, setDeck] = useState({ id: '' });

    const [deck_list, setDeckList] = useState([]);


    const getDecks = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const decksData = await response.json();

        setDecks(decksData.decks);
    };

    const getDeckList = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck.id}/list/`);
        const deckListData = await response.json();

        setDeckList(deckListData);
    };

    const getCard = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/`);
        const cardData = await response.json();

        setCard(cardData);
    };

    useEffect(() => {
        getDecks();
        getCard();
    }, []);

    const handleDeckChange = (event) => {
        setDeck({ id: event.target.value });
        console.log(deck);
        event.preventDefault();
    };

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        const removeTypeUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck.id}/add_card/${card_number}/`;
        fetch(removeTypeUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };

    return (

        <div>
            <Button
                style={{marginLeft: "2%", width: "100%"}}
                onClick={handleShow}
                variant="dark"
                size="lg">
                Add Card to Deck
            </Button>

            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <h1 className="label" style={{marginLeft: "10.5%"}}>Select a Deck</h1>
                </Modal.Header>
                    <Modal.Body>
                            <Container>

            <div style={{ margin: "3% 13% 13% 12.5%", width: "80%"}}>
                            <h4 className="label">Add to deck: </h4>
                                <select
                                    type="text"
                                    placeholder=" Deck"
                                    onChange={handleDeckChange}
                                    name="deck_id"
                                    style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
                                    <option value="">Deck</option>
                                    {decks.map((deck) => (
                                        <option value={deck.id}>{deck.name}</option>
                                        ))}
                                </select>
                                <br/>
                                {/* <h4 className="label"> </h4>
                                <select
                                    type="text"
                                    placeholder=" Deck"
                                    multiple="true"
                                    style={{width: "370px", height: "370px", margin: "5px 5px 0px 5px"}}>
                                    <option value="">Main Deck</option>
                                    {main_deck_list.map((main_deck_card) => (
                                        <option value={card.name}>{main_deck_card.name}</option>
                                        ))}
                                    <option value=""></option>
                                    <option value="">Pluck Deck</option>
                                    {pluck_deck_list.map((pluck) => (
                                        <option value={pluck.name}>{pluck.name}</option>
                                        ))}
                                    <option value=""></option>
                                    <option value="">Side Deck</option>
                                    {side_deck_list.map((side_deck_card) => (
                                        <option value={side_deck_card.name}>{side_deck_card.name}</option>
                                        ))}
                                </select> */}
                        </div>
                        </Container>
</Modal.Body>
</Modal>
        </div>
    )
}


export default CardAddToDeckModal;
