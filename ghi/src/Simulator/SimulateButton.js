import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { GameStateContext } from '../context/GameStateContext';

const SimulateButton = ({deckName, main_list, pluck_list}) => {
    const {
        setPlayer,
        setPlayerMainDeck,
        setPlayerPluckDeck
    } = useContext(GameStateContext)
    const navigate = useNavigate()

    const handleSimulator = () => {
        setPlayer({
            name: "WindFall",
            HP: 16,
            mainDeck: [],
            pluckDeck: [],
            hand: [],
            ownership: [],
            mainDiscard: [],
            pluckDiscard: [],
            playArea:"",
            activePluck: "",
            focus: 0,
            enthusiasm: 0,
            mettle: 0,
            secondWind: false,
        })
        setPlayerMainDeck({
            name: deckName + " Main",
            cards: main_list
        })
        setPlayerPluckDeck({
            name: deckName + " Pluck",
            cards: pluck_list
        })
        navigate(`/simulator`)
    }

    return (
        <button
            onClick={handleSimulator}
            className="left"
        >
            Simulate
        </button>
    );
};

export default SimulateButton;
