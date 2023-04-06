import {
    Col,
    Row,
    Card,
    Button,
    Container,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink, useParams} from 'react-router-dom';
import CardEditModal from "./CardEditModal";
import CardAddCompModal from "./CardAddCompModal";
import CardAddToDeckModal from "./CardAddToDeckModal";


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
            <div style={{margin: "4% 0%", display: "flex"}}>
                <Container style={{width: "45%", marginRight: "2%"}}>
                    <img
                        className="cd-card"
                        src={card?.picture_url ?? "logo4p.png"}/>
                    <br/>

                    <Container style={{margin: "5% 0%"}}>
                            <h1 className="centered-h1">Related Cards</h1>
                            <Row xs={1} sm={2} md={3} lg={3} className="g-3">
                                {relatedCards.map((relatedCard) => {
                                    return (
                                        <Col>
                                            <NavLink to={`/cards/${relatedCard.card_number}`}>
                                                    <img
                                                        className="cd-card"
                                                        title={relatedCard.name}
                                                        src={relatedCard.picture_url ? relatedCard.picture_url : "logo4p.png"}
                                                        alt="Related Card image"
                                                        variant="bottom"/>
                                            </NavLink>
                                        </Col>
                                    );
                                })}
                            </Row>
                            <Button
                                style={{margin: "5% 35%", width: "160px", }}
                                variant="dark"
                                size="lg"
                                onClick={getRandomCard}
                            >
                                Random Card
                            </Button>
                            <br/>
                    </Container>
                </Container>


                <div style={{width: "55%"}}>
                    <div>
                        <h1 >{card.name}</h1>

                        <Row xs={3} sm={3} md={3} lg={3} style={{justifyContent: "center"}}>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Type</h3>
                                    <h5 title={card_type.rules}
                                        style={{fontWeight: "500", margin: "18px 0px"}}
                                        >{card_type.name} *</h5>
                            </div>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Class</h3>
                                    <h5 style={{fontWeight: "500", margin: "18px 0px"}}>{card.card_class ? card.card_class : "n/a"}</h5>
                            </div>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Reactions</h3>
                                {reactions.length ? (
                                    reactions.map((reaction) => (
                                    <h5 title={reaction.rules} style={{fontWeight: "500", margin: "18px 0px"}} key={reaction.name}>
                                        {reaction.name} {reaction.count} *
                                    </h5>
                                    ))
                                ) : (
                                    <h5 style={{fontWeight: "500", margin: "18px 0px"}}>n/a</h5>
                                )}
                            </div>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Enthusiasm</h3>
                                    <h5 style={{fontWeight: "500", margin: "18px 0px"}}>{card.enthusiasm ? card.enthusiasm : "n/a"}</h5>
                            </div>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Tags</h3>
                                {card_tags.map((card_tag) => {
                                        return (
                                            <h5 title={card_tag.rules} style={{fontWeight: "500", margin: "18px 0px"}}>{card_tag ? card_tag.name + " *": "n/a"}</h5>
                                        );
                                    })}
                            </div>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Series</h3>
                                    <h5 style={{fontWeight: "500", margin: "18px 0px"}}>{card.series_name}</h5>
                            </div>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Card Number</h3>
                                    <h5 style={{fontWeight: "500", margin: "18px 0px"}}>{card.card_number}</h5>
                            </div>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Hero ID</h3>
                                    <h5 style={{fontWeight: "500", margin: "18px 0px"}}>{card.hero_id}</h5>
                            </div>

                            <div className={card.card_class ? card.card_class : "NoClass"}>
                                <h3 style={{fontWeight: "500", marginTop: "10px"}}>Illustrator</h3>
                                    <h5 style={{fontWeight: "500", margin: "18px 0px"}}>{card.illustrator}</h5>
                            </div>

                        </Row>

                        <div className={card.card_class ? `big${card.card_class}` : "bigNoClass"}>
                            <h3 style={{fontWeight: "500", margin: "12px"}}>Card Effect</h3>
                            <h5 style={{fontWeight: "500", margin: "18px 12px"}}>{card.effect_text}</h5>
                            {card.second_effect_text && (
                                <div className="borderBlack">
                                    <h5 className="borderBlack"
                                        style={{fontWeight: "500", margin: "10px 10px 18px 10px"}}>{card.second_effect_text}</h5>
                                </div>
                            )}
                            {extra_effects.length ? (
                            <>
                                <h3 style={{fontWeight: "500", margin: "12px"}}>Extra Effect Types</h3>
                                <div className="borderBlack" style={{display:"flex"}}>
                                    {extra_effects.map((extra_effect) => (

                                        <h5 title={extra_effect.rules}
                                            style={{fontWeight: "500",
                                                height: "22px",
                                                margin: "0px 5px 20px 15px"}}>
                                            {extra_effect.name} *</h5>
                                    ))}
                                </div>
                            </>
                            ) : null}
                        </div>

                        <Container style={{margin: "2% 0%"}}>
                            <div style={{display: "flex", marginBottom: ".75%"}}>
                                <CardEditModal/>

                                <CardAddCompModal/>

                                <NavLink to="/cards/create">
                                    <Button
                                        className="button100"
                                        variant="danger"
                                        size="lg">
                                        Create
                                    </Button>
                                </NavLink>
                            </div>
                            <div style={{ display: "flex"}}>
                                <NavLink to="/cards">
                                    <Button
                                        className="button100"
                                        variant="dark"
                                        size="lg">
                                        Back
                                    </Button>
                                </NavLink>
                                <CardAddToDeckModal/>
                            </div>
                        </Container>

                    </div>
                </div>
            </div>

            <div>



            </div>
        </div>
    );
}

export default CardDetailPage;
