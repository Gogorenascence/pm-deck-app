import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import ArticleImageCreate from "./ArticleImageCreate";


function ArticleCreatePage() {

    const { account } = useContext(AuthContext)

    const [article, setArticle ] = useState({
        title: "",
        subtitle: "",
        author: "",
        created: new Date().toISOString().split("T")[0],
        section: "",
        text: "",
        images: "",
    });

    const [images, setImages] = useState([])

    const handleArticleChange = (event) => {
        console.log(images)
        setArticle({
            ...article,
            [event.target.name]: event.target.value})
    }

    const handleImageChange = (imagesIndex, updatedImage) => {
        setImages((prevImages) => {
            const newImages = [...prevImages]
            newImages[imagesIndex] = updatedImage
            return newImages
        })
    }

    const handleAddImage = () => {
        const newImages = [...images]
        newImages.push({})
        setImages(newImages)
    }


    // useEffect(() => {
    //     window.scroll(0, 0);
    //     document.body.style.overflow = 'auto';
    //     getArticle();
    // // eslint-disable-next-line
    // },[]);

    useEffect(() => {
        document.title = "Article Create - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    const processedText = (text) => {
        return text.split("//");
    };
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...article};
        data["author"] = account.username
        data["images"] = {}
        for (let image of images) {
            console.log(typeof image.keyName)
            if (data["images"][image.keyName]) {
                const articleImage = {
                    src: image.src,
                    caption: image.caption,
                    link: image.link,
                    order: image.order,
                    alt_text: image.alt_text,
                }
                data["images"][image.keyName].push(articleImage)
            } else {
                data["images"][image.keyName] = []
                const articleImage = {
                    src: image.src,
                    caption: image.caption,
                    link: image.link,
                    order: image.order,
                    alt_text: image.alt_text,
                }
                data["images"][image.keyName].push(articleImage)
            }
        }
        console.log(data)
        const articleUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/articles/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(articleUrl, fetchConfig);
        if (response.ok) {
            const article_id = response.id;
            setArticle({
                title: "",
                subtitle: "",
                author: "",
                created: "",
                section: "",
                text: "",
                images: "",
            });
            setImages([])
            // if (!stayHere) {navigate(`/articles/article_id`)}
            navigate(`/articles/${article_id}`)
            console.log("Success")
        } else {
            alert("Error in creating news");
        }
    }

    // if (!(account && account.roles.includes("admin"))) {
    //     setTimeout(function() {
    //         window.location.href = `${process.env.PUBLIC_URL}/`
    //     }, 3000);
    // }

    return (
        <div>
            { account && account.roles.includes("admin")?
                <div className="white-space">
                    <h1 className="margin-top-40">Article Create</h1>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                            <div
                                id="create-article-page">
                                <h2 className="left">Article Details</h2>
                                <h5 className="label">Title </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Title"
                                    onChange={handleArticleChange}
                                    name="title"
                                    value={article.title}>
                                </input>
                                <br/>
                                <h5 className="label">Subtitle </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Subtitle"
                                    onChange={handleArticleChange}
                                    name="subtitle"
                                    value={article.subtitle}>
                                </input>
                                <br/>
                                <h5 className="label">Section </h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    value={article.section}
                                    name="section"
                                    onChange={handleArticleChange}>
                                    <option value="">Section</option>
                                    <option value="Guide">Guide</option>
                                    <option value="Lore">Lore</option>
                                    <option value="Card Releases">Card Releases</option>
                                    <option value="Game Play and Mechanics">Game Play and Mechanics</option>
                                    <option value="Game Design">Game Design</option>
                                    <option value="Site">Site</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="Events">Events</option>
                                    <option value="Simulator">Simulator</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <br/>
                                <input
                                    style={{margin: "20px 5px 9px 5px", height:"10px"}}
                                    id="stayHere"
                                    type="checkbox"
                                    // onChange={handleCheck}
                                    name="stayHere"
                                    // checked={stayHere}
                                    >
                                </input>
                                <label for="stayHere"
                                    className="bold"
                                >
                                    Keep me here
                                </label>

                                <br/>
                                {account?
                                    <div className="flex-items">
                                        <button
                                            className="left"
                                            onClick={handleSubmit}
                                        >
                                            Create Article
                                        </button>
                                        <button
                                            className="left"
                                            onClick={() => handleAddImage()}
                                        >
                                            Add Image
                                        </button>
                                    </div>:null
                                }
                                <br/>
                                { !account?
                                    <h6 className="error">You must be logged in to create a article</h6>:
                                null
                                }
                            </div>
                        </div>
                    </div>
                    <h2 className="label">Article Content</h2>
                    <textarea
                        className="large-article"
                        type="text"
                        placeholder=" Article Content"
                        onChange={handleArticleChange}
                        name="text"
                        value={article.text}>
                    </textarea>
                    <br/>
                    {images?.map((image, index) =>
                        <ArticleImageCreate
                            key={index}
                            image={image}
                            imagesIndex={index}
                            handleImageChange={handleImageChange}
                        />
                    )}
                </div>:
                <div className="textwindow">
                    <h1 className="undercontext">This Feature Is For Admins Only</h1>
                    <h3 className="undercontext">Redirecting in 3 Seconds</h3>
                </div>
            }
        </div>
    );
}

export default ArticleCreatePage;
