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
    const [card_type, setCardType] = useState("")
    const [extra_effects, setExtraEffects] = useState([])
    const [reactions, setReactions] = useState([])
    const [card_tags, setCardTags] = useState([])


    const getCard = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/`);
        const cardData = await response.json();

        setCard(cardData);
    };

    const getRelatedCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/related_cards/`);
        const relatedData = await response.json();

        setRelatedCards(relatedData.cards);
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

    useEffect(() => {
        getCard();
        getRelatedCards();
        getCardType();
        getExtraEffects();
        getReactions();
        getCardTags();
    })

    return (
        <div className="white-space">
                <div style={{margin: "4% 0%"}}>
                <img className="left-card" src={card.picture_url} alt="Card image" style={{borderRadius: "27px", overflow: "hidden"}}/>
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
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Type</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card_type.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Enthusiasm</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.enthusiasm ? card.enthusiasm : "n/a"}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Card Number</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.card_number}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                    <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Class</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.card_class}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Tags</Card.Header>
                                            <Card.Body>
                                            {card_tags.map((card_tag) => {
                                                    return (
                                                        <Card.Title>{card_tag.name}</Card.Title>
                                                    );
                                                })}
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Hero ID</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.hero_id}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Reactions</Card.Header>
                                            <Card.Body>
                                            {reactions.length ? (
                                                reactions.map((reaction) => (
                                                <Card.Title key={reaction.name}>
                                                    {reaction.name} {reaction.count}
                                                </Card.Title>
                                                ))
                                            ) : (
                                                <Card.Title>n/a</Card.Title>
                                            )}
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Series</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.series_name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="dark" text="white" style={{margin: "6% 0%"}}>
                                            <Card.Header>Illustrator</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{card.illustrator}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                        </Row>
                    </Container>
                        <Card bg="dark" text="white" style={{margin: "5% 0% 1% 52%", width: "41%"}}>
                            <Card.Header>Card Effect</Card.Header>
                            <Card.Body>
                                <Card.Title>{card.effect_text}</Card.Title>
                                <Card.Title>{card.second_effect_text}</Card.Title>
                            </Card.Body>
                            {extra_effects.length ? (
                                extra_effects.map((extra_effect, index) => (
                                    <div key={index}>
                                        <Card.Header>Extra Effect Types</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{extra_effect.name}</Card.Title>
                                        </Card.Body>
                                    </div>
                                ))
                                ) : (
                                <br />
                                )}
                        </Card>
            </div>
    </div>
    </div>
    );
}

export default CardDetailPage;
