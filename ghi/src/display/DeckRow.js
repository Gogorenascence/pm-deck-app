import {
    Container,
    Col,
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
        <div className="white-space">
            <Container>
                <div className="cd-inner">
                    {decks.map((deck) => {
                        return (
                            <div style={{width: "230px", margin: "0px 5px"}}>
                                <NavLink to={`/decks/${deck.id}`}>
                                    <Card className="text-white text-center" style={{ width: '230px', borderRadius: "10px", overflow: "hidden"}}>
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
                            </div>
                        );
                    })}
                </div>
                <br/>
                <div className="d-grid gap-2">
                    <NavLink to="/decks">
                        <Button variant="dark" size="lg" style={{ width: "100%" }}>
                            Browse All Decks
                        </Button>
                    </NavLink>
                </div>
            </Container>
        </div>

    );
}

export default DeckRow;
