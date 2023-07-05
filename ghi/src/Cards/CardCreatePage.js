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

    const [card_type, setCardType] = useState([]);
    const [extra_effects, setExtraEffects] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [card_tags, setCardTags] = useState([]);

    const [cardTypeList, setCardTypeList] = useState([]);
    const [extraEffectList, setExtraEffectList] = useState([]);
    const [reactionList, setReactionList] = useState([]);
    const [cardTagList, setCardTagList] = useState([]);

    const [cardTypeInput, setCardTypeInput] = useState("");
    const [extraEffectInput, setExtraEffectInput] = useState("");
    const [reactionInput, setReactionInput] = useState("");
    const [cardTagInput, setCardTagInput] = useState("");

    const getCardTypes = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/card_types/`);
        const cardTypeData = await response.json();

        setCardTypeList(cardTypeData.card_types.sort((a,b) => a.type_number - b.type_number));
    };

    const getExtraEffects = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/extra_effects/`);
        const extraEffectData = await response.json();

        setExtraEffectList(extraEffectData.extra_effects.sort((a,b) => a.effect_number - b.effect_number));
    };

    const getReactions = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/reactions/`);
        const reactionData = await response.json();

        setReactionList(reactionData.reactions.sort((a,b) => a.reaction_number - b.reaction_number));
    };

    const getCardTags = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/tags/`);
        const cardTagData = await response.json();

        setCardTagList(cardTagData.card_tags.sort((a,b) => a.tag_number - b.tag_number));
    };

    useEffect(() => {
        getCardTypes();
        getExtraEffects();
        getReactions();
        getCardTags();

        document.title = "Card Create - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    const handleChange = (event) => {
        setCard({ ...card, [event.target.name]: event.target.value });
    };

    // const handleAddCardType = () => {
    //     if (cardTypeInput) {
    //         setCardType([...cardType, cardTypeInput]);
    //         setCardTypeInput("");
    //     }
    // };

    // const handleAddExtraEffect = () => {
    //     if (extraEffectsInput) {
    //         setExtraEffects([...extraEffects, extraEffectsInput]);
    //         setExtraEffectsInput("");
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...card};
        data["card_number"] = parseInt(card["card_number"], 10);
        data["enthusiasm"] = parseInt(card["enthusiasm"], 10);
        console.log(data)
        data["card_type"] = card_type
        data["extra_effects"] = extra_effects
        data["reactions"] = reactions
        data["card_tag"] = card_tags
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
            <h5 className="label">Card Type </h5>
                <select
                    className="builder-input"
                    type="text"
                    // onChange={handleTypeChange}
                    name="card_type"
                    value={cardTypeInput}>
                    <option value="">Card Type</option>
                    {cardTypeList.map((card_type) => (
                        <option value={card_type.id}>{card_type.name}</option>
                        ))}
                </select>
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
            <h5 className="label">Extra Effect </h5>
                <select
                    className="builder-input"
                    type="text"
                    // onChange={handleEffectChange}
                    name="extra_effect"
                    value={extraEffectInput}>
                    <option value="">Extra Effect</option>
                    {extraEffectList.map((extra_effect) => (
                        <option value={extra_effect.id}>{extra_effect.name}</option>
                        ))}
                </select>
            <br/>
            <h5 className="label">Reaction </h5>
                <select
                    className="builder-input"
                    type="text"
                    // onChange={handleReactionChange}
                    name="reaction"
                    value={reactionInput}>
                    <option value="">Reaction</option>
                    {reactionList.map((reaction) => (
                        <option value={reaction.id}>{reaction.name}</option>
                        ))}
                </select>
            <br/>
            <h5 className="label">Tag </h5>
                <select
                    className="builder-input"
                    type="text"
                    // onChange={handleTagChange}
                    name="card_tag"
                    value={cardTagInput}>
                    <option value="">Tag</option>
                    {cardTagList.map((card_tag) => (
                        <option value={card_tag.id}>{card_tag.name}</option>
                        ))}
                </select>
            <br/>
            <button
                className="add-comp-button"
                variant="dark"
                onClick={handleSubmit}
            >
                    Create
            </button>
            <button
                className="add-comp-button red"
                variant="danger"
                onClick={handleClear}
            >
                    Reset
            </button>
        </Container>

        </form>
    </div>
  )
}


export default CardCreatePage;
