import {
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

function SetsPage() {

    const [boosterSets, setBoosterSets] = useState([]);

    const [boosterSetQuery, setBoosterSetQuery] = useState({
        boosterSetName: "",
    });

    const [boosterSetSortState, setBoosterSetSortState] = useState("none");

    const [boosterSetShowMore, setBoosterSetShowMore] = useState(20);

    const [noBoosterSet, setNoBoosterSet] = useState(false);

    const getBoosterSets = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/booster_sets/`);
        const data = await response.json();
        if (data.booster_sets.length == 0 ) {
            setNoBoosterSet(true)
        }
        const sortedBoosterSets = [...data.booster_sets].sort(boosterSetSortMethods[boosterSetSortState].method);
        setBoosterSets(sortedBoosterSets.reverse());
    };

    // const getRandomDeck = async() =>{
    //     const randomIndex = Math.floor(Math.random() * decks.length);
    //     const randomDeck = decks[randomIndex].id;
    //     window.location.href = `${process.env.PUBLIC_URL}/decks/${randomDeck}`;
    // }

    useEffect(() => {
        getBoosterSets();
        document.title = "Card Sets - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    }, []);

    const boosterSetSortMethods = {
        none: { method: (a,b) => b.id.localeCompare(a.id) },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
    };

    const handleBoosterSetQuery = (event) => {
        setBoosterSetShowMore({ ...boosterSetQuery, [event.target.name]: event.target.value });
    };

    const handleBoosterSetQueryReset = (event) => {
        setBoosterSetQuery({
            boosterSetName: "",
        });
    };

    const handleBoosterSetSort = (event) => {
        setBoosterSetSortState(event.target.value);
    };

    const handleBoosterSetShowMore = (event) => {
        setBoosterSetShowMore(boosterSetShowMore + 20);
    };

    const all_booster_sets = boosterSets.filter(boosterSet => boosterSet.name.toLowerCase()
        .includes(boosterSetQuery.boosterSetName.toLowerCase()))
        .sort(boosterSetSortMethods[boosterSetSortState].method)

    const isQueryEmpty = Object.values(boosterSetQuery).every((value) => value === "");

    return (
        <div className="white-space">
            <h1 className="left-h1">Card Set Search</h1>
            <h2 className="left">Search our collection of Card Sets</h2>
            <input
                className="left"
                type="text"
                placeholder=" Card Set Name Contains..."
                name="boosterSetName"
                value={boosterSetQuery.boosterSetName}
                onChange={handleBoosterSetQuery}
                style={{width: "40%", height: "37px"}}>
            </input>
            <br/>
            <select
                className="left"
                type="text"
                placeholder="  Sorted By"
                value={boosterSetSortState}
                onChange={handleBoosterSetSort}
                style={{width: "20%", height: "37px"}}>
                <option value="none">Sorted By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">A-Z</option>
            </select>
            <br/>
            {/* <NavLink to="/deckbuilder">
                <button className="left"
                    variant="dark">
                        Create Deck
                </button>
            </NavLink> */}
            <button
                className="left"
                variant="dark"
                onClick={handleBoosterSetQueryReset}
                >
                Reset Filters
            </button>
            {/* <button
                className="left"
                variant="dark"
                onClick={getRandomDeck}
                >
                Random Deck
            </button> */}

            { all_booster_sets.length == 0 && isQueryEmpty && !noBoosterSet ?
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div> :
            null}

            <div className="decks-page-card-list2">
                {all_booster_sets.slice(0, boosterSetShowMore).map((boosterSet) => {
                    return (
                        <NavLink to={`/cards/card_sets/${boosterSet.id}`}>
                            <Card className="text-white text-center card-list-card3">
                                <div className="card-image-wrapper">
                                    <div className="card-image-clip">
                                        <Card.Img
                                            src={boosterSet.cover_image ? boosterSet.cover_image : "https://i.imgur.com/8wqd1sD.png"}
                                            alt={boosterSet.name}
                                            className="card-image2"
                                            variant="bottom"/>
                                    </div>
                                </div>
                                <Card.ImgOverlay className="blackfooter2 mt-auto">
                                        <h3 className="left cd-container-child">{boosterSet.name}</h3>
                                        {/* <h6 className="left"
                                            style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                                        >
                                            Strategies: {deck.strategies.length > 0 ? deck.strategies.join(', ') : "n/a"}
                                        </h6> */}
                                        {/* <h6 className="left"
                                            style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                                        >
                                            {deck.cards.length} &nbsp; Pluck Deck: {deck.pluck.length}
                                        </h6> */}
                                        <div style={{ display: "flex" }}>
                                            <img className="logo2" src="https://i.imgur.com/nIY2qSx.png" alt="created on"/>
                                            <h6
                                            className="left justify-content-end"
                                                style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                            >
                                                {boosterSet.created_on.date_created}
                                            </h6>
                                            {/* <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                                            <h6
                                            className="left justify-content-end"
                                                style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                            >
                                                {deck.updated_on.ago}
                                            </h6> */}
                                        </div>
                                </Card.ImgOverlay>
                            </Card>
                        </NavLink>
                    );
                })}
            </div>
            {boosterSetShowMore < all_booster_sets.length ?
                <button
                    variant="dark"
                    style={{ width: "100%", marginTop:"2%"}}
                    onClick={handleBoosterSetShowMore}>
                    Show More Sets ({all_booster_sets.length - boosterSetShowMore} Remaining)
                </button> : null }
        </div>
    );
}

export default SetsPage;