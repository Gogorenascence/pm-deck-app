import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";


function ArticlePage() {

    const [article, setArticle ] = useState({
        title: "",
        subtitle: "",
        author: "",
        created: "",
        section: "",
        text: "",
        images: {},
    });

    const { article_id } = useParams()
    const { account } = useContext(AuthContext)

    const getArticle = async() =>{
        const articleResponse = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/articles/${article_id}/`);
        const article_data = await articleResponse.json();
        setArticle(article_data);
    };

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = 'auto';
        getArticle();
        console.log(article)
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
        return text.split("//");
    };

    return (
        <div className="white-space">
            <h1>{article.title}</h1>
            <h2>{article.subtitle}</h2>
            <h3>{article.author}</h3>
            <h4>{article.created}</h4>
            <h5>{article.section}</h5>
            {
                processedText(article.text).map((line, index) => {
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
