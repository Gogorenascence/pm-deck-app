import {
    Col,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink, useParams} from 'react-router-dom';
import BackButton from "../display/BackButton";


function SetDetailPage() {

    const {card_set_id} = useParams();
    const [boosterSet, setBoosterSet] = useState("");
    const [maxVariables, setMaxVariables] = useState([]);
    const [normals, setNormals] = useState([]);
    const [rares, setRares] = useState([]);
    const [superRares, setSuperRares] = useState([]);
    const [ultraRares, setUltraRares] = useState([]);
    const [date_created, setDateCreated] = useState([])

    const [listView, setListView] = useState(false);
    const [showMaxVariables, setShowMaxVariables] = useState(false);
    const [showNormals, setShowNormals] = useState(false);
    const [showRares, setShowRares] = useState(false);
    const [showSuperRares, setShowSuperRares] = useState(false);
    const [showUltraRares, setShowUltraRares] = useState(false);

    const [perPack, setPerPack] = useState(0)

    const getBoosterSet = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/booster_sets/${card_set_id}`);
        const boosterSetData = await response.json();
        const ratio = boosterSetData.ratio
        const perPack = ratio.normals + ratio.rares + ratio.supers + ratio.mv
        setDateCreated(boosterSetData.created_on.date_created)
        setPerPack(perPack)
        setBoosterSet(boosterSetData);
    };

    const getCardLists = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/booster_sets/${card_set_id}/list`);
        const listData = await response.json();
        setMaxVariables(listData.max_variables)
        setNormals(listData.normals)
        setRares(listData.rares)
        setSuperRares(listData.super_rares)
        setUltraRares(listData.ultra_rares)
    }

    useEffect(() => {
        getBoosterSet();
        getCardLists();
        console.log(normals)
        document.title = `Card Sets - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    },[]);

    const handleListView = (event) => {
        setListView(!listView);
    };

    const handleShowMaxVariables = (event) => {
        setShowMaxVariables(!showMaxVariables);
    };

    const handleShowNormals = (event) => {
        setShowNormals(!showNormals);
    };

    const handleShowRares = (event) => {
        setShowRares(!showRares);
    };

    const handleShowSuperRares = (event) => {
        setShowSuperRares(!showSuperRares);
    };

    const handleShowUltraRares = (event) => {
        setShowUltraRares(!showUltraRares);
    };

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
                        <h6 className="left"
                            style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                        >
                            {perPack} Cards Per Pack
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
                {/* <NavLink to={`/cards_sets/${boosterSet.id}/edit`}>
                    <button
                            className="left heightNorm button100 red"
                            variant="danger"
                            style={{marginLeft: ".5%", marginRight: "7px"}}
                            >
                            Edit Set
                    </button>
                </NavLink>
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
                    </button>} */}
                    <NavLink to={`/cards/card_sets/${boosterSet.id}/pulls`}>
                    <button
                            className="left heightNorm"
                            variant="danger"
                            style={{marginLeft: ".5%", marginRight: "7px", width:"120px"}}
                            >
                            Open Packs
                    </button>
                </NavLink>
                <BackButton/>
            </div>

            {/* {listView?
                        <div className="deck-list">
                            <div className="maindeck3">
                            <div style={{marginLeft: "20px"}}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <h2
                                        className="left"
                                        style={{margin: "2% 0% 1% 0%", fontWeight: "700"}}
                                    >Main Deck</h2>
                                    <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                    {main_list.length > 0 ?
                                    <h5
                                        className="left db-main-count"
                                    >{main_list.length}</h5>:
                                    null}
                                </div>
                                {main_list.length > 0 ?<>
                                        {countedMainList.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                            return (
                                                <Col style={{padding: "5px"}}>
                                                    <div className="card-container">
                                                    <h5>{card.name} x <b>{card.count}</b></h5>
                                                        <img
                                                            className="card-image"
                                                            src={card.picture_url}
                                                            alt={card.name}
                                                        />
                                                    </div>
                                                </Col>
                                            );
                                        })}
                                    </>:
                                <h4 className="left no-cards">No cards added</h4>}
                            </div>
                        </div>

                        <div className="pluckdeck3">
                            <div style={{marginLeft: "20px"}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                    <h2
                                        className="left"
                                        style={{margin: "2% 0% 1% 0%", fontWeight: "700"}}
                                    >Pluck Deck</h2>
                                    <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                    {pluck_list.length > 0 ?
                                    <h5
                                        className="left db-pluck-count"
                                    >{pluck_list.length}</h5>:
                                    null}
                                </div>
                                {pluck_list.length > 0 ?<>
                                        {countedPluckList.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                            return (
                                                <Col style={{padding: "5px"}}>
                                                    <div className="card-container">
                                                    <h5>{card.name} x <b>{card.count}</b></h5>
                                                        <img
                                                            className="card-image"
                                                            src={card.picture_url}
                                                            alt={card.name}
                                                        />
                                                    </div>
                                                </Col>
                                            );
                                        })}
                                    </>:
                                <h4 className="left no-cards">No cards added</h4>}
                            </div>
                        </div>
                    </div>
            :<> */}
                <div className="rarities">
                    <div style={{marginLeft: "20px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0%", fontWeight: "700"}}
                            >Ultra Rares</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                            {ultraRares.length > 0 ?
                            <h5
                                className="left db-main-count"
                            >{ultraRares.length}</h5>:
                            null}
                            { showUltraRares ?
                                <h5 className={ultraRares.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowUltraRares()}>
                                        &nbsp;[Hide]
                                </h5> :
                                <h5 className={ultraRares.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowUltraRares()}>
                                    &nbsp;[Show]
                                </h5>}
                        </div>
                        {ultraRares.length > 0 ?
                            <Row xs="auto" className={showUltraRares ? "justify-content-start" : "hidden2"} style={{marginBottom: "8px"}}>
                                {ultraRares.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                            <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                                <div className="ultra">
                                                    <img
                                                        className="builder-card4"
                                                        title={card.name}
                                                        src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                        alt={card.name}
                                                        variant="bottom"/>
                                                </div>
                                            </NavLink>
                                        </Col>
                                    );
                                })}
                            </Row>:
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                </div>

                <div className="rarities">
                    <div style={{marginLeft: "20px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0%", fontWeight: "700"}}
                            >Super Rares</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                            {superRares.length > 0 ?
                            <h5
                                className="left db-main-count"
                            >{superRares.length}</h5>:
                            null}
                            { showSuperRares ?
                                <h5 className={superRares.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowSuperRares()}>
                                        &nbsp;[Hide]
                                </h5> :
                                <h5 className={superRares.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowSuperRares()}>
                                    &nbsp;[Show]
                                </h5>}
                        </div>
                        {superRares.length > 0 ?

                            <Row xs="auto" className={showSuperRares ? "justify-content-start" : "hidden2"} style={{marginBottom: "8px"}}>
                                {superRares.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                            <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                                <img
                                                    className="builder-card2"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                            </NavLink>
                                        </Col>
                                    );
                                })}
                            </Row>:
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                </div>

                <div className="rarities">
                    <div style={{marginLeft: "20px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0%", fontWeight: "700"}}
                            >Rares</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                            {rares.length > 0 ?
                            <h5
                                className="left db-main-count"
                            >{rares.length}</h5>:
                            null}
                            { showRares ?
                                <h5 className={rares.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowRares()}>
                                        &nbsp;[Hide]
                                </h5> :
                                <h5 className={rares.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowRares()}>
                                    &nbsp;[Show]
                                </h5>}
                        </div>
                        {rares.length > 0 ?

                            <Row xs="auto" className={showRares ? "justify-content-start" : "hidden2"} style={{marginBottom: "8px"}}>
                                {rares.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                            <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                                <img
                                                    className="builder-card2"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                            </NavLink>
                                        </Col>
                                    );
                                })}
                            </Row>:
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                </div>

                <div className="rarities">
                    <div style={{marginLeft: "20px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0%", fontWeight: "700"}}
                            >Normals</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                            {normals.length > 0 ?
                            <h5
                                className="left db-main-count"
                            >{normals.length}</h5>:
                            null}
                            { showNormals ?
                                <h5 className={normals.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowNormals()}>
                                        &nbsp;[Hide]
                                </h5> :
                                <h5 className={normals.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowNormals()}>
                                    &nbsp;[Show]
                                </h5>}
                        </div>
                        {normals.length > 0 ?

                            <Row xs="auto" className={showNormals ? "justify-content-start" : "hidden2"} style={{marginBottom: "8px"}}>
                                {normals.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                            <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                                <img
                                                    className="builder-card2"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                            </NavLink>
                                        </Col>
                                    );
                                })}
                            </Row>:
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                </div>

                <div className="rarities">
                    <div style={{marginLeft: "20px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0%", fontWeight: "700"}}
                            >Max Variables</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                            {maxVariables.length > 0 ?
                            <h5
                                className="left db-main-count"
                            >{maxVariables.length}</h5>:
                            null}
                            { showMaxVariables ?
                                <h5 className={maxVariables.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowMaxVariables()}>
                                        &nbsp;[Hide]
                                </h5> :
                                <h5 className={maxVariables.length > 0 ? "left db-main-count" : "hidden2"}
                                    onClick={() => handleShowMaxVariables()}>
                                    &nbsp;[Show]
                                </h5>}
                        </div>
                        {maxVariables.length > 0 ?

                            <Row xs="auto" className={showMaxVariables ? "justify-content-start" : "hidden2"} style={{marginBottom: "8px"}}>
                                {maxVariables.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                            <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                                <img
                                                    className="builder-card2"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                            </NavLink>
                                        </Col>
                                    );
                                })}
                            </Row>:
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                </div>
                {/* <div className="pluckdeck">
                    <div style={{marginLeft: "20px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0%", fontWeight: "700"}}
                            >Pluck Deck</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                            {pluck_list.length > 0 ?
                            <h5
                                className="left db-pluck-count"
                            >{pluck_list.length}</h5>:
                            null}
                            { showPluck ?
                                <h5 className={pluck_list.length > 0 ? "left db-pluck-count" : "hidden2"}
                                    onClick={handleShowPluck}
                                >
                                    &nbsp;[Hide]
                                </h5> :
                                <h5 className={pluck_list.length > 0 ? "left db-pluck-count" : "hidden2"}
                                    onClick={handleShowPluck}
                                >
                                    &nbsp;[Show]
                                </h5>}
                        </div>
                        {pluck_list.length > 0 ?
                            <Row xs="auto" className={showPluck ? "justify-content-start": "hidden2"} style={{marginBottom: "8px"}}>
                                {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <Col style={{padding: "5px"}}>
                                            <img
                                            className="builder-card2"
                                                style={{ width: '140px',
                                                        margin: '2.25px 0px',
                                                        borderRadius: "7px",
                                                        overflow: "hidden"}}

                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>

                                        </Col>
                                    );
                                })}
                            </Row> :
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                </div> */}
            {/* </>} */}
    </div>
    );
}


export default SetDetailPage;