import {
    Container,
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

        const deckData = data.decks.slice(-4).reverse()
        for (let deck of deckData){
            const date = new Date(deck["created_on"]["full_time"])
            const time_now = new Date()
            // Calculate years, months, days, hours, minutes, and seconds
            let ago = Math.abs(time_now - date);
            const years = Math.floor(ago / 31557600000);
            ago -= years * 31557600000;
            const months = Math.floor(ago / 2630016000);
            ago -= months * 2630016000;
            const days = Math.floor(ago / 86400000);
            ago -= days * 86400000;
            const hours = Math.floor(ago / 3600000);
            ago -= hours * 3600000;
            const minutes = Math.floor(ago / 60000);
            ago -= minutes * 60000;
            // Format the time difference
            if (years > 0) {
            deck["created_on"]["ago"] = `${years} year ago`;
            } else if (months > 0) {
            deck["created_on"]["ago"] = `${months} month${months > 1 ? 's' : ''} ago`;
            } else if (days > 0) {
            deck["created_on"]["ago"] = `${days} day${days > 1 ? 's' : ''} ${hours > 1 ? ' and ' + hours + 'hours ago' : 'ago'}`;
            } else if (hours > 0) {
            deck["created_on"]["ago"] = `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minutes${minutes > 1 ? 's' : ''} ago`;
            } else if (minutes > 0) {
            deck["created_on"]["ago"] = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
            deck["created_on"]["ago"] = "a few seconds ago";
            }

            const updateDate = new Date(deck["updated_on"]["full_time"])
            // Calculate years, months, days, hours, minutes, and seconds
            let updateAgo = Math.abs(time_now - updateDate);
            console.log(updateAgo)
            const updateYears = Math.floor(updateAgo / 31557600000);
            updateAgo -= updateYears * 31557600000;
            const updateMonths = Math.floor(updateAgo / 2630016000);
            updateAgo -= updateMonths * 2630016000;
            const updateDays = Math.floor(updateAgo / 86400000);
            updateAgo -= updateDays * 86400000;
            const updateHours = Math.floor(updateAgo / 3600000);
            updateAgo -= updateHours * 3600000;
            const updateMinutes = Math.floor(updateAgo / 60000);
            updateAgo -= updateMinutes * 60000;
            // Format the time difference
            if (updateYears > 0) {
            deck["updated_on"]["ago"] = `${updateYears} year ago`;
            } else if (updateMonths > 0) {
            deck["updated_on"]["ago"] = `${updateMonths} month${updateMonths > 1 ? 's' : ''} ago`;
            } else if (updateDays > 0) {
            deck["updated_on"]["ago"] = `${updateDays} day${updateDays > 1 ? 's' : ''} ${updateHours > 1 ? ' and ' + updateHours + 'hours ago' : 'ago'}`;
            } else if (updateHours > 0) {
            deck["updated_on"]["ago"] = `${updateHours} hour${updateHours > 1 ? 's' : ''} ${updateMinutes > 1 ? ' and ' + updateMinutes + 'minutes ago' : 'ago'}`;
            } else if (updateMinutes > 0) {
            deck["updated_on"]["ago"] = `${updateMinutes} minute${updateMinutes > 1 ? 's' : ''} ago`;
            } else {
            deck["updated_on"]["ago"] = "a few seconds ago";
            }
        }
        setDecks(deckData);
        console.log(decks)
    };


    // const getDecks = async() =>{
    //     const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
    //     const data = await response.json();

    //     setDecks(data.decks.slice(-5).reverse());
    // };

    useEffect(() => {
        getDecks();
    }, []);



    return(
        <div className="white-space">
            <Container>
                <div className="deck-row-card-list2">
                    {decks.map((deck) => {
                        return (
                            // <div style={{width: "230px", margin: "0px 5px"}}>

                                <NavLink to={`/decks/${deck.id}`}>
                                    <Card className="text-white text-center card-list-card3">
                                        <div className="card-image-wrapper">
                                            <div className="card-image-clip">
                                                <Card.Img
                                                    src={deck.cover_card ? deck.cover_card : "logo4p.png"}
                                                    alt="Card image"
                                                    className="card-image2"
                                                    variant="bottom"/>
                                            </div>
                                        </div>
                                        <Card.ImgOverlay className="blackfooter2 mt-auto">
                                                <h3 className="left cd-container-child">{deck.name}</h3>
                                                {/* <h6 style={{margin: '0px 0px 5px 0px', fontWeight: "600"}}
                                                >
                                                    User:
                                                </h6> */}
                                                <h6 className="left"
                                                    style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                                                >
                                                    Strategies: {deck.strategies.length > 0 ? deck.strategies.join(', ') : "n/a"}
                                                </h6>
                                                <h6 className="left"
                                                    style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                                                >
                                                    Main Deck: {deck.cards.length} &nbsp; Pluck Deck: {deck.pluck.length}
                                                </h6>
                                                <div style={{ display: "flex" }}>
                                                    <img className="logo2" src="https://i.imgur.com/nIY2qSx.png" alt="created on"/>
                                                    <h6
                                                    className="left justify-content-end"
                                                        style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                                    >
                                                        {deck.created_on.ago} &nbsp; &nbsp;
                                                    </h6>
                                                    <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                                                    <h6
                                                    className="left justify-content-end"
                                                        style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                                    >
                                                        {deck.updated_on.ago}
                                                    </h6>
                                                </div>
                                        </Card.ImgOverlay>
                                    </Card>
                                </NavLink>


                            //     <NavLink to={`/decks/${deck.id}`}>
                            //         <Card className="text-white text-center" style={{ width: '230px', borderRadius: "10px", overflow: "hidden"}}>
                            //             <Card.Img
                            //                 title={deck.name}
                            //                 src={deck.cover_card ? deck.cover_card : "logo4p.png"}
                            //                 alt="Card image"
                            //                 variant="bottom"/>
                            //             <Card.ImgOverlay className="blackfooter mt-auto">
                            //                 <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">{deck.name}</Card.Title>
                            //             </Card.ImgOverlay>
                            //         </Card>
                            //     </NavLink>
                            // </div>
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
