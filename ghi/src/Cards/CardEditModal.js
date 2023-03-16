import {
    Col,
    Row,
    Card,
    Button,
    Container,
    Modal,
} from "react-bootstrap";
import { useLocation, useParams} from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react'


function CardEditModal() {
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

    const getCard = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/`);
        const cardData = await response.json();

        setCard(cardData);
        console.log(cardData)
    };

    useEffect(() => {
        getCard();
    }, [card_number]);

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

        const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card.id}/`;
        const fetchConfig = {
            method: "PUT",
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
            window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
        } else {
            console.error("Error in updating card");
        }
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

        <div>
            <Button
                style={{margin: "0% 2% 2% 26%", width: "100px"}}
                onClick={handleShow}
                variant="danger"
                size="lg">
                Edit
            </Button>

            <Modal
                show={show}
                size="xl"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <h1 className="label" style={{marginLeft: "10.5%"}}>Card Edit</h1>
                </Modal.Header>
                <Modal.Body>

                    <form
                        onSubmit={handleSubmit}
                        id="create-card-page"
                        style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}
                    >
                        <Container style={{marginLeft: "18%"}}>
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
                                    Save
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
                        <Container style={{margin: "0% 0% 5% 9%"  }}>
                            <h5 className="label">Card Class </h5>
                            <select
                                type="text"
                                placeholder=" Class"
                                onChange={handleChange}
                                name="card_class"
                                value={card.card_class}
                                style={{width: "370px", height: "37px", margin: "5px 5px 0px 5px"}}>
                                <option value="">Class</option>
                                <option value="Staunch">Staunch</option>
                                <option value="Power">Power</option>
                                <option value="Unity">Unity</option>
                                <option value="Canny">Canny</option>
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

                </Modal.Body>
            </Modal>
        </div>
  )
}


export default CardEditModal;
