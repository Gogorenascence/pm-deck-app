import { useState, useEffect } from "react";

function CardsPage() {

    const [cards, setCards] = useState([]);

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        setCards(data);
    };

    useEffect(() => {
        getCards();
    })

    return (
        <div>

        </div>
    );
}

export default CardsPage;
