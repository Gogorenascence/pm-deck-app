import {
    Col,
    Row,
    Card,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink, useParams} from 'react-router-dom';


function DeckDetailPage() {

    const {deck_id} = useParams();
    const [deck, setDeck] = useState({ strategies: []});
    const [deck_list, setDeckList] = useState([]);
    const [main_list, setMainList] = useState([]);
    const [pluck_list, setPluckList] = useState([]);
    const [shuffledDeck, setShuffledDeck] = useState([]);
    const [ownership, setOwnership] = useState("");
    const [mulliganList, setMulliganList] = useState([]);

    // // const [query, setQuery] = useState("")

    const getDeck = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/`);
        const deckData = await response.json();
        console.log(deckData.name);
        console.log(deckData.cards);
        setDeck(deckData);
    };

    const getDeckList = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/list/`);
        const deckListData = await response.json();
        console.log(deckListData[0])
        console.log(deckListData[1])
        setDeckList(deckListData)
        setMainList(deckListData[0]);
        setPluckList(deckListData[1]);
    };

    const getShuffledDeck = async() =>{
        const shuffledDeck = main_list.slice(0)
        let currentIndex = shuffledDeck.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
            shuffledDeck[randomIndex], shuffledDeck[currentIndex]];
        }
        console.log(shuffledDeck)
        setShuffledDeck(shuffledDeck);
        console.log(shuffledDeck)

        const randomPluckIndex = Math.floor(Math.random() * pluck_list.length);
        setOwnership(pluck_list[randomPluckIndex]);
        console.log(ownership)
    }


    useEffect(() => {
        getDeck();
        getDeckList();
    },[]);

    const handleMulliganChange = (card) => {
        const deckIndex = shuffledDeck.indexOf(card)
        if (mulliganList.includes(deckIndex)){
            const mulliganIndex = mulliganList.indexOf(deckIndex);
            const newMulliganList = [...mulliganList];
            newMulliganList.splice(mulliganIndex, 1);
            setMulliganList(newMulliganList);
            console.log(mulliganList)
        }else{
            console.log(card)
            setMulliganList([...mulliganList, deckIndex]);
            console.log(mulliganList)
        }
    }

    const mulligan = async() => {
        for (let card of shuffledDeck){
            const cardIndex = shuffledDeck.indexOf(card)
            if (mulliganList.includes(cardIndex)){
                shuffledDeck[cardIndex] = "Gone"
            }
        }
        for (let card of shuffledDeck.slice(0)){
            const removeIndex = shuffledDeck.indexOf(card)
            if (card == "Gone"){
                shuffledDeck.splice(removeIndex, 1)
            }
        }
        setShuffledDeck(shuffledDeck.slice(0))
        setMulliganList([])
        console.log(shuffledDeck)
    }

    return (
        <div className="white-space">
        <Card bg="dark" text="white" style={{margin: "2% 0%"}}>
            <Card.Header
                style={{fontWeight: "500", fontSize: "40px"}}>
                    {deck.name}
            </Card.Header>
            {/* <Card.ImgOverlay src={deck.cover_card}></Card.ImgOverlay> */}
            {/* <Card.Body> */}
                {/* <Card.Title style={{fontWeight: "350"}}> */}
                    {/* Strategies: {deck.strategies.join(', ')} */}
                {/* </Card.Title> */}
            {/* </Card.Body> */}
            <Card.Body>
                <Card.Title
                // style={{fontWeight: "340"}}
                >
                    {deck.strategies.length > 1 ?
                        (<><strong>Strategies: </strong>{deck.strategies.join(', ')}</>):
                        (<><strong>Strategy: </strong>{deck.strategies}</>)}
                </Card.Title>
            </Card.Body>
        </Card>

            {deck.description ?
            <div>
                <h3 className="left-h1">Deck Description</h3>
                <p>{deck.description}</p>
            </div>:
            null}
            <div style={{display: "flex", marginLeft: "1%"}}>
                <div>
                {shuffledDeck.length > 0 ?
                <>
                    <h3
                        className="left"
                        style={{margin: "0% 0.5%", fontWeight: "700"}}
                        >Test Hand
                    </h3>
                    <Row xs="auto" className="justify-content-start">
                        {shuffledDeck.slice(0,8).map((card) => {
                            return (
                                <Col className={mulliganList.includes(shuffledDeck.indexOf(card)) ? "selected" : null}>
                                    <Card
                                        style={{
                                            width: '140px',
                                            margin: '10px 0px 10px 0px',
                                            borderRadius: "9px",
                                            overflow: "hidden"}}
                                        onClick={() => handleMulliganChange(card)}
                                        >
                                        <Card.Img
                                            title={card.name}
                                            src={card.picture_url ? card.picture_url : "logo4p.png"}
                                            alt="Card image"
                                            variant="bottom"/>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                    </> :
                    null}
                </div>
                <div style={{marginLeft: '5.25%'}}>
                {ownership ?
                <>
                <h3
                    className="left"
                    style={{margin: "0% 0.5%", fontWeight: "700"}}
                    >Ownwership
                </h3>
                <Row xs="auto" className="justify-content-center">
                    <Col>
                                        <Card
                                            style={{ width: '140px', margin: '10px 0px 10px 0px', borderRadius: "9px", overflow: "hidden"}}
                                            >
                                            <Card.Img
                                                title={ownership.name}
                                                src={ownership.picture_url ? ownership.picture_url : "logo4p.png"}
                                                alt="Card image"
                                                variant="bottom"/>
                                        </Card>
                    </Col>
                </Row>
                    </>
                    :
                    null}
                </div>
            </div>
            <Button
                    className="left"
                    variant="dark"
                    onClick={getShuffledDeck}
                    style={{marginLeft: "2%"}}
                    >
                    Test Hand
            </Button>
            {shuffledDeck.length > 0 ?
                <Button
                        className="left"
                        variant="dark"
                        onClick={mulligan}
                        style={{marginLeft: "2%"}}
                        >
                        Mulligan
                </Button>:
            null}
            <div className="maindeck">
                <h2
                    className="left"
                    style={{margin: "1% 0.5%", fontWeight: "700"}}
                >Main Deck</h2>
                    {main_list.length > 0 ?
                    <Row xs="auto" className="justify-content-start">
                        {main_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                            return (
                                <Col>
                                        <Card
                                            style={{ width: '140px',
                                                    margin: '15px 5px',
                                                    borderRadius: "9px",
                                                    overflow: "hidden"}}
                                        >
                                            <Card.Img
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                alt="Card image"
                                                variant="bottom"/>
                                        </Card>
                                </Col>
                            );
                        })}
                    </Row> :
                <h4 className="left">No cards added</h4>}
                {main_list.length > 0 ?
                <h3
                    className="left"
                    style={{margin: "1% 0.5%", fontWeight: "700"}}
                >Cards: {main_list.length}</h3>:
                null}
            </div>

            <div className="pluckdeck">
                <h2
                    className="left"
                    style={{margin: "1% 0.5%", fontWeight: "700"}}
                >Pluck Deck</h2>
                    {pluck_list.length > 0 ?
                    <Row xs="auto" className="justify-content-start">
                        {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                            return (
                                <Col>
                                        <Card
                                            style={{ width: '140px',
                                                    margin: '15px 5px',
                                                    borderRadius: "9px",
                                                    overflow: "hidden"}}
                                            >
                                            <Card.Img
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                alt="Card image"
                                                variant="bottom"/>
                                        </Card>
                                </Col>
                            );
                        })}
                    </Row> :
                <h4 className="left">No cards added</h4>}
                {pluck_list.length > 0 ?
                <h3
                    className="left"
                    style={{margin: "1% 0.5%", fontWeight: "700"}}
                >Cards: {pluck_list.length}</h3>:
                null}
            </div>
    </div>
    );
}


export default DeckDetailPage;
