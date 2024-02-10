import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { NewsQueryContext } from "../context/NewsQueryContext";


function StoriesPage() {

    const { account } = useContext(AuthContext)

    const {
        newsQuery,
        setNewsQuery,
        newsSortState,
        setNewsSortState,
        handleResetNewsQuery,
        someMoreNews,
        handleSomeMoreNews,
    } = useContext(NewsQueryContext)
    const [stories, setStories] = useState([]);

    const maxDate = new Date().toISOString().split("T")[0];

    const [loading, setLoading] = useState(false)

    const getStories = async() =>{
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/stories/`);
        const data = await response.json();

        setLoading(false)
        setStories(
            data.stories.sort((a,b) => new Date(b.story_date) - new Date(a.story_date))
        );
    };

    const formatDate = (date) => {
        const month = date.slice(5,7);
        const day = date.slice(8);
        const year = date.slice(0,4);
        return `${month}-${day}-${year}`
    }

    const filteredStories = account && account.roles.includes("admin")?
        stories: stories.filter(story => story.section !== "admin")

    const newsColors = {
        releases: "rgba(192, 145, 17, 0.87)",
        game: "rgba(42, 168, 115, 0.70)",
        design: "rgba(124, 19, 33, 0.70)",
        site: "rgba(77, 71, 94, 0.50)",
        social: "rgba(82, 96, 194, 0.70)",
        events: "rgba(101, 56, 131, 0.70)",
        admin: "rgba(77, 71, 94, 0.50)",
        simulator: "rgba(232, 82, 230, 0.70)"
    }

    const newsBorders = {
        releases: "#f0be1c",
        game: "rgb(54, 184, 129)",
        design: "rgb(255, 0, 43)",
        site: "#4D475E",
        social: "rgb(88, 129, 253)",
        events: "rgb(104, 20, 172)",
        admin: "#4D475E",
        simulator: "rgba(232, 82, 230, 0.70)"
    }

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = 'auto';
        getStories();
        document.title = "Glossary and Rulings - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    const newsSortMethods = {
        none: {method: (a,b) => new Date(b.story_date) - new Date(a.story_date)},
        newest: {method: (a,b) => new Date(b.story_date) - new Date(a.story_date)},
        oldest: {method: (a,b) => new Date(a.story_date) - new Date(b.story_date)},
    };

    const handleNewsQuery = (event) => {
        setNewsQuery({ ...newsQuery, [event.target.name]: event.target.value });
    };

    const handleNewsSortState = (event) => {
        setNewsSortState(event.target.value);
    };

    const completelyFilteredNews = filteredStories.filter(story => newsQuery.section? (newsQuery.section === story.section): story)
        .filter(story => newsQuery.startingDate? (new Date(story.story_date) >= new Date(newsQuery.startingDate)):story)
        .filter(story => newsQuery.content? (story.content.toLowerCase().includes(newsQuery.content.toLowerCase())):story)
        .filter(story => newsQuery.headline? (story.headline.toLowerCase().includes(newsQuery.headline.toLowerCase())):story)
        .sort(newsSortMethods[newsSortState].method)

    return (
        <div className="white-space">
            <div className="flex-items">
                <h1 className="left-h1">CardBase News</h1>
                {/* <h2 className="left">Search our collection of decks</h2> */}
                { account && account.roles.includes("admin")?
                    <NavLink to="/newscreate">
                        <button
                            className="left red margin-left-13">
                            Create
                        </button>
                    </NavLink>:
                null}
            </div>
            <span className="media-flex-center">
                <div className="wide400p">
                    <input
                        className="left dcbsearch-x-large"
                        type="text"
                        placeholder=" Headline Contains..."
                        name="headline"
                        value={newsQuery.headline}
                        onChange={handleNewsQuery}>
                    </input>
                    <br/>
                    <input
                        className="left dcbsearch-x-large"
                        type="text"
                        placeholder=" Article Contains..."
                        name="content"
                        value={newsQuery.content}
                        onChange={handleNewsQuery}>
                    </input>
                    <br/>
                    <div className="flex-items">
                        <input
                            className="left dcbsearch-medium"
                            type="date"
                            placeholder=" Image"
                            max={maxDate}
                            onChange={handleNewsQuery}
                            name="startingDate"
                            value={newsQuery.startingDate}>
                        </input>
                        <select
                            className="left dcbsearch-medium"
                            type="text"
                            placeholder=" Section"
                            name="section"
                            value={newsQuery.section}
                            onChange={handleNewsQuery}>
                            <option value="">Section</option>
                            <option value="releases">Releases</option>
                            <option value="game">Game</option>
                            <option value="design">Design</option>
                            <option value="site">Site</option>
                            <option value="social">Social</option>
                            <option value="events">Events</option>
                            {account && account.roles.includes("admin")?
                                <option value="admin">Admin</option>: null
                            }
                            <option value="simulator">Simulator</option>
                        </select>
                        <select
                            className="left dcbsearch-medium"
                            type="text"
                            placeholder=" Sorted By"
                            value={newsSortState}
                            onChange={handleNewsSortState}>
                            <option value="none">Sorted By</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>

                    <button
                        className="left"
                        variant="dark"
                        onClick={handleResetNewsQuery}
                        >
                        Reset Filters
                    </button>
                    { loading ?
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                        </div> :
                        <h4 className="left-h3">Showing Results 1 - {completelyFilteredNews.slice(0, someMoreNews).length} of {completelyFilteredNews.length}</h4>}

                </div>
            </span>

            <br/>
            <div className="newsPage">
                {completelyFilteredNews.slice(0, someMoreNews).map((story, index) => {
                    return (
                        <div
                            className="flex-items newsItem"
                            style={{
                                backgroundColor: newsColors[story.section],
                                borderColor: newsBorders[story.section],
                                marginTop: index === 0 ? "2px" : "10px",
                                marginBottom: index ===  filteredStories.length -1 ? "2px" : "10px"
                            }}
                        >

                            <h3 className="newsText no-wrap">{formatDate(story.story_date)}</h3>
                            <img className="newsSection" src={`${story.section}.png`} alt={story.section}/>
                            {/* <h4 className="newsText">{story.section}</h4> */}
                            <h4 className="newsText">{story.headline}</h4>
                        </div>
                    )
                })}
            </div>
            {someMoreNews < completelyFilteredNews.length ?
                <button
                    style={{ width: "100%", marginTop:"2%"}}
                    onClick={handleSomeMoreNews}>
                    Show More News ({completelyFilteredNews.length - someMoreNews} Remaining)
                </button> : null }
        </div>
    );
}

export default StoriesPage;
