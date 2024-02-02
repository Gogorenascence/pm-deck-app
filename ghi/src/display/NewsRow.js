import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from 'react-router-dom';
import ImageWithoutRightClick from "./ImageWithoutRightClick";


function NewsRow() {

    const { account } = useContext(AuthContext)
    const [stories, setStories] = useState([]);

    const getStories = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/stories/`);
        const data = await response.json();

        setStories(data.stories.sort((a,b) => new Date(b.story_date) - new Date(a.story_date)));
    };

    const formatDate = (date) => {
        const month = date.slice(5,7);
        const day = date.slice(8);
        const year = date.slice(0,4);
        return `${month}-${day}-${year}`
    }

    const filteredStories = account && account.roles.includes("admin")?
        stories.slice(0,20):
        stories.filter(story => story.section !== "admin").slice(0,20)

    const newsColors = {
        releases: "#ffbb00de",
        game: "rgba(42, 168, 115, 0.85)",
        design: "rgba(124, 19, 33, 0.85)",
        site: "#4d475e49",
        social: "rgba(82, 96, 194, 0.85)",
        events: "rgba(101, 56, 131, 0.85)",
        admin: "#4d475e49",
    }

    useEffect(() => {
        getStories();
    }, [account]);


    return(
        <div className="white-space">
            <div className="newsRow">
                {filteredStories.map((story, index) => {
                    return (
                        <div
                            className="flex-items newsItem"
                            style={{
                                backgroundColor: newsColors[story.section],
                                marginTop: index === 0 ? "0px" : "10px",
                                marginBottom: index ===  filteredStories.length -1 ? "0px" : "10px"
                            }}
                        >
                            <h3 className="newsText">{formatDate(story.story_date)}</h3>
                            <h4 className="newsText">{story.section}</h4>
                            <h5 className="newsText">{story.headline}</h5>
                        </div>
                    )
                })}
            </div>
            {/* <div className="stories-page-story-list5 none">
                {stories.slice(0, 5).map((story) => {
                    return (
                        <div className="story-row" key={story.name}>
                            <NavLink to={`/stories/${story.story_number}`}>
                                    <img
                                        className="story-row glow3"
                                        title={story.name}
                                        src={story.picture_url ? story.picture_url : "https://i.imgur.com/krY25iI.png"}
                                        alt={story.name}/>
                            </NavLink>
                        </div>
                    );
                })}
            </div>
            <div className="hidden2 media-display">
                <div className="stories-page-story-list">
                    {stories.slice(0, 6).map(story => {
                        return (
                            <NavLink to={`/stories/${story.story_number}`} key={story.name}>
                                    <img className="story-list-story4 glow3"
                                        title={story.name}
                                        src={story.picture_url ? story.picture_url : "https://i.imgur.com/krY25iI.png"}
                                        alt={story.name}
                                        loading="lazy"/>
                            </NavLink>
                        );
                    })}
                </div>
                </div> */}
            <br/>
            {/* <NavLink to="/stories"> */}
                <button style={{ width: "100%" }}>
                    Browse News
                </button>
            {/* </NavLink> */}
        </div>
    );
}

export default NewsRow;
