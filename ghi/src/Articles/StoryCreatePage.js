// import { useState, useEffect, useContext } from "react";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from "../context/AuthContext.js";


// function StoryCreate() {

//     const [story, setStory ] = useState({
//         name: "",
//         text: "",
//         story_number: 1000,
//     });

//     const { account } = useContext(AuthContext)
//     const [stayHere, setStayHere] = useState(false)

//     const [stories, setStories ] = useState([]);
//     const [storyNumber, setStoryNumber] = useState(0)

//     const getStories = async() =>{
//         const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/stories/`);
//         const data = await response.json();
//         const sortedData = [...data].sort((a,b) => a.name.localeCompare(b.name));
//         setStories(sortedData);
//         const story_numbers = data.map(story => story.story_number)
//         const max_story_number = Math.max(...story_numbers)
//         setStoryNumber(max_story_number + 1)
//     };

//     useEffect(() => {
//         window.scroll(0, 0);
//         getStories();
//         document.body.style.overflow = 'auto';
//         document.title = "Story Create - PM CardBase"
//         return () => {
//             document.title = "PlayMaker CardBase"
//         };
//     // eslint-disable-next-line
//     },[]);

//     const handleChange = (event) => {
//         setStory({ ...story, [event.target.name]: event.target.value });
//         console.log(storyNumber)
//     };

//     const handleCheck = (event) => {
//         setStayHere(!stayHere);
//     };

//     const navigate = useNavigate()

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const data = {...story};
//         data["story_number"] = storyNumber
//         const storyUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/stories/`;
//         const fetchConfig = {
//             method: "POST",
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         };

//         const response = await fetch(storyUrl, fetchConfig);
//         if (response.ok) {
//             setStory({
//                 name: "",
//                 text: "",
//                 story_number: 1000
//             });
//             getStories()
//             if (!stayHere) {navigate(`/glossary`)}
//             console.log("Success")
//         } else {
//             alert("Error in creating story");
//         }
//     }

//     if (!(account && account.roles.includes("admin"))) {
//         setTimeout(function() {
//             window.location.href = `${process.env.PUBLIC_URL}/`
//         }, 3000);
//     }


//     return (
//         <div>
//             { account && account.roles.includes("admin")?
//                 <div className="white-space">
//                     <h1 className="margin-top-40">Story Create</h1>
//                         <div style={{display: "flex", justifyContent: "center"}}>
//                             <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
//                                 <div
//                                     id="create-story-page">
//                                     <h2 className="left">Story Details</h2>
//                                     <h5 className="label">Name </h5>
//                                     <input
//                                         className="builder-input"
//                                         type="text"
//                                         placeholder=" Story Name"
//                                         onChange={handleChange}
//                                         name="name"
//                                         value={story.name}>
//                                     </input>
//                                     <br/>
//                                     <h5 className="label"> Text </h5>
//                                     <textarea
//                                         className="builder-text"
//                                         type="text"
//                                         placeholder=" Story Text"
//                                         onChange={handleChange}
//                                         name="text"
//                                         value={story.text}>
//                                     </textarea>
//                                     <br/>

//                                     <input
//                                         style={{margin: "20px 5px 9px 5px", height:"10px"}}
//                                         id="stayHere"
//                                         type="checkbox"
//                                         onChange={handleCheck}
//                                         name="stayHere"
//                                         checked={stayHere}>
//                                     </input>
//                                     <label for="stayHere"
//                                         className="bold"
//                                     >
//                                         Keep me here
//                                     </label>

//                                     <br/>
//                                     {account?
//                                         <button
//                                             className="left"
//                                             onClick={handleSubmit}
//                                         >
//                                             Create Story
//                                         </button>:null
//                                     }
//                                     <br/>
//                                     { !account?
//                                         <h6 className="error">You must be logged in to create a story</h6>:
//                                     null
//                                     }
//                                 </div>
//                             </div>
//                         </div>
//                 </div>:
//                 <div className="textwindow">
//                     <h1 className="undercontext">This Feature Is For Admins Only</h1>
//                     <h3 className="undercontext">Redirecting in 3 Seconds</h3>
//                 </div>
//             }
//         </div>
//     );
// }

// export default StoryCreate;
