import {
    Button,
    Modal,
} from "react-bootstrap";
import { useParams, NavLink} from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react'


function RelatedCardModal() {

    const {card_number} = useParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [relatedCards, setRelatedCards] = useState([]);

    const getRelatedCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/related_cards/`);
        const relatedData = await response.json();

        setRelatedCards(relatedData.cards.sort((a,b) => a.card_number - b.card_number));
    };

    useEffect(() => {
        getRelatedCards();
    }, []);


    return (

        <div>
            <Button
                style={{width: "170px", margin: "20px 2.5px 20px 2.5px"}}
                onClick={handleShow}
                variant="dark"
                size="lg">
                Show all Cards
            </Button>

            <Modal
                show={show}
                size="xl"
                onHide={handleClose}
                keyboard={false}
                className="topbar"
            >
                <Modal.Body closeButton>
                <h1 className="centered-h1">Related Cards</h1>
                <div style={{margin: "5px"}}>
                    {relatedCards.map((relatedCard) => {
                        return (
                            <NavLink to={`/cards/${relatedCard.card_number}`}>
                                    <img
                                        className="cd-related-card"
                                        style={{marginRight: "5px"}}
                                        title={relatedCard.name}
                                        src={relatedCard.picture_url ? relatedCard.picture_url : "logo4p.png"}
                                        alt="Related Card image"
                                        variant="bottom"/>
                            </NavLink>
                        );
                    })}
                </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}


export default RelatedCardModal;
