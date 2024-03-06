import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import { Card } from "react-bootstrap";

function HowToPage() {

    const { how_to_id } = useParams()
    const { account } = useContext(AuthContext)

    const [howTo, setHowTo] = useState({
        title: "",
        game_format: "",
        skill_level: "",
        content: "",
        how_to_number: 0,
        images: "",
        updated: "",
    });

    const [images, setImages] = useState([])

    const getHowTo = async() =>{
        const howToResponse = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/how_tos/${how_to_id}/`);
        const howToData = await howToResponse.json();
        setHowTo(howToData);
        console.log(howToData)

        const processedImages = []
        for (let keyName of Object.keys(howToData.images)) {
            for (let order of Object.keys(howToData.images[keyName])) {
                const image = {
                    keyName: keyName,
                    src: howToData.images[keyName][order].src??null,
                    alt_text: howToData.images[keyName][order].alt_text??null,
                    caption: howToData.images[keyName][order].caption??null,
                    order: order,
                    link: howToData.images[keyName][order].link??null,
                }
                processedImages.push(image)
            }
        }
        setImages(processedImages)
    };

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = 'auto';
        getHowTo();
    // eslint-disable-next-line
    },[]);

    useEffect(() => {
        document.title = `${howTo.title} - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[howTo]);

    const processedText = (text) => {
        return text?.split("//");
    };

    const processedBoldLine = (line) => {
        return line?.replace("]]", "");
    };

    const processedBigLine = (line) => {
        return line?.replace("@@", "");
    };

    const formatDate = (date) => {
        const month = date.slice(5,7);
        const day = date.slice(8);
        const year = date.slice(0,4);
        return `${month}-${day}-${year}`
    }

    const getLink = (link) => {
        let newLink = ""
        link.includes("https://www.jothplaymaker.com/")?
            newLink = link.replace("https://www.jothplaymaker.com", `${process.env.PUBLIC_URL}`):
            newLink = link
        return newLink
    }

    return (
        <div className="white-space">
            <Card className="text-white text-center card-list-card3" style={{margin: "2% 0%" }}>
                <div className="card-image-wrapper">
                    <div className="card-image-clip2">
                        <Card.Img
                            src={images[0]? images[0].src : "https://i.imgur.com/8wqd1sD.png"}
                            alt={images[0]? images[0].alt_text : "howTo's first image"}
                            className="card-image2"
                            variant="bottom"/>
                    </div>
                </div>
                <Card.ImgOverlay className="blackfooter2 mt-auto">
                    <div className="flex">
                        <h1 className="left margin-top-10 ellipsis">{howTo.title}</h1>
                        {/* {account?
                            <FavoriteDeck deck={deck}/>:null
                        } */}
                        { account && account.roles.includes("admin")?
                            <NavLink className="nav-link" to={`/rulebooks/${howTo.id}/edit`}>
                                <h5>[Edit]</h5>
                            </NavLink>
                        :null}
                    </div>
                    {/* <h6 className="left"
                        style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                    >
                        Section: {deck.strategies.length > 0 ? deck.strategies.join(', ') : "n/a"}
                    </h6> */}
                    {/* <div className=" flex wide100-3">
                        <img className="newsSection" src={`/${howTo.section}.png`} alt={howTo.section}/>
                    </div> */}
                    {/* <h6 className="left"
                        style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                    >
                        Main Deck: {main_list.length} &nbsp; Pluck Deck: {pluck_list.length}
                    </h6> */}
                    <div className="flex">
                        { howTo.updated ?
                            <>
                                <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                                <h6
                                className="left justify-content-end"
                                    style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                >
                                    {formatDate(howTo.updated)} &nbsp; &nbsp;
                                </h6>
                            </>:null
                        }
                    </div>
                </Card.ImgOverlay>
            </Card>
            {/* <h1>{howTo.subtitle}</h1> */}
            <div className="newsSection2">
                {
                    processedText(howTo.content)?.map((line, index) => {
                        return (
                            <>
                                {line.includes("]]")?
                                    <p className={`${line.includes("@@")? "newsText4" :"newsText5"} bolder margin-bottom-0 margin-top-20`}>
                                        { line.includes("@@")? processedBigLine(processedBoldLine(line)): processedBoldLine(line)}
                                    </p>
                                :
                                    <p className="newsText2 margin-bottom-0">{line}</p>
                                }
                                <div className="newsImageContainer">
                                    {howTo.images[index.toString()] ?
                                        howTo.images[index.toString()].sort((a,b) => a.order - b.order).map(image => {
                                            return (
                                                image.link?
                                                <a href={getLink(image.link)}>
                                                    <div className="margin-top-10 margin-bottom-10">
                                                        <img className="newsImage"
                                                            src={image.src}
                                                            title={image.alt_text}
                                                            alt={image.alt_text}
                                                        />
                                                        {image.caption? <p className="newsText3">{image.caption}</p>: null}
                                                    </div>
                                                </a>
                                                :
                                                <div className="margin-top-10 margin-bottom-10">
                                                    <img className="newsImage"
                                                        src={image.src}
                                                        title={image.alt_text}
                                                        alt={image.alt_text}
                                                    />
                                                    {image.caption? <p className="newsText3">{image.caption}</p>: null}
                                                </div>
                                            )}
                                        ):null
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default HowToPage;
