import {
    Button,
    Container,
} from "react-bootstrap";
import React, { useState, useEffect } from 'react'


function CardCreatePage() {
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

    const [card_types, setCardTypes] = useState([]);
    const [extra_effects, setExtraEffects] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [card_tags, setCardTags] = useState([]);

    const getCardTypes = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/card_types/`);
        const cardTypeData = await response.json();

        setCardTypes(cardTypeData.card_types);
    };

    const getExtraEffects = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/extra_effects/`);
        const extraEffectData = await response.json();

        setExtraEffects(extraEffectData.extra_effects);
    };

    const getReactions = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/reactions/`);
        const reactionData = await response.json();

        setReactions(reactionData.reactions);
    };

    const getCardTags = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/tags/`);
        const cardTagData = await response.json();

        setCardTags(cardTagData.card_tags);
    };

    useEffect(() => {
        getCardTypes();
        getExtraEffects();
        getReactions();
        getCardTags();
    }, []);

    const handleChange = (event) => {
        setCard({ ...card, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...card};
        data["card_number"] = parseInt(card["card_number"], 10);
        data["enthusiasm"] = parseInt(card["enthusiasm"], 10);
        console.log(data)
        const card_number = data["card_number"]

        const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(cardUrl, fetchConfig);
        if (response.ok) {
            await response.json();
            setCard({
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
        };
            window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
    };
    const handleClear = (async (event) => {
        event.preventDefault();
        setCard({
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
    });


    return (
    <div className="white-space">
        <form
            onSubmit={handleSubmit}
            id="create-card-page"
            style={{display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
        <Container style={{width: "40%"}}>
            <h1 className="left-h1">Card Create</h1>
            <h5 className="label">Name </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Card Name"
                onChange={handleChange}
                name="name"
                value={card.name}>
            </input>
            <br/>
            <h5 className="label">Hero ID</h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Hero ID"
                onChange={handleChange}
                name="hero_id"
                value={card.hero_id}>
            </input>
            <br/>
            <h5 className="label">Series </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Series"
                onChange={handleChange}
                name="series_name"
                value={card.series_name}>
            </input>
            <br/>
            <h5 className="label">Card Number </h5>
            <input
                className="builder-input"
                type="number"
                placeholder=" Card Number"
                onChange={handleChange}
                name="card_number"
                value={card.card_number}>
            </input>
            <br/>
            <h5 className="label">Illustrator </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Illustrator"
                onChange={handleChange}
                name="illustrator"
                value={card.illustrator}>
            </input>
            <br/>
            <h5 className="label">Picture Url </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Picture Url"
                onChange={handleChange}
                name="picture_url"
                value={card.picture_url}>
            </input>
            <br/>
            <h5 className="label">File Name </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" File Name"
                onChange={handleChange}
                name="file_name"
                value={card.file_name}>
            </input>
            <br/>
        </Container>
        <Container style={{margin:"3.5% 0% 2.5% 10%"}}>
            <h5 className="label">Card Class </h5>
            <select
                className="builder-input"
                type="text"
                placeholder=" Class"
                onChange={handleChange}
                name="card_class"
                value={card.card_class}>
                <option value="">Class</option>
                <option value="Staunch">Staunch</option>
                <option value="Power">Power</option>
                <option value="Unity">Unity</option>
                <option value="Canny">Canny</option>
            </select>
            <h5 className="label">Enthusiasm </h5>
            <input
                className="builder-input"
                type="number"
                placeholder=" Enthusiasm"
                onChange={handleChange}
                name="enthusiasm"
                value={card.enthusiasm}>
            </input>
            <br/>
            <h5 className="label">Effect Text </h5>
            <textarea
                className="create-card-text"
                type="text"
                placeholder=" Effect Text"
                onChange={handleChange}
                name="effect_text"
                value={card.effect_text}>
            </textarea>
            <br/>
            <h5 className="label">Second Effect Text </h5>
            <textarea
                className="create-card-text"
                type="text"
                placeholder=" Second Effect Text"
                onChange={handleChange}
                name="second_effect_text"
                value={card.second_effect_text}>
            </textarea>
            <br/>
            <Button
                className="add-comp-button"
                variant="dark"
                onClick={handleSubmit}
            >
                    Create
            </Button>
            <Button
                className="add-comp-button"
                variant="danger"
                onClick={handleClear}
            >
                    Reset
            </Button>
        </Container>

        </form>
    </div>
  )
}


export default CardCreatePage;
