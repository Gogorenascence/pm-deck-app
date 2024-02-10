import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';


function ArticleImageCreate({image, imagesIndex, handleImageChange}) {
    const handleImageChangeLocal = (event) => {
        const updatedImage = {
            ...image,
            [event.target.name]: event.target.value,
        };
        handleImageChange(imagesIndex, updatedImage);
        console.log(updatedImage)
    };

    // const [image, setImage ] = useState({
    //     keyName:"",
    //     src: "",
    //     caption:"",
    //     link:"",
    //     order:"",
    //     alt_text:"",
    // });

    return (
        <div>
            <h1>Image</h1>
            <div>
                <h5 className="label">Source</h5>
                <input
                    className="builder-input"
                    type="text"
                    placeholder=" Source"
                    onChange={handleImageChangeLocal}
                    name="src"
                    value={image.src}>
                </input>
                <h5 className="label">Paragraph Number</h5>
                <input
                    className="builder-input"
                    type="number"
                    placeholder=" Paragraph Number"
                    onChange={handleImageChangeLocal}
                    name="keyName"
                    value={image.keyName}>
                </input>
                <h5 className="label">Caption</h5>
                <input
                    className="builder-input"
                    type="text"
                    placeholder=" Caption"
                    onChange={handleImageChangeLocal}
                    name="caption"
                    value={image.caption}>
                </input>
                <h5 className="label">Page Link</h5>
                <input
                    className="builder-input"
                    type="text"
                    placeholder=" Page Link"
                    onChange={handleImageChangeLocal}
                    name="link"
                    value={image.link}>
                </input>
                <br/>
                <h5 className="label">Order</h5>
                <input
                    className="builder-input"
                    type="number"
                    placeholder=" Order"
                    onChange={handleImageChangeLocal}
                    name="order"
                    value={image.order}>
                </input>
                <h5 className="label">Alt Text</h5>
                <input
                    className="builder-input"
                    type="text"
                    placeholder=" Alt Text"
                    onChange={handleImageChangeLocal}
                    name="alt_text"
                    value={image.alt_text}>
                </input>
            </div>
        </div>
    );
}

export default ArticleImageCreate;
