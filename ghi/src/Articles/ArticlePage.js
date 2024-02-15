import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";
import { Card } from "react-bootstrap";

function ArticlePage() {

    const { article_id } = useParams()
    const { account, getUsers, users } = useContext(AuthContext)

    const [article, setArticle] = useState({
        title: "",
        subtitle: "",
        author: "",
        story_date: "",
        section: "",
        content: "",
        images: "",
        news: false,
        site_link: "",
    });

    const [images, setImages] = useState([])
    const [author, setAuthor] = useState({
        username: "TeamPlayMaker"
    })

    const getArticle = async() =>{
        const articleResponse = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/articles/${article_id}/`);
        const article_data = await articleResponse.json();
        setArticle(article_data);
        console.log(article)

        const processedImages = []
        for (let keyName of Object.keys(article_data.images)) {
            for (let order of Object.keys(article_data.images[keyName])) {
                const image = {
                    keyName: keyName,
                    src: article_data.images[keyName][order].src??null,
                    alt_text: article_data.images[keyName][order].alt_text??null,
                    caption: article_data.images[keyName][order].caption??null,
                    order: order,
                    link: article_data.images[keyName][order].link??null,
                }
                processedImages.push(image)
            }
        }
        setImages(processedImages)

        const author = users.find(user => user.id === article_data.author)
        setAuthor(author)
    };

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = 'auto';
        getArticle();
        getUsers()
        console.log(images)
    // eslint-disable-next-line
    },[]);

    useEffect(() => {
        document.title = `${article.title} - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[article]);

    const processedText = (text) => {
        return text?.split("//");
    };

    const formatDate = (date) => {
        const month = date.slice(5,7);
        const day = date.slice(8);
        const year = date.slice(0,4);
        return `${month}-${day}-${year}`
    }

    return (
        <div className="white-space">
            <Card className="text-white text-center card-list-card3" style={{margin: "2% 0%" }}>
                <div className="card-image-wrapper">
                    <div className="card-image-clip2">
                        <Card.Img
                            src={images[0]? images[0].src : "https://i.imgur.com/8wqd1sD.png"}
                            alt={images[0]? images[0].alt_text : "article's first image"}
                            className="card-image2"
                            variant="bottom"/>
                    </div>
                </div>
                <Card.ImgOverlay className="blackfooter2 mt-auto">
                        <div className="flex">
                            <h1 className="left margin-top-30">{article.title}</h1>
                            {/* {account?
                                <FavoriteDeck deck={deck}/>:null
                            } */}
                        </div>
                        {/* <h6 className="left"
                            style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                        >
                            Strategies: {deck.strategies.length > 0 ? deck.strategies.join(', ') : "n/a"}
                        </h6>
                        <h6 className="left"
                            style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                        >
                            Main Deck: {main_list.length} &nbsp; Pluck Deck: {pluck_list.length}
                        </h6>
                        <div style={{ display: "flex" }}>
                            <img className="logo2" src="https://i.imgur.com/nIY2qSx.png" alt="created on"/>
                            <h6
                            className="left justify-content-end"
                                style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                            >
                                {createdAgo} &nbsp; &nbsp;
                            </h6>
                            <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                            <h6
                            className="left justify-content-end"
                                style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                            >
                                {updatedAgo} &nbsp; &nbsp;
                            </h6>
                            <img className="logo2" src="https://i.imgur.com/eMGZ7ON.png" alt="created by"/>
                            <h6
                            className="left justify-content-end"
                                style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                            >
                                {createdBy(deck)}
                            </h6>
                        </div> */}
                </Card.ImgOverlay>
            </Card>
            { account && account.roles.includes("admin")?
                <NavLink to={`/articles/${article.id}/edit`}>
                    <button
                        className="left red"
                        style={{ margin: "3px 0px 0px 9px"}}
                    >
                        Edit Article
                    </button>
                </NavLink>
            :null}
            <h2>{article.subtitle}</h2>
            <h3>{"author.username"}</h3>
            <h4>{formatDate(article.story_date)}</h4>
            <h5>{article.section}</h5>
            {
                processedText(article.content)?.map((line, index) => {
                    return (
                        <>
                            <p>{line}</p>
                            <div className="flex-content">
                                {article.images[index.toString()] ?
                                    article.images[index.toString()].sort((a,b) => a.order - b.order).map(image =>
                                        <div>

                                            <img className="builder-card"
                                                src={image.src}
                                                title={image.alt_text}
                                                alt={image.alt_text}
                                            />
                                            {image.caption? <p>{image.caption}</p>: null}
                                        </div>

                                    ):null
                                }
                            </div>
                        </>
                    )
                })
            }
        </div>
    );
}

export default ArticlePage;
