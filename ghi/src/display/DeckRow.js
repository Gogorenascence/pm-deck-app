import {
    Container,
    Col,
    Row,
    Card,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';


function DeckRow() {

    const [decks, setDecks] = useState([]);
    // const [cover, setCover] = useState("");
    // const [deckId, setDeckId] = useState("");

    const getDecks = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const data = await response.json();

        setDecks(data.decks.slice(-5).reverse());
    };

    // const getCoverCard = async() =>{
    //     const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${id}/cover/`);
    //     const coverData = await response.json();

    //     setCover(coverData);

    useEffect(() => {
        getDecks();
        // getCoverCard();
    }, []);



    return(
        <div>
            <Container>
                <Row xs={1} sm={2} md={3} lg={3} xl={5} className="g-3">
                    {decks.map((deck) => {
                        return (
                            <Col>
                                <NavLink to={`/decks/${deck.id}`}>
                                    <Card className="bg-dark text-white text-center" style={{ width: '250px', borderRadius: "12px", overflow: "hidden"}}>
                                        <Card.Img
                                            title={deck.name}
                                            src={deck.cover_card ? deck.cover_card : "logo4p.png"}
                                            alt="Card image"
                                            variant="bottom"/>
                                        <Card.ImgOverlay className="blackfooter mt-auto">
                                            <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">{deck.name}</Card.Title>
                                        </Card.ImgOverlay>
                                    </Card>
                                </NavLink>
                            </Col>
                        );
                    })}
                </Row>
                <br/>
                <div className="d-grid gap-2">
                    <NavLink to="/decks">
                        <Button variant="dark" size="lg" style={{ width: "100.5%" }}>
                            Browse All Decks
                        </Button>
                    </NavLink>
                </div>
            </Container>
        </div>

    );
}

export default DeckRow;
