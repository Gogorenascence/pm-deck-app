import {
    Col,
    Row,
    Card,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

function DecksPage() {

    // const deck_id =

    const [decks, setDecks] = useState([]);
    // const [cover_card, setCoverCard] = useState("");

    const getDecks = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const data = await response.json();

        setDecks(data.decks.reverse());
    };

    // const getCoverCard = async() =>{
    //     const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/cover/",`);
    //     const data = await response.json();

    //     setCoverCard(data.decks);
    // };

    useEffect(() => {
        getDecks();
    }, []);

    return (
        <div className="white-space">
            <h1 className="left-h1">Deck Search</h1>
            <h2 className="left">Search our collection of decks</h2>
            <input
                className="left"
                type="text"
                placeholder=" Deck Name"
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Description"
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Contains Card Number..."
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Contains Series..."
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            <select
                className="left"
                type="text"
                placeholder=" Strategy"
                style={{width: "116px", height: "37px"}}>
                <option value="strategy">Strategy</option>
                <option value="aggro">Aggro</option>
                <option value="combo">Combo</option>
                <option value="control">Control</option>
                <option value="midrange">Midrange</option>
                <option value="ramp">Ramp</option>
                <option value="second_wind">Second Wind</option>
                <option value="stall">Stall</option>
                <option value="toolbox">Toolbox</option>
                <option value="other">other</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Class"
                style={{width: "116px", height: "37px"}}>
                <option value="class">Class</option>
                <option value="staunch">Staunch</option>
                <option value="power">Power</option>
                <option value="unity">Unity</option>
                <option value="canny">Canny</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder="  Sorted By"
                style={{width: "116px", height: "37px"}}>
                <option value="sorted_by">Sorted By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most_views">Popular</option>
            </select>
            <br/>
            <Button className="left" variant="dark">Search Decks</Button>
            <Button className="left" variant="dark">Reset Filters</Button>
            <Button className="left" variant="dark">Random Deck</Button>
            <br/>

            <Row xs={1} sm={2} md={3} lg={4} xl={4}>
                {decks.map((deck) => {
                    return (
                        <Col >
                        <NavLink to={`/decks/${deck.id}`}>
                            <Card
                                className="bg-dark text-white text-center"
                                style={{ width: '370px', margin: '37px 5px 5px 5px', borderRadius: "17px", overflow: "hidden"}}>
                                <Card.Img
                                    src={deck.cover_card ? deck.cover_card : "logo4p.png"}
                                    alt="Card image"
                                    variant="bottom"/>
                                <Card.ImgOverlay className="blackfooter2 mt-auto">
                                    <Card.Title
                                        className="card-img-overlay d-flex flex-column justify-content-top">
                                            {deck.name}
                                    </Card.Title>
                                        <Card.Text className="card-img-overlay d-flex flex-column justify-content-end"
                                            style={{margin: '0px 0px 70px 0px', fontWeight: "600"}}
                                        >
                                            User:
                                        </Card.Text>
                                        <Card.Text className="card-img-overlay d-flex flex-column justify-content-end"
                                            style={{margin: '0px 0px 47px 0px', fontWeight: "600"}}
                                        >
                                            Strategies: {deck.strategies}
                                        </Card.Text>
                                        <Card.Text
                                        className="card-img-overlay container d-flex flex-column justify-content-end"
                                            style={{margin: '0px 0px 10px 0px', fontWeight: "600"}}
                                        >
                                            Views: {deck.views}
                                        </Card.Text>
                                </Card.ImgOverlay>
                            </Card>
                            </NavLink>
                        </Col>
                    );
                })}
            </Row>

        </div>
    );
}

export default DecksPage;
