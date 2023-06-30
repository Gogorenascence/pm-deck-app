import {
    Button,
    Container,
    Modal,
} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react'


function CardAddCompModal() {
    const [card, setCard] = useState({
        name: "",
        card_class: "",
        hero_id: "",
        series_name: "",
        card_number: "",
        enthusiasm: "",
        effect_text: "",
        second_effect_text: "",
        illustrator: "",
        picture_url: "",
        file_name: "",
        card_type: [],
        extra_effects: [],
        reactions: [],
        card_tags: [],
    });

    const {card_number} = useParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [card_types, setCardTypes] = useState([]);
    const [extra_effects, setExtraEffects] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [card_tags, setCardTags] = useState([]);

    const [card_type, setCardType] = useState({ id: '' });
    const [extra_effect, setExtraEffect] = useState({ id: '' });
    const [reaction, setReaction] = useState({ id: '' });
    const [card_tag, setCardTag] = useState({ id: '' });

    const getCard = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/`);
        const cardData = await response.json();

        setCard(cardData);
    };

    const getCardTypes = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/card_types/`);
        const cardTypeData = await response.json();

        setCardTypes(cardTypeData.card_types.sort((a,b) => a.type_number - b.type_number));
    };

    const getExtraEffects = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/extra_effects/`);
        const extraEffectData = await response.json();

        setExtraEffects(extraEffectData.extra_effects.sort((a,b) => a.effect_number - b.effect_number));
    };

    const getReactions = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/reactions/`);
        const reactionData = await response.json();

        setReactions(reactionData.reactions.sort((a,b) => a.reaction_number - b.reaction_number));
    };

    const getCardTags = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/tags/`);
        const cardTagData = await response.json();

        setCardTags(cardTagData.card_tags.sort((a,b) => a.tag_number - b.tag_number));
    };

    useEffect(() => {
        getCard();
        getCardTypes();
        getExtraEffects();
        getReactions();
        getCardTags();
    // eslint-disable-next-line
    }, []);

    const handleTypeChange = (event) => {
        setCardType({ id: event.target.value });
    };

    const handleAddTypeSubmit = async (event) => {
        event.preventDefault();
        const addTypeUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/add_type/${card_type.id}/`;
        console.log(`${card_number}       ${card.id}       ${card_type.id}`)
        fetch(addTypeUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };
    const handleRemoveTypeSubmit = async (event) => {
        event.preventDefault();
        const removeTypeUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/remove_type/${card_type.id}/`;
        fetch(removeTypeUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };


    const handleEffectChange = (event) => {
        setExtraEffect({ id: event.target.value });
    };

    const handleAddEffectSubmit = async (event) => {
        event.preventDefault();
        const addEffectUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/add_extra/${extra_effect.id}/`;
        fetch(addEffectUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };
    const handleRemoveEffectSubmit = async (event) => {
        event.preventDefault();
        const removeEffectUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/remove_extra/${extra_effect.id}/`;
        fetch(removeEffectUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };


    const handleReactionChange = (event) => {
        setReaction({ id: event.target.value });
    };

    const handleAddReactionSubmit = async (event) => {
        event.preventDefault();
        const addReactionUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/add_reaction/${reaction.id}/`;
        fetch(addReactionUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };
    const handleRemoveReactionSubmit = async (event) => {
        event.preventDefault();
        const removeReactionUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/remove_reaction/${reaction.id}/`;
        fetch(removeReactionUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };


    const handleTagChange = (event) => {
        setCardTag({ id: event.target.value });
    };

    const handleAddTagSubmit = async (event) => {
        event.preventDefault();
        const addTagUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/add_tag/${card_tag.id}/`;
        fetch(addTagUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };
    const handleRemoveTagSubmit = async (event) => {
        event.preventDefault();
        const removeTagUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/remove_tag/${card_tag.id}/`;
        fetch(removeTagUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };


    return (

        <div>
            <Button
                className="button225"
                onClick={handleShow}
                variant="danger"
                size="lg">
                Change Components
            </Button>

            <Modal
                show={show}
                size="xl"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="topbar edit-modal"
            >
                <Modal.Header closeButton>
                    <h1 className="label" style={{marginLeft: "10.5%"}}>Change Card Components</h1>
                </Modal.Header>
                <div
                    style={{display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                    <Modal.Body>
                            <Container style={{marginLeft: "18%"}}>
                                <h5 className="label">Card Type </h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    onChange={handleTypeChange}
                                    name="card_type"
                                    value={card_type.id}>
                                    <option value="">Card Type</option>
                                    {card_types.map((card_type) => (
                                        <option value={card_type.id}>{card_type.name}</option>
                                        ))}
                                </select>
                                <br/>
                                <Button
                                    className="add-comp-button"
                                    variant="dark"
                                    size="lg"
                                    onClick={handleAddTypeSubmit}
                                >
                                        Add
                                </Button>
                                <Button
                                    className="add-comp-button"
                                    variant="danger"
                                    size="lg"
                                    onClick={handleRemoveTypeSubmit}
                                >
                                        Remove
                                </Button>
                            </Container>
                    </Modal.Body>
                    <Modal.Body>
                            <Container style={{marginLeft: "9%"}}>
                                <h5 className="label">Extra Effect </h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    onChange={handleEffectChange}
                                    name="extra_effect"
                                    value={extra_effect.id}>
                                    <option value="">Extra Effect</option>
                                    {extra_effects.map((extra_effect) => (
                                        <option value={extra_effect.id}>{extra_effect.name}</option>
                                        ))}
                                </select>
                                <br/>
                                <Button
                                    className="add-comp-button"
                                    variant="dark"
                                    size="lg"
                                    onClick={handleAddEffectSubmit}
                                >
                                        Add
                                </Button>
                                <Button
                                    className="add-comp-button"
                                    variant="danger"
                                    size="lg"
                                    onClick={handleRemoveEffectSubmit}
                                >
                                        Remove
                                </Button>
                            </Container>

                    </Modal.Body>
                    <Modal.Body>
                            <Container style={{marginLeft: "18%"}}>
                                <h5 className="label">Reaction </h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    onChange={handleReactionChange}
                                    name="reaction"
                                    value={reaction.id}>
                                    <option value="">Reaction</option>
                                    {reactions.map((reaction) => (
                                        <option value={reaction.id}>{reaction.name}</option>
                                        ))}
                                </select>
                                <br/>
                                <Button
                                    className="add-comp-button"
                                    variant="dark"
                                    size="lg"
                                    onClick={handleAddReactionSubmit}
                                >
                                        Add
                                </Button>
                                <Button
                                    className="add-comp-button"
                                    variant="danger"
                                    size="lg"
                                    onClick={handleRemoveReactionSubmit}
                                >
                                        Remove
                                </Button>
                            </Container>
                    </Modal.Body>
                    <Modal.Body>
                            <Container style={{margin: "0% 0% 5% 9%"}}>
                                <h5 className="label">Tag </h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    onChange={handleTagChange}
                                    name="card_tag"
                                    value={card_tag.id}>
                                    <option value="">Tag</option>
                                    {card_tags.map((card_tag) => (
                                        <option value={card_tag.id}>{card_tag.name}</option>
                                        ))}
                                </select>
                                <br/>
                                <Button
                                    className="add-comp-button"
                                    variant="dark"
                                    size="lg"
                                    onClick={handleAddTagSubmit}
                                >
                                        Add
                                </Button>
                                <Button
                                    className="add-comp-button"
                                    variant="danger"
                                    size="lg"
                                    onClick={handleRemoveTagSubmit}
                                >
                                        Remove
                                </Button>
                            </Container>

                    </Modal.Body>
                </div>
            </Modal>
        </div>
    )
}


export default CardAddCompModal;
