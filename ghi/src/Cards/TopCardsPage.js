import {
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

function TopCardsPage() {

    const [cards, setCards] = useState([]);

    const [listView, setListView] = useState(false);
    const [sortState, setSortState] = useState("none");

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/get_popular_cards/`);
        const data = await response.json();

        const sortedCards = [...data.cards].sort(sortMethods[sortState].method);

        const typedCards = []
        for (let card of sortedCards){
            if (card.card_type[0] === "64079ed6b2b376b6cd0454f5") {
                card["cardType"] = "Fighter"
            }
            else if (card.card_type[0] === "6407bb289b4fb23f5ddab698") {
                card["cardType"] = "Aura"
            }
            else if (card.card_type[0] === "6407a3bbc503d0c6f5a33238") {
                card["cardType"] = "Move"
            }
            else if (card.card_type[0] === "640ce41c5f6730657ad8739f") {
                card["cardType"] = "Ending"
            }
            else if (card.card_type[0] === "64108e0e159c81c7afebd105") {
                card["cardType"] = "Any Type"
            }
            else if (card.card_type[0] === "64108dee159c81c7afebd104") {
                card["cardType"] = "Item"
            }
            else if (card.card_type[0] === "640ce4bf5f6730657ad873be") {
                card["cardType"] = "Event"
            }
            else if (card.card_type[0] === "64108db9159c81c7afebd103") {
                card["cardType"] = "Comeback"
            }

            card["effectText"] = card.effect_text.split("//")

            if (card.second_effect_text){
                card["secondEffectText"] = card.second_effect_text.split("//")
            }

            typedCards.push(card)
        }
        setCards(typedCards);
        console.log(cards)

    };


    useEffect(() => {
        getCards();
    // eslint-disable-next-line
    },[]);

    const sortMethods = {
        none: { method: (a,b) => b.count.localeCompare(a.count) },
    };

    const handleListView = (event) => {
        setListView(!listView);
    };

    const all_cards = cards.sort(sortMethods[sortState].method)


    return (
        <div className="white-space">
            <h1 className="left-h1">Top Cards</h1>
            <h2 className="left">Most Commonly Used Cards - Excluding MAX VARIABLE!!</h2>
            {listView?
                <Button
                    className="left"
                    variant="dark"
                    onClick={handleListView}
                >
                    Image View
                </Button>:
                <Button
                    className="left"
                    variant="dark"
                    onClick={handleListView}
                >
                    List View
                </Button>}
            {listView?
                <div className="card-list3">
                    {all_cards.slice(0, 20).map(card => {
                        return (
                            <NavLink to={`/cards/${card.card_number}`} className="nav-link">
                                    <div className={card.card_class ? `big${card.card_class}2` : "bigNoClass2"}>
                                        <h3 style={{fontWeight: "600", margin: "12px"}}>{card.name}</h3>
                                        <h5 style={{fontWeight: "600", margin: "12px"}}>{card.card_class} {card.cardType}</h5>
                                        {card.effectText.map((line) =>
                                        <h6 style={{fontWeight: "400", margin: "3px 12px"}}>
                                            {line}</h6>)}
                                        {card.secondEffectText?
                                        <>{card.secondEffectText.map((line) =>
                                        <h6 style={{fontWeight: "400", margin: "12px 12px 3px 12px"}}>
                                            {line}</h6>)}</>
                                        :null}

                                    </div>
                            </NavLink>
                        );
                    })}
                </div>
            :
            <div className="card-list">
                {all_cards.slice(0, 20).map(card => {
                    return (
                        <NavLink to={`/cards/${card.card_number}`}>
                                <img className="card-list-card"
                                    title={card.name}
                                    src={card.picture_url ? card.picture_url : "logo4p.png"}
                                    alt={card.name}/>
                        </NavLink>
                    );
                })}
            </div>
            }
    </div>
    );
}

export default TopCardsPage;
