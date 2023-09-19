import { useState, useEffect } from "react";



function GameDecks() {

    const [decks, setDecks] = useState([]);

    const getDecks = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/game_decks/`);
        const data = await response.json();

        setDecks(data);
    };

    useEffect(() => {
        getDecks();
    }, []);


    return(
        <div className="white-space">
            <div>
                {decks.map((card) => {
                    return (
                        <>
                            <p>{card}</p>
                            <br/>
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default GameDecks;
