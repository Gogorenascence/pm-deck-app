import {
    Container,
    Col,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";


function CardRow() {

    const [cards, setCards] = useState([]);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        setCards(data.cards.slice(-5));
    };

    useEffect(() => {
        getCards();
    })


return(
<div>
<Container>
    <Row md={5} className="g-4">
        {cards.map((card) => {
            return (
                <Col>
                <Card className="bg-dark text-white text-center d-flex flex-column justify-content-end" style={{ width: '250px' }}>
              <Card.Img src="ge3.png" alt="Card image" variant="bottom"/>
              <Card.ImgOverlay>
                <Card.Title>{card.name}</Card.Title>
              </Card.ImgOverlay>
            </Card>
            </Col>
            );
        })}
    </Row>
</Container>

</div>


);
}

export default CardRow;
