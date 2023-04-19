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
        setMainList(deckListData[0])
        setPluckList(deckListData[1])
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

    const clearShuffledDeck = async() =>{
        setShuffledDeck([]);
        setOwnership("");
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
            <div style={{display: "flex"}}>
                        {shuffledDeck.length > 0 ?
                <div className="maindeck2" style={{width: "90%"}}>
                    <div style={{marginLeft: "10px"}}>

                                <h4
                                    className="left"
                                    style={{margin: "10px 10px", fontWeight: "700"}}
                                    >Test Hand
                                </h4>
                                <div style={{width: "95%", marginLeft: "20px"}}>
                                    <Row xs="auto" className="justify-content-start">
                                        {shuffledDeck.slice(0,8).map((card) => {
                                            return (
                                                <Col
                                                    style={{padding: "2px 5px 8px 5px"}}>
                                                    <img
                                                        style={{
                                                            width: '120px',
                                                            margin: '10px 0px 10px 0px',
                                                            borderRadius: "7px",
                                                            overflow: "hidden"}}
                                                        onClick={() => handleMulliganChange(card)}
                                                        className={mulliganList.includes(shuffledDeck.indexOf(card)) ? "selected" : null}
                                                        title={card.name}
                                                        src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                        alt={card.name}/>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </div>

                    </div>
                </div>:
                        null}
                    {ownership ?

                    <div className="pluckdeck2" style={{marginLeft: ".5%"}}>

                                        <h4
                                            className="left"
                                            style={{margin: "10px 10px", fontWeight: "700"}}
                                            >Ownwership
                                        </h4>
                                        <Row xs="auto" className="justify-content-center">
                                            <Col style={{paddingTop: "2px"}}>
                                                <img
                                                    style={{ width: '120px',
                                                    margin: '10px 0px 10px 0px',
                                                    borderRadius: "7px",
                                                    overflow: "hidden"}}

                                                    title={ownership.name}
                                                    src={ownership.picture_url ? ownership.picture_url : "logo4p.png"}
                                                    alt={ownership.name}
                                                    variant="bottom"/>

                                            </Col>
                                        </Row>


                    </div>:
                    null}
            </div>
            <NavLink to={`/decks/${deck.id}/edit`}>
                <Button
                        className="left"
                        variant="danger"
                        style={{marginLeft: ".5%"}}
                        >
                        Edit Deck
                </Button>
            </NavLink>
            <Button
                    className="left"
                    variant="dark"
                    onClick={getShuffledDeck}
                    style={{marginLeft: ".5%"}}
                    >
                    Test Hand
            </Button>
            {shuffledDeck.length > 0 ?
                <>
                    <Button
                            className="left"
                            variant="dark"
                            onClick={mulligan}
                            style={{marginLeft: ".5%"}}
                            >
                            Mulligan
                    </Button>
                    <Button
                            className="left"
                            variant="dark"
                            onClick={clearShuffledDeck}
                            style={{marginLeft: ".5%", width: '80px', textAlign: "center"}}
                            >
                            Hide
                    </Button>
                </>:
            null}
            <NavLink to="/decks/">
                <Button
                        className="left button100"
                        variant="dark"
                        style={{marginLeft: ".5%", textAlign: "center"}}
                        >
                        Back
                </Button>
            </NavLink>
            <div className="maindeck">
                <div style={{marginLeft: "20px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <h2
                            className="left"
                            style={{margin: "1% 0%", fontWeight: "700"}}
                        >Main Deck</h2>
                        <img className="logo" src="https://i.imgur.com/C2Pxj3s.png" />
                        {main_list.length > 0 ?
                        <h5
                            className="left"
                            style={{margin: "1% 0%", fontWeight: "700"}}
                        >{main_list.length}</h5>:
                        null}
                    </div>
                    {main_list.length > 0 ?
                        <Row xs="auto" className="justify-content-start" style={{marginBottom: "8px"}}>
                            {main_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                return (
                                    <Col style={{padding: "5px"}}>
                                            <img
                                                style={{ width: '140px',
                                                        margin: '2.25px 0px',
                                                        borderRadius: "7px",
                                                        overflow: "hidden"}}

                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>

                                    </Col>
                                );
                            })}
                        </Row>:
                    <h4 className="left no-cards">No cards added</h4>}
                </div>
            </div>
            <div className="pluckdeck">
                <div style={{marginLeft: "20px"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                        <h2
                            className="left"
                            style={{margin: "1% 0%", fontWeight: "700"}}
                        >Pluck Deck</h2>
                        <img className="logo" src="https://i.imgur.com/C2Pxj3s.png" />
                        {pluck_list.length > 0 ?
                        <h5
                            className="left"
                            style={{margin: "1% 0%", fontWeight: "700"}}
                        >{pluck_list.length}</h5>:
                        null}
                    </div>
                    {pluck_list.length > 0 ?
                        <Row xs="auto" className="justify-content-start" style={{marginBottom: "8px"}}>
                            {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                return (
                                    <Col style={{padding: "5px"}}>
                                        <img
                                            style={{ width: '140px',
                                                    margin: '2.25px 0px',
                                                    borderRadius: "7px",
                                                    overflow: "hidden"}}

                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "logo4p.png"}
                                                alt={card.name}
                                                variant="bottom"/>

                                    </Col>
                                );
                            })}
                        </Row> :
                    <h4 className="left no-cards">No cards added</h4>}
                </div>
            </div>
    </div>
    );
}


export default DeckDetailPage;
