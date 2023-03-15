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
                card_number: 0,
                enthusiasm: 0,
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
            card_number: 0,
            enthusiasm: 0,
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
        <Container style={{marginLeft: "45%"}}>
            <h1 className="left-h1">Card Create</h1>
            <h5 className="label">Name </h5>
            <input
                type="text"
                placeholder=" Card Name"
                onChange={handleChange}
                name="name"
                value={card.name}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
            </input>
            <br/>
            <h5 className="label">Hero ID</h5>
            <input
                type="text"
                placeholder=" Hero ID"
                onChange={handleChange}
                name="hero_id"
                value={card.hero_id}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
            </input>
            <br/>
            <h5 className="label">Series </h5>
            <input
                type="text"
                placeholder=" Series"
                onChange={handleChange}
                name="series_name"
                value={card.series_name}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
            </input>
            <br/>
            <h5 className="label">Card Number </h5>
            <input
                type="number"
                placeholder=" Card Number"
                onChange={handleChange}
                name="card_number"
                value={card.card_number}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
            </input>
            <br/>
            <h5 className="label">Illustrator </h5>
            <input
                type="text"
                placeholder=" Illustrator"
                onChange={handleChange}
                name="illustrator"
                value={card.illustrator}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
            </input>
            <br/>
            <h5 className="label">Picture Url </h5>
            <input
                type="text"
                placeholder=" Picture Url"
                onChange={handleChange}
                name="picture_url"
                value={card.picture_url}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
            </input>
            <br/>
            <Button
                style={{margin: "4% 2% 2% 1%", width: "100px"}}
                variant="dark"
                size="lg"
                onClick={handleSubmit}
            >
                    Create
            </Button>
            <Button
                style={{margin: "4% 2% 2% 1%", width: "100px"}}
                variant="danger"
                size="lg"
                onClick={handleClear}
            >
                    Reset
            </Button>
        </Container>
        <Container style={{marginTop: "20px"}}>
            <h5 className="label">Card Class </h5>
            <select
                type="text"
                placeholder=" Class"
                onChange={handleChange}
                name="card_class"
                value={card.card_class}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
                <option value="">Class</option>
                <option value="staunch">Staunch</option>
                <option value="power">Power</option>
                <option value="unity">Unity</option>
                <option value="canny">Canny</option>
            </select>
            <h5 className="label">Enthusiasm </h5>
            <input
                type="number"
                placeholder=" Enthusiasm"
                onChange={handleChange}
                name="enthusiasm"
                value={card.enthusiasm}
                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
            </input>
            <br/>
            <h5 className="label">Effect Text </h5>
            <textarea
                type="text"
                placeholder=" Effect Text"
                onChange={handleChange}
                name="effect_text"
                value={card.effect_text}
                style={{width: "370px", height: "148px", margin: "5px 5px 0px 5px"}}>
            </textarea>
            <br/>
            <h5 className="label">Second Effect Text </h5>
            <textarea
                type="text"
                placeholder=" Second Effect Text"
                onChange={handleChange}
                name="second_effect_text"
                value={card.second_effect_text}
                style={{width: "370px", height: "148px", margin: "5px 5px 0px 5px"}}>
            </textarea>
            <br/>
        </Container>

        </form>
    </div>
  )
}


export default CardCreatePage;
