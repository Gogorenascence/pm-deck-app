import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";

function ExtraEffectsPage() {

    const { account } = useContext(AuthContext)

    const [extraEffects, setExtraEffects ] = useState([]);

    const getExtraEffects = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/extra_effects/`);
        const data = await response.json();
        const sortedData = [...data.extra_effects].sort((a,b) => a.name.localeCompare(b.name));
        setExtraEffects(sortedData.filter(item => item.tag_number !== 1000));
    };

    useEffect(() => {
        getExtraEffects();
        document.title = "Extra Effects - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);


    return (
        <div className="white-space">
            <h1 className="left-h1">Extra Effects</h1>

            { account && account.roles.includes("admin")?
                <NavLink to="/extraeffectcreate">
                    <button
                        className="left red">
                        Create
                    </button>
                </NavLink>:
            null}

            <div>
                {extraEffects.map(function(extraEffect, index, arr) {
                        return (
                            <NavLink to={`/extraeffects/${extraEffect.id}`} className="nav-link glow2 no-pad" key={extraEffect.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 className="text-table">{extraEffect.name}</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-table-2">{extraEffect.rules}</h5>
                                    </div>
                                </div>
                            </NavLink>
                    );
                })}
            </div>

        </div>
    );
}

export default ExtraEffectsPage;
