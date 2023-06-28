import {
    Card,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

function DecksPage() {

    const [decks, setDecks] = useState([]);

    const [deckQuery, setDeckQuery] = useState({
        deckName: "",
        description: "",
        cardNumber: "",
        strategies: "",
    });

    const [deckSortState, setDeckSortState] = useState("none");

    const [deckShowMore, setDeckShowMore] = useState(20);

    const getDecks = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const data = await response.json();

        const sortedDecks = [...data.decks].sort(deckSortMethods[deckSortState].method);

        for (let deck of sortedDecks){
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
        setDecks(sortedDecks.reverse());
        console.log(decks)
    };

    const getRandomDeck = async() =>{
        const randomIndex = Math.floor(Math.random() * decks.length);
        const randomDeck = decks[randomIndex].id;
        window.location.href = `${process.env.PUBLIC_URL}/decks/${randomDeck}`;
    }

    useEffect(() => {
        getDecks();
    // eslint-disable-next-line
    }, []);

    const deckSortMethods = {
        none: { method: (a,b) => b.id.localeCompare(a.id) },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        updated: { method: (a,b) => a.updated_on.full_time - b.updated_on.full_time },
    };

    const handleDeckQuery = (event) => {
        setDeckQuery({ ...deckQuery, [event.target.name]: event.target.value });
        console.log(event.target.value)
    };

    const handleDeckQueryReset = (event) => {
        setDeckQuery({
            deckName: "",
            description: "",
            cardNumber: "",
            strategy: "",
        });
    };

    const handleDeckSort = (event) => {
        setDeckSortState(event.target.value);
    };

    const handleDeckShowMore = (event) => {
        setDeckShowMore(deckShowMore + 20);
    };

    const all_decks = decks.filter(deck => deck.name.toLowerCase().includes(deckQuery.deckName.toLowerCase()))
        .filter(deck => (deck.description).toLowerCase().includes(deckQuery.description.toLowerCase()))
        .filter(deck => {
            if (deckQuery.cardNumber) {
                const allCards = deck.cards.concat(deck.pluck);
                console.log(allCards)
                const stringifiedCards = allCards.map(card => card.toString());
                return stringifiedCards.some(card => card.includes(deckQuery.cardNumber));
            } else {
                return true;
            }
        })
        .filter(deck => deckQuery.strategy? deck.strategies.some(strategy => strategy.includes(deckQuery.strategy)):deck.strategies)
        .sort(deckSortMethods[deckSortState].method)


    return (
        <div className="white-space">
            <h1 className="left-h1">Deck Search</h1>
            <h2 className="left">Search our collection of decks</h2>
            <input
                className="left"
                type="text"
                placeholder=" Deck Name Contains..."
                name="deckName"
                value={deckQuery.deckName}
                onChange={handleDeckQuery}
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Description Contains..."
                name="description"
                value={deckQuery.description}
                onChange={handleDeckQuery}
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Contains Card Number..."
                name="cardNumber"
                value={deckQuery.cardNumber}
                onChange={handleDeckQuery}
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/>
            {/* <input
                className="left"
                type="text"
                placeholder=" Contains Series..."
                style={{width: "370px", height: "37px"}}>
            </input>
            <br/> */}
            <select
                className="left"
                type="text"
                placeholder=" Strategy"
                name="strategy"
                value={deckQuery.strategy}
                onChange={handleDeckQuery}
                style={{width: "180px", height: "37px"}}>
                <option value="">Strategy</option>
                <option value="Aggro">Aggro</option>
                <option value="Combo">Combo</option>
                <option value="Control">Control</option>
                <option value="Mid-range">Midrange</option>
                <option value="Ramp">Ramp</option>
                <option value="Second Wind">Second Wind</option>
                <option value="Stall">Stall</option>
                <option value="Toolbox">Toolbox</option>
                <option value="other">other</option>
            </select>
            {/* <select
                className="left"
                type="text"
                placeholder=" Class"
                style={{width: "116px", height: "37px"}}>
                <option value="class">Class</option>
                <option value="staunch">Staunch</option>
                <option value="power">Power</option>
                <option value="unity">Unity</option>
                <option value="canny">Canny</option>
            </select> */}
            <select
                className="left"
                type="text"
                placeholder="  Sorted By"
                value={deckSortState}
                onChange={handleDeckSort}
                style={{width: "180px", height: "37px"}}>
                <option value="none">Sorted By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="updated">Last Updated</option>
                <option value="name">A-Z</option>
            </select>
            <br/>
            <NavLink to="/deckbuilder">
                <Button className="left"
                    variant="dark">
                        Create Deck
                </Button>
            </NavLink>
            <Button
                className="left"
                variant="dark"
                onClick={handleDeckQueryReset}
                >
                Reset Filters
            </Button>
            <Button
                className="left"
                variant="dark"
                onClick={getRandomDeck}
                >
                Random Deck
            </Button>


            <div className="decks-page-card-list2">
                {all_decks.slice(0, deckShowMore).map((deck) => {
                    return (
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
                    );
                })}
            </div>
            {deckShowMore < all_decks.length ?
                <Button
                    variant="dark"
                    style={{ width: "100%", marginTop:"2%"}}
                    onClick={handleDeckShowMore}>
                    Show More Decks ({all_decks.length - deckShowMore} Remaining)
                </Button> : null }
        </div>
    );
}

export default DecksPage;
