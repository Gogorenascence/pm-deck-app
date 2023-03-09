import {
    Col,
    Row,
    Card,
    Button,
    Container,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom';


function CardDetailPage() {

    const {card_number} = useParams();
    const [card, setCard] = useState("");
    const [relatedCards, setRelatedCards] = useState([]);

    const getCard = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}`);
        const cardData = await response.json();
        setCard(cardData);
    };
    const getRelatedCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/related_cards/${card_number}`);
        const relatedData = await response.json();

        setRelatedCards(relatedData.cards);

    };

    useEffect(() => {
        getCard();
        getRelatedCards();
    })

    return (
        <div className="white-space">
            <div className="left-div">
                <img className="centered-card" src={card.picture_url} alt="Card image"/>
                <h1 style={{margin: "0px 40px 20px 40px", fontSize: "40px"}}>Related Cards</h1>
                <div>
            <Container>
                <Row xs={1} sm={2} md={3} lg={3} className="g-3">
                    {relatedCards.map((relatedCard) => {
                        return (
                            <Col>
                                <NavLink to={`/cards/${relatedCard.card_number}`}>

                                <Card
                                    className="bg-dark text-white text-center"
                                    style={{ width: '200px', margin: '10px'}}>
                                    <Card.Img
                                        src={relatedCard.picture_url ? relatedCard.picture_url : "logo4p.png"}
                                        alt="Related Card image"
                                        variant="bottom"/>
                                </Card>
                                </NavLink>
                            </Col>
                        );
                    })}
                </Row>
                <br/>
            </Container>
        </div>



            </div>
            <div className="right-div">
                <p>card</p>
            </div>


            {/* <Button className="left" variant="dark">Search Cards</Button>
            <Button className="left" variant="dark">Reset Filters</Button>
            <Button className="left" variant="dark">Random Card</Button>
            <br/> */}
{/*
            <Row xs={1} sm={2} md={3} lg={4} xl={4}>
                {cards.map((card) => {
                    return (
                        <Col >
                            <Card
                                style={{ width: '370px', margin: '37px 5px 5px 5px'}}>
                                <Card.Img
                                    src={card.picture_url ? card.picture_url : "logo4p.png"}
                                    alt="Card image"
                                    variant="bottom"/>
                            </Card>
                        </Col>
                    );
                })}
            </Row> */}

    </div>
    );
}

export default CardDetailPage;
