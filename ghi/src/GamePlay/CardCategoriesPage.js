import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import ImageWithoutRightClick from "../display/ImageWithoutRightClick";

function CardCategoriesPage() {

    const { account } = useContext(AuthContext)

    const [cardCategories, setCardCategories ] = useState([]);
    const [showMore, setShowMore] = useState(20);

    const getCardCategories = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/card_categories/`);
        const data = await response.json();

        const sortedData = [...data.card_categories].sort((a,b) => a.name.localeCompare(b.name));
        sortedData.map(card_category =>
            card_category.description = card_category.description.split("//"))
        setCardCategories(sortedData);
    };

    const navigate = useNavigate()

    // const getRandomCategory = async() =>{
    //     const randomIndex = Math.floor(Math.random() * cardCategories.length);
    //     const randomCardCategory = [randomIndex].id;
    //     navigate(`/categories/${randomCardCategory}`)
    // }

    useEffect(() => {
        getCardCategories();
        document.title = "Card Categories - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    return (
        <div className="white-space">
            <h1 className="left-h1">Card Categories</h1>

            { account && account.roles.includes("admin")?
                <NavLink to="/categorycreate">
                    <button
                        className="left red">
                        Create
                    </button>
                </NavLink>:
            null}
            <h3 className="left-h1">Card Classes</h3>
            {/* <h5 className="left-h3">Showing Results 1 - {all_cards.slice(0, showMore).length} of {all_cards.length}</h5> */}

            <div>
                {cardCategories.filter(cardCategory => cardCategory.cat_type === "card_class")
                    .map(function(cardCategory, index, arr) {
                    return (
                        <NavLink to={`/categories/${cardCategory.id}`} className="nav-link glow2" key={cardCategory.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 style={{fontWeight: "600"}}>{cardCategory.name}</h5>
                                    </div>
                                    <div className="table200p">
                                        <h5 style={{fontWeight: "600"}}>{cardCategory.description}</h5>
                                    </div>
                                </div>
                        </NavLink>
                    );
                })}
            </div>

            <h3 className="left-h1">Series</h3>
            {/* <h5 className="left-h3">Showing Results 1 - {all_cards.slice(0, showMore).length} of {all_cards.length}</h5> */}

            <div>
                {cardCategories.filter(cardCategory => cardCategory.cat_type === "series")
                    .map(function(cardCategory, index, arr) {
                    return (
                        <NavLink to={`/categories/${cardCategory.id}`} className="nav-link glow2" key={cardCategory.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 style={{fontWeight: "600"}}>{cardCategory.name}</h5>
                                    </div>
                                    <div className="table200p">
                                        <h5 style={{fontWeight: "600"}}>{cardCategory.description}</h5>
                                    </div>
                                </div>
                        </NavLink>
                    );
                })}
            </div>

            <h3 className="left-h1">Sub-Series</h3>
            {/* <h5 className="left-h3">Showing Results 1 - {all_cards.slice(0, showMore).length} of {all_cards.length}</h5> */}

            <div>
                {cardCategories.filter(cardCategory => cardCategory.cat_type === "sub_series")
                    .map(function(cardCategory, index, arr) {
                    return (
                        <NavLink to={`/categories/${cardCategory.id}`} className="nav-link glow2" key={cardCategory.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 style={{fontWeight: "600"}}>{cardCategory.name}</h5>
                                    </div>
                                    <div className="table200p">
                                        <h5 style={{fontWeight: "600"}}>{cardCategory.description}</h5>
                                    </div>
                                </div>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
}

export default CardCategoriesPage;
