import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";
import { shortenedText } from "../../Helpers";

function CardTypesPage() {

    const { account } = useContext(AuthContext)

    const [cardTypes, setCardTypes ] = useState([]);

    const getCardTypes = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/card_types/`);
        const data = await response.json();
        const sortedData = [...data.card_types].sort((a,b) => a.name.localeCompare(b.name));
        setCardTypes(sortedData.filter(item => item.tag_number !== 1000));
    };

    useEffect(() => {
        getCardTypes();
        document.title = "Card Types - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);


    return (
        <div className="white-space">
            <h1 className="left-h1">Card Types</h1>

            { account && account.roles.includes("admin")?
                <NavLink to="/cardtypecreate">
                    <button
                        className="left red">
                        Create
                    </button>
                </NavLink>:
            null}

            <div>
                {cardTypes.map(function(cardType, index, arr) {
                        return (
                            <NavLink to={`/cardtypes/${cardType.id}`} className="nav-link glow2 no-pad" key={cardType.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 className="text-table">{cardType.name}</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-table-2">{shortenedText(cardType.description)}</h5>
                                    </div>
                                </div>
                        </NavLink>
                    );
                })}
            </div>

        </div>
    );
}

export default CardTypesPage;