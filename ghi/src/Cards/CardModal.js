import {
    Col,
    Row,
    Card,
    Button,
    Modal,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import React, { NavLink } from 'react-router-dom';


function CardDetail() {

    const [cards, setCards] = useState([]);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        setCards(data.cards);
    };

    useEffect(() => {
        getCard();
        getRelatedCards();
    })

    return (
        <div className="white-space">
            <h1 className="left-h1">Card Search</h1>
            <h2 className="left">Search our collection of cards</h2>


            <Row xs={1} sm={2} md={3} lg={4} xl={4}>
                {cards.map((card) => {
                    return (
                        <Col >
                            <Card
                                style={{ width: '370px', margin: '37px 5px 5px 5px'}}>
                                <Card.Img src={card.picture_url ? card.picture_url : "logo4p.png"} alt="Card image" variant="bottom"/>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

    </div>
    );
}

export default CardDetail;
