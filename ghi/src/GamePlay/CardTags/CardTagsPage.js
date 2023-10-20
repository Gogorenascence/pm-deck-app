import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";

function CardTagsPage() {

    const { account } = useContext(AuthContext)

    const [cardTags, setCardTags ] = useState([]);

    const getCardTags = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/tags/`);
        const data = await response.json();
        const sortedData = [...data.card_tags].sort((a,b) => a.name.localeCompare(b.name));
        setCardTags(sortedData.filter(item => item.tag_number !== 1000));
    };

    useEffect(() => {
        getCardTags();
        document.title = "Card Tags - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);


    return (
        <div className="white-space">
            <h1 className="left-h1">Card Tags</h1>

            { account && account.roles.includes("admin")?
                <NavLink to="/cardtagcreate">
                    <button
                        className="left red">
                        Create
                    </button>
                </NavLink>:
            null}

            <div>
                {cardTags.map(function(cardTag, index, arr) {
                        return (
                            <NavLink to={`/cardtags/${cardTag.id}`} className="nav-link glow2 no-pad" key={cardTag.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 className="text-table">{cardTag.name}</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-table-2">{cardTag.rules}</h5>
                                    </div>
                                </div>
                            </NavLink>
                    );
                })}
            </div>

        </div>
    );
}

export default CardTagsPage;
