import {
    Col,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink, useParams} from 'react-router-dom';
import BackButton from "../display/BackButton";


function PullPage() {

    const {card_set_id} = useParams();
    const [boosterSet, setBoosterSet] = useState("");
    const [maxVariables, setMaxVariables] = useState([]);
    const [normals, setNormals] = useState([]);
    const [rares, setRares] = useState([]);
    const [superRares, setSuperRares] = useState([]);
    const [ultraRares, setUltraRares] = useState([]);
    const [date_created, setDateCreated] = useState([]);
    const [num, setNum] = useState("");
    const [pulls, setPulls] = useState([]);

    const [listView, setListView] = useState(false);

    const getBoosterSet = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/booster_sets/${card_set_id}`);
        const boosterSetData = await response.json();
        setDateCreated(boosterSetData.created_on.date_created)
        setUltraRares(boosterSetData.ultra_rares)
        setSuperRares(boosterSetData.super_rares)
        setRares(boosterSetData.rares)
        setNormals(boosterSetData.normals)
        setMaxVariables(boosterSetData.mv)
        setBoosterSet(boosterSetData);
    };

    const getPulls = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/booster_sets/${card_set_id}/open/${num}`);
        const pullData = await response.json();
        console.log(pullData.pulls)
        const pulls = []
        for (let pull of pullData.pulls) {
            pulls.push(pull.pulled_cards)
        }
        setPulls(pulls)
    }

    useEffect(() => {
        getBoosterSet();
        document.title = `${boosterSet.name} - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    },[]);

    const handleListView = (event) => {
        setListView(!listView);
    };

    const handleChangeNum = (event) => {
        setNum(event.target.value)
    };

    const handleSubmit = (event) => {
        if (num) {
            getPulls();
            console.log(pulls)
        } else {
            alert("No number of packs selected")
        }
    };

    const findUltra = (pull) => {
        for (let card of pull) {
            if (ultraRares.includes(card.card_number)) {
                return true
            }
        }
    }

    return (
        <div className="white-space">
            <Card className="text-white text-center card-list-card3" style={{margin: "2% 0%" }}>
                <div className="card-image-wrapper">
                    <div className="card-image-clip2">
                        <Card.Img
                            src={boosterSet.cover_image ? boosterSet.cover_image : "https://i.imgur.com/8wqd1sD.png"}
                            alt={boosterSet.name}
                            className="card-image2"
                            variant="bottom"/>
                    </div>
                </div>
                <Card.ImgOverlay className="blackfooter2 mt-auto">
                        <h3 className="left cd-container-child">{boosterSet.name}</h3>
                        <h6 className="left"
                            style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                        >
                            Ultra Rares: {ultraRares.length} &nbsp; Super Rares: {superRares.length} &nbsp;
                            Rares: {rares.length} &nbsp; Normals: {normals.length} &nbsp; Max Variables: {maxVariables.length}
                        </h6>
                        <div style={{ display: "flex" }}>
                            <img className="logo2" src="https://i.imgur.com/nIY2qSx.png" alt="created on"/>
                            <h6
                            className="left justify-content-end"
                                style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                            >
                                {date_created}
                            </h6>
                        </div>
                </Card.ImgOverlay>
            </Card>

            {boosterSet.description ?
            <div>
                <h5 className="left-h1"
                    style={{marginTop: "0"}}
                    >{boosterSet.description}</h5>
            </div>:
            null}

            <div style={{ display: "flex" }}>
                <input
                    className="left dcbsearch-medium"
                    type="text"
                    placeholder=" Number of Packs"
                    onChange={handleChangeNum}
                    value={num}>
                </input>
                <button
                    className="left"
                    onClick={handleSubmit}>
                        Open
                </button>
                {listView?
                    <button
                        className="left"
                        onClick={handleListView}
                    >
                        Image View
                    </button>:
                    <button
                        className="left"
                        onClick={handleListView}
                    >
                        List View
                    </button>}
                <BackButton/>
            </div>

            { pulls.map((pull, pullIndex) => {
                return (
                    <div className="rarities">
                        <div style={{marginLeft: "20px"}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <h2
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                > Pull {pullIndex + 1}</h2>
                            { findUltra(pull) === true ?
                                    <h2
                                        className="rainbow rainbow_text_animated"
                                        style={{margin: "1% 0%", fontWeight: "700"}}
                                    >&nbsp; Ultra Rare Detected!!</h2>:
                                    null
                            }
                            </div>
                                <Row xs="auto" className="justify-content-start" style={{marginBottom: "8px"}}>
                                    {pull.map((card) => {
                                        return (
                                            <Col style={{padding: "5px"}}>
                                                <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                                    {ultraRares.includes(card.card_number) ?
                                                        <div className="ultra">
                                                            <img
                                                                className="builder-card4"
                                                                title={card.name}
                                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                                alt={card.name}
                                                                variant="bottom"/>
                                                        </div>:
                                                        <img
                                                            className="builder-card2"
                                                            title={card.name}
                                                            src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                            alt={card.name}
                                                            variant="bottom"/>
                                                    }
                                                </NavLink>
                                            </Col>
                                        );
                                    })}
                                </Row>
                        </div>
                    </div>
                )})
            }
        </div>
    )
}




export default PullPage;
