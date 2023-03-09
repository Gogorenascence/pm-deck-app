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
                <img className="left-card" src={card.picture_url} alt="Card image"/>
                <div>
                    <Container style={{ width: "44%", margin: "3%", float: "left"}}>
                        <h1 className="centered-h1">Related Cards</h1>
                        <Row xs={1} sm={2} md={3} lg={3} className="g-3">
                            {relatedCards.map((relatedCard) => {
                                return (
                                    <Col>
                                        <NavLink to={`/cards/${relatedCard.card_number}`}>

                                            <Card
                                                className="bg-dark text-white text-center"
                                                style={{ width: '175px', margin: 'auto'}}>
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
                    <Container style={{margin: "1% 0% 1% 45%", width: "50%"}}>
                        <h1 >{card.name}</h1>
                        <Row xs={1} sm={2} md={3} lg={3}>
                                    <Col>
                                        <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Type</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.card_type}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Enthusiasm</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.enthusiasm}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Card Number</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.card_number}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                    <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Class</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.class}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Tags</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.tags}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Hero ID</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.hero_id}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                    <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Reactions</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.reactions}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Series</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.series}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card style={{margin: "6% 0%"}}>
                                            <Card.Header>Illustrator</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.illustrator}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                        </Row>
                    </Container>
                        <Card style={{margin: "5% 0% 1% 52%", width: "41%"}}>
                            <Card.Header>Card Effect</Card.Header>
                            <Card.Body>
                                <Card.Title>{card.illustrator}</Card.Title>
                            </Card.Body>
                        </Card>


                {/* <h1 style={{textAlign: "center", margin: "13px 10% 0% 10%"}}>{card.name}</h1> */}
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
