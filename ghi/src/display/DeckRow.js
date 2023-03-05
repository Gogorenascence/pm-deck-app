import {
    Container,
    Col,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";


function DeckRow() {

    const [decks, setDecks] = useState([]);

    const getDecks = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const data = await response.json();

        setDecks(data.decks.slice(-5));
    };

    useEffect(() => {
        getDecks();
    })



return(
<div>
<Container>
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {decks.map((deck) => {
            return (
                <Col>
                <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
              <Card.Img src="ge3.png" alt="Card image" variant="bottom"/>
              <Card.ImgOverlay className="blackfooter mt-auto">
                <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">{deck.name}</Card.Title>
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

export default DeckRow;
