import { useState, useEffect } from "react";

function CardSearch(){

    const [cards, setCards] = useState([]);
    const [query, setQuery] = useState("")

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        setCards(data.cards);
    };


    useEffect(() => {
        getCards();
    })

}
