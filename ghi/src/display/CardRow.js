import {
    Container,
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';


function CardRow() {

    const [cards, setCards] = useState([]);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        setCards(data.cards.sort((a,b) => new Date(b.updated_on.full_time) - new Date(a.updated_on.full_time)).slice(0, 5));
    };

    useEffect(() => {
        getCards();
    }, []);


    return(
        <div className="white-space">
            <Container>
                <div className="cd-inner">
                    {cards.map((card) => {
                        return (
                            <div style={{width: "230px", margin: "0px 5px"}}>
                                <NavLink to={`/cards/${card.card_number}`}>
                                    <Card style={{ width: '230px', borderRadius: "10px", overflow: "hidden"}}>
                                        <Card.Img title={card.name} src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"} alt="Card image" variant="bottom"/>
                                    </Card>
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
                <br/>
                <div className="d-grid gap-2">
                    <NavLink to="/cards">
                        <button variant="dark" size="lg" style={{ width: "100%" }}>
                            Browse All Cards
                        </button>
                    </NavLink>
                </div>
            </Container>
        </div>

    );
}

export default CardRow;
