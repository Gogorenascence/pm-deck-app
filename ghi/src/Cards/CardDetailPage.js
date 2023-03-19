import {
    Col,
    Row,
    Card,
    Button,
    Container,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import CardEditModal from "./CardEditModal";
import CardAddCompModal from "./CardAddCompModal";


function CardDetailPage() {

    const {card_number} = useParams();
    const [card, setCard] = useState("");
    const [relatedCards, setRelatedCards] = useState([]);
    const [card_type, setCardType] = useState("")
    const [extra_effects, setExtraEffects] = useState([])
    const [reactions, setReactions] = useState([])
    const [card_tags, setCardTags] = useState([])

    const [cards, setCards] = useState([]);

    const getCard = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/`);
        const cardData = await response.json();

        console.log("card.picture_url", card.picture_url);

        setCard(cardData);
    };

    const getRelatedCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/related_cards/`);
        const relatedData = await response.json();

        setRelatedCards(relatedData.cards.sort((a,b) => a.card_number - b.card_number));
    };

    const getCardType = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/get_card_type/`);
        const cardTypeData = await response.json();

        setCardType(cardTypeData);
    };

    const getExtraEffects = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/get_extra_effects/`);
        const extraEffectData = await response.json();

        setExtraEffects(extraEffectData);
    };

    const getReactions = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/get_reactions/`);
        const reactionData = await response.json();

        setReactions(reactionData);
    };

    const getCardTags = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/get_tags/`);
        const cardTagData = await response.json();

        setCardTags(cardTagData);
    };

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        setCards(data.cards.reverse());
    };

    const getRandomCard = async() =>{
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex].card_number;
        console.log(randomCard.card_number)
        window.location.href = `${process.env.PUBLIC_URL}/cards/${randomCard}`;
    }

    useEffect(() => {
        getCard();
        getRelatedCards();
        getCardType();
        getExtraEffects();
        getReactions();
        getCardTags();
        getCards();
    }, [card_number]);

    return (
        <div className="white-space">
            <div style={{margin: "4% 0%"}}>
                <Card className="left-card" style={{borderRadius: "27px", overflow: "hidden"}}>
                    <Card.Img src={card?.picture_url ?? "logo4p.png"}/>
                </Card>
                <div>
                    <Container style={{ width: "44%", margin: "3%", float: "left"}}>
                        <h1 className="centered-h1">Related Cards</h1>
                        <Row xs={1} sm={2} md={3} lg={3} className="g-3">
                            {relatedCards.map((relatedCard) => {
                                return (
                                    <Col>
                                        <NavLink to={`/cards/${relatedCard.card_number}`}>

                                            <Card
                                                style={{ width: '175px', margin: 'auto', borderRadius: "9px", overflow: "hidden"}}>
                                                <Card.Img
                                                    title={relatedCard.name}
                                                    src={relatedCard.picture_url ? relatedCard.picture_url : "logo4p.png"}
                                                    alt="Related Card image"
                                                    variant="bottom"/>
                                            </Card>
                                        </NavLink>
                                    </Col>
                                );
                            })}
                        </Row>
                        <Button
                            style={{margin: "7% 37.75% 10%", width: "25%", }}
                            variant="dark"
                            size="lg"
                            onClick={getRandomCard}
                        >
                            Random Card
                        </Button>
                        <br/>
                    </Container>
                    <Container style={{margin: "1% 0% 1% 45%", width: "50%"}}>
                        <h1 >{card.name}</h1>
                        <Row xs={1} sm={2} md={3} lg={3}>
                                    <Col>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Type</Card.Header>
                                            <Card.Body>
                                                <Card.Title title={card_type.rules} style={{fontWeight: "350"}}>{card_type.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Enthusiasm</Card.Header>
                                            <Card.Body>
                                                <Card.Title style={{fontWeight: "350"}}>{card.enthusiasm ? card.enthusiasm : "n/a"}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Card Number</Card.Header>
                                            <Card.Body>
                                                <Card.Title style={{fontWeight: "350"}}>{card.card_number}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                    <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Class</Card.Header>
                                            <Card.Body>
                                                <Card.Title style={{fontWeight: "350"}}>{card.card_class ? card.card_class : "n/a"}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Tags</Card.Header>
                                            <Card.Body>
                                            {card_tags.map((card_tag) => {
                                                    return (
                                                        <Card.Title title={card_tag.rules} style={{fontWeight: "350"}}>{card_tag ? card_tag.name : "n/a"}</Card.Title>
                                                    );
                                                })}
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Hero ID</Card.Header>
                                            <Card.Body>
                                                <Card.Title style={{fontWeight: "350"}}>{card.hero_id}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Reactions</Card.Header>
                                            <Card.Body>
                                            {reactions.length ? (
                                                reactions.map((reaction) => (
                                                <Card.Title title={reaction.rules} style={{fontWeight: "350"}} key={reaction.name}>
                                                    {reaction.name} {reaction.count}
                                                </Card.Title>
                                                ))
                                            ) : (
                                                <Card.Title style={{fontWeight: "350"}}>n/a</Card.Title>
                                            )}
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Series</Card.Header>
                                            <Card.Body>
                                                <Card.Title style={{fontWeight: "350"}}>{card.series_name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header style={{fontWeight: "500"}}>Illustrator</Card.Header>
                                            <Card.Body>
                                                <Card.Title style={{fontWeight: "350"}}>{card.illustrator}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                        </Row>
                    </Container>
                    <Card bg="dark" text="white" style={{margin: "5% 0% 1% 51.75%", width: "41.75%"}}>
                        <Card.Header style={{fontWeight: "500"}}>Card Effect</Card.Header>
                        <Card.Body>
                            <Card.Title style={{fontWeight: "350"}}>{card.effect_text}</Card.Title>
                            {card.second_effect_text && (
                                <Card.Title style={{fontWeight: "350"}}>{card.second_effect_text}</Card.Title>
                            )}
                        </Card.Body>
                        {extra_effects.length ? (
                            <>
                                <Card.Header style={{fontWeight: "500"}}>Extra Effect Types</Card.Header>
                                {extra_effects.map((extra_effect) => (
                                    <Card.Body key={extra_effect.name}>
                                        <Card.Title title={extra_effect.rules} style={{fontWeight: "350", height: "22px"}}>{extra_effect.name}</Card.Title>
                                    </Card.Body>
                                ))}
                            </>
                        ) : null}
                    </Card>
                    <Container style={{margin: "1% 0% 1% 45%", width: "50%"}}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <NavLink to="/cards">
                                <Button
                                    style={{margin: "0% 1% 2% 12.5%", width: "100px"}}
                                    variant="dark"
                                    size="lg">
                                    Back
                                </Button>
                            </NavLink>

                            <CardEditModal/>

                            <CardAddCompModal/>

                            <NavLink to="/cards/create">
                                <Button
                                    style={{margin: "0% 1% 2% 35%", width: "146px"}}
                                    variant="danger"
                                    size="lg">
                                    Create
                                </Button>
                            </NavLink>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default CardDetailPage;
