import {
    Container,
    Col,
    Row,
    Card,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";


function CardRow() {

    const [cards, setCards] = useState([]);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        setCards(data.cards.slice(-5).reverse());
    };

    useEffect(() => {
        getCards();
    })


    return(
        <div>
            <Container>
                <Row xs={1} sm={2} md={3} lg={3} xl={5} className="g-3">
                    {cards.map((card) => {
                        return (
                            <Col>
                                <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
                                    <Card.Img src={card.picture_url ? card.picture_url : "logo4p.png"} alt="Card image" variant="bottom"/>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
                <br/>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg">
                        Browse All Cards
                    </Button>
                </div>
            </Container>

        </div>

    );
}

export default CardRow;
