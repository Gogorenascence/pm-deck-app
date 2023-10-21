import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";
import { shortenedText } from "../../Helpers";


function ReactionsPage() {

    const { account } = useContext(AuthContext)

    const [reactions, setReactions ] = useState([]);

    const getReactions = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/reactions/`);
        const data = await response.json();
        const sortedData = [...data.reactions].sort((a,b) => a.name.localeCompare(b.name));
        setReactions(sortedData.filter(item => item.tag_number !== 1000));
    };

    useEffect(() => {
        getReactions();
        document.title = "Reactions - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);


    return (
        <div className="white-space">
            <h1 className="left-h1">Reactions</h1>

            { account && account.roles.includes("admin")?
                <NavLink to="/reactioncreate">
                    <button
                        className="left red">
                        Create
                    </button>
                </NavLink>:
            null}

            <div>
                {reactions.map(function(reaction, index, arr) {
                        return (
                            <NavLink to={`/reactions/${reaction.id}`} className="nav-link glow2 no-pad" key={reaction.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 className="text-table">{reaction.name}</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-table-2">{shortenedText(reaction.rules)}</h5>
                                    </div>
                                </div>
                        </NavLink>
                    );
                })}
            </div>

        </div>
    );
}

export default ReactionsPage;
