import {
    Col
} from "react-bootstrap";
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ImageWithoutRightClick from "../display/ImageWithoutRightClick";
import { AuthContext } from "../Context/AuthContext";
import { BuilderQueryContext } from "../Context/BuilderQueryContext";
import { PullsContext } from "../Context/PullsContext";
import BuilderCardSearch from "./BuilderCardSearch";
import ImageViewListInput from "./ImageViewListInput";
import ListViewListInput from "./ListViewListInput";


function DeckBuilder() {
    const [deck, setDeck] = useState({
        name: "",
        account_id: "",
        description: "",
        strategies: [],
        cards: [],
        pluck: [],
        side: [],
        views: 0,
        cover_card: null,
        parent_id: "",
        private: false,
    });

    const {account} = useContext(AuthContext)

    const {query,
        sortState,
        boosterSet,
        rarity,
        listView,
        showMore,
        setShowMore} = useContext(BuilderQueryContext)

    const [main_list, setMainList] = useState([]);
    const [pluck_list, setPluckList] = useState([]);
    const combinedList = main_list.concat(pluck_list);
    const uniqueList = [...new Set(combinedList)];

    const [selectedList, setSelectedList] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const [cards, setCards] = useState([]);

    const [showPool, setShowPool] = useState(true);
    const [showMain, setShowMain] = useState(true);
    const [showPluck, setShowPluck] = useState(true);

    const [noCards, setNoCards] = useState(false);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        if (data.cards.length == 0 ) {
            setNoCards(true)
        }

        const sortedCards = [...data.cards].sort(sortMethods[sortState].method);

        setCards(sortedCards);
    };

    const {
        pulls,
        usePool,
        setUsePool
    } = useContext(PullsContext);

    const [pulledCards, setPulledCards] = useState([]);
    const [noPulledCards, setNoPulledCards] = useState(false);

    const getPulledCards = async() =>{
        if (pulls.length == 0 ) {
            setNoPulledCards(true)
        }
        const pulledCardsList = [];
        for (let pull of pulls) {
            pulledCardsList.push(...pull);
        }
        const sortedPulledCards = [...pulledCardsList].sort(sortMethods[sortState].method);
        console.log(pulledCardsList)

        setPulledCards(sortedPulledCards);
    };

    const selectedPool = usePool? cards : pulledCards

    const handleUsePool = (event) => {
        setUsePool(!usePool);
    };

    useEffect(() => {
        getCards();
        getPulledCards();
        document.title = "Deck Builder - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    const sortMethods = {
        none: { method: (a,b) => a.card_number - b.card_number },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        card_number: { method: (a,b) => a.card_number - b.card_number },
        enthusiasm_highest: { method: (a,b) => b.enthusiasm - a.enthusiasm },
        enthusiasm_lowest: { method: (a,b) => a.enthusiasm - b.enthusiasm },
    };

    const all_cards = selectedPool.filter(card => card.name.toLowerCase().includes(query.cardName.toLowerCase()))
        .filter(card => (card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase()))
        .filter(card => card.card_number.toString().includes(query.cardNumber))
        .filter(card => card.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
        .filter(card => card.series_name.toLowerCase().includes(query.series.toLowerCase()))
        .filter(card => card.card_number > query.startingNum - 1)
        .filter(card => query.type? card.card_type.some(type => type.toString() == query.type):card.card_type)
        .filter(card => card.card_class.includes(query.cardClass))
        .filter(card => query.extraEffect? card.extra_effects.some(effect => effect.toString() == query.extraEffect):card.extra_effects)
        .filter(card => query.reaction? card.reactions.some(reaction => reaction.toString() == query.reaction):card.reactions)
        .filter(card => query.tag? card.card_tags.some(tag => tag.toString() == query.tag):card.card_tags)
        .filter(card => boosterSet && !rarity ? boosterSet.all_cards.includes(card.card_number):card.card_number)
        .filter(card => boosterSet && rarity ? boosterSet[rarity].includes(card.card_number):card.card_number)
        .sort(sortMethods[sortState].method)

    const handleShowMore = (event) => {
        {usePool? setShowMore(showMore + 20): setShowMore(showMore + 50)}
    };

    const handleChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    const handleCheck = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.checked });
    };

    const handleCoverCardChange = (event) => {
        setSelectedCard( event.target.value );
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    const handleStrategyChange = e => {
        let { options } = e.target;
        options = Array.apply(null, options)
        const selectedValues = options.filter(x => x.selected).map(x => x.value);
        setSelectedList(selectedValues);
    }

    const handleClick = (card) => {
        if (card.card_type[0] === 1006 ||
            card.card_type[0] === 1007 ||
            card.card_type[0] === 1008){
            setPluckList([...pluck_list, card]);
        }else{
            setMainList([...main_list, card]);
        }
    }

    const handleRemoveCard = (card) => {
        if (card.card_type[0] === 1006 ||
            card.card_type[0] === 1007 ||
            card.card_type[0] === 1008){
                const pluckIndex = pluck_list.indexOf(card);
                const newPluckList = [...pluck_list];
                newPluckList.splice(pluckIndex, 1);
                setPluckList(newPluckList);
                if (card.picture_url === selectedCard){
                    setSelectedCard(null)
                }
        }else{
            const mainIndex = main_list.indexOf(card);
            const newMainList = [...main_list];
            newMainList.splice(mainIndex, 1);
            setMainList(newMainList);
            if (card.picture_url === selectedCard){
                setSelectedCard(null)
            }
        }
    }

    const clearMain = async() => {
        setMainList([]);
        const picture_urls = []
        for (let card of main_list){
            picture_urls.push(card.picture_url)
        }
        if (picture_urls.includes(selectedCard)){
            setSelectedCard(null);
        }
    }

    const clearPluck = async() => {
        setPluckList([]);
        const picture_urls = []
        for (let card of pluck_list){
            picture_urls.push(card.picture_url)
        }
        if (picture_urls.includes(selectedCard)){
            setSelectedCard(null);
        }
    }

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...deck};
        const main = []
        const pluck = []
        for (let card of main_list){
            main.push(card.card_number)
        }
        for (let card of pluck_list){
            pluck.push(card.card_number)
        }
        data["cards"] = main;
        data["pluck"] = pluck;
        data["strategies"] = selectedList
        account ? data["account_id"] = account.id : data["account_id"] = deck.account_id

        const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(cardUrl, fetchConfig);
        if (response.ok) {
            const responseData = await response.json();
            const deck_id = responseData.id;
            setDeck({
                name: "",
                account_id: "",
                description: "",
                strategies: [],
                cards: [],
                pluck: [],
                side: [],
                views: 0,
                cover_card: "",
                parent_id: "",
            });
            navigate(`/decks/${deck_id}`);
        } else {
            alert("Error in creating deck");
        }
    }

    const handleShowPool = (event) => {
        setShowPool(!showPool);
    };

    const handleShowMain = (event) => {
        setShowMain(!showMain);
    };

    const handleShowPluck = (event) => {
        setShowPluck(!showPluck);
    };

    const preprocessText = (text) => {
        return text.split("//").join("\n");
    };

    const isQueryEmpty = Object.values(query).every((value) => value === "");

    return (
        <div className="white-space">
            <h1 className="left-h1">Deck Builder</h1>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div
                        // style={{marginBottom: "45px", width: "435px"}}
                        id="create-deck-page">
                        <h2 className="left">Deck Details</h2>

                        <h5 className="label">Name </h5>
                        <input
                            className="builder-input"
                            type="text"
                            placeholder=" Deck Name"
                            onChange={handleChange}
                            name="name"
                            value={deck.name}>
                        </input>
                        <br/>
                        <h5 className="label">Cover Card</h5>
                        <select
                            className="builder-input"
                            type="text"
                            placeholder=" Cover Card"
                            onChange={handleCoverCardChange}
                            name="cover_card"
                            value={deck.cover_card}>
                            <option value="">Cover Card</option>
                            {uniqueList.sort((a,b) => a.card_number - b.card_number).map(function(card)
                            {return( <option value={card.picture_url} key={card.id + index.toString()}>{card.name}</option>)}
                                )}
                        </select>
                        <br/>
                        <h5 className="label"> Description </h5>
                        <textarea
                            className="builder-text"
                            type="text"
                            placeholder=" Deck Description"
                            onChange={handleChange}
                            name="description"
                            value={deck.description}>
                        </textarea>
                        <h5 className="label">Strategies </h5>
                        <h7 className="label"><em>hold ctrl/cmd to select more than one</em></h7>
                        <br/>
                        <select
                            className="builder-text"
                            multiple
                            name="strategies"
                            onChange={handleStrategyChange}
                            >
                            <option value="">Strategy</option>
                            <option value="Aggro">Aggro</option>
                            <option value="Combo">Combo</option>
                            <option value="Control">Control</option>
                            <option value="Mid-range">Mid-range</option>
                            <option value="Ramp">Ramp</option>
                            <option value="Second Wind">Second Wind</option>
                            <option value="Stall">Stall</option>
                            <option value="Toolbox">Toolbox</option>
                            <option value="other">other</option>
                        </select>
                        <br/>
                        <input
                                        style={{margin: "20px 5px 9px 5px", height:"10px"}}
                            id="private"
                            type="checkbox"
                            onChange={handleCheck}
                            name="private"
                            checked={deck.private}>
                        </input>
                        <label for="private"
                            className="bold"
                        >
                            Make my decks private
                        </label>
                        <br/>
                        {account?
                            <button
                                className="left"
                                style={{ marginTop: "9px"}}
                                onClick={handleSubmit}
                            >
                                Create Deck
                            </button>:
                            <button
                            className="left"
                            style={{ marginTop: "9px"}}
                            >
                                Create Deck
                            </button>
                        }
                        <button
                            className="left red"
                            style={{ marginTop: "9px"}}
                            onClick={clearMain}
                        >
                            Clear Main
                        </button>
                        <button
                            className="left red"
                            style={{ marginTop: "9px"}}
                            onClick={clearPluck}
                        >
                            Clear Pluck
                        </button>
                        <br/>
                        { !account?
                            <h6 className="error">You must be logged in to create a deck</h6>:
                        null
                        }
                    </div>
                    <div>
                        <h2 className="left">Cover Card</h2>
                        {selectedCard ? (
                            <img
                                className="cover-card"
                                src={selectedCard}
                                alt={selectedCard.name}
                                variant="bottom"/>
                                ):(
                            <img
                                className="cover-card"
                                src={"https://i.imgur.com/krY25iI.png"}
                                alt="Card"
                                variant="bottom"/>)}
                    </div>

                    <BuilderCardSearch/>
                </div>

                <div className={showPool ? "cardpool" : "no-cardpool"}>
                    <div style={{marginLeft: "0px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0px 1% 20px", fontWeight: "700"}}
                            >{usePool? "All Cards":"Pulled Cards"}</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                            {all_cards.length > 0 ?
                                <h5
                                    className="left db-pool-count"
                                >{all_cards.length}</h5>:
                                null}
                            { showPool ?
                                <h5 className="left db-pool-count"
                                    onClick={() => handleShowPool()}>
                                        &nbsp;[Hide]
                                </h5> :
                                <h5 className="left db-pool-count"
                                    onClick={() => handleShowPool()}>
                                    &nbsp;[Show]
                                </h5>}
                                <h5 className="left db-pool-count"
                                    style={{marginLeft: "8px"}}
                                    onClick={() => handleUsePool()}>
                                    {usePool? "[Use Pulls]" : "[Use All Cards]"}
                                </h5>
                        </div>
                        <div className={showPool ? "scrollable" : "hidden2"}>
                            <div style={{margin: "8px"}}>

                            { usePool && all_cards.length == 0 && isQueryEmpty && !noCards?
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                </div> :
                            null}

                            { !usePool && all_cards.length == 0 && isQueryEmpty && !noPulledCards?
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                </div> :
                            null}

                            { !usePool && all_cards.length == 0 && isQueryEmpty && noPulledCards?
                                <div className="inScrollable">
                                    <NavLink to="/cardsets"
                                        className="black-white nav-link">
                                        <div>
                                            <h1>No pulled cards</h1>
                                            <h1 >Click here for Card Set Search</h1>
                                        </div>
                                    </NavLink>
                                </div>
                                : null
                            }

                            <div className="card-pool-fill">
                                {all_cards.slice(0, showMore).map((card) => {
                                    return (
                                        <div style={{display: "flex", justifyContent: "center"}}>
                                            <img
                                                onClick={() => handleClick(card)}
                                                className={uniqueList.includes(card) ? "selected builder-card pointer glow3" : "builder-card pointer glow3"}
                                                title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                        </div>
                                    );
                                })}
                            </div>
                            </div>
                            {showMore < all_cards.length ?
                                <button
                                    style={{ width: "97%", margin:".5% 0% .5% 1.5%"}}
                                    onClick={handleShowMore}>
                                    Show More Cards ({all_cards.length - showMore} Remaining)
                                </button> : null }
                        </div>
                    </div>
                </div>
                {listView?
                <div className="deck-list">
                    <div className="maindeck3">
                        <ListViewListInput
                            title={"Main Deck"}
                            list={main_list}
                            handleRemoveCard={handleRemoveCard}
                        />
                    </div>

                    <div className="pluckdeck3">
                        <ListViewListInput
                            title={"Pluck Deck"}
                            list={pluck_list}
                            handleRemoveCard={handleRemoveCard}
                        />
                    </div>
                </div>
                :<>
                <div className="maindeck">
                    <ImageViewListInput
                        title={"Main Deck"}
                        list={main_list}
                        showList={showMain}
                        handleShowList={handleShowMain}
                        handleRemoveCard={handleRemoveCard}
                    />
                </div>

                <div className="pluckdeck">
                    <ImageViewListInput
                        title={"Pluck Deck"}
                        list={pluck_list}
                        showList={showPluck}
                        handleShowList={handleShowPluck}
                        handleRemoveCard={handleRemoveCard}
                    />

                </div>
            </>}
        </div>
    );
}


export default DeckBuilder;
