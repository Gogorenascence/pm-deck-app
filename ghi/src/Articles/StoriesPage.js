// import { useState, useEffect, useContext } from "react";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from "../context/AuthContext";


// function StoriesPage() {

//     const { account } = useContext(AuthContext)

//     const [stories, setStories] = useState([]);

//     const getStories = async() =>{
//         const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/stories/`);
//         const data = await response.json();
//         const sortedData = [...data].sort((a,b) => a.name.localeCompare(b.name));
//         setStories(sortedData);
//     };

//     useEffect(() => {
//         window.scroll(0, 0);
//         document.body.style.overflow = 'auto';
//         getStories();
//         document.title = "Glossary and Rulings - PM CardBase"
//         return () => {
//             document.title = "PlayMaker CardBase"
//         };
//     // eslint-disable-next-line
//     },[]);


//     return (
//         <div className="white-space">
//             <div className="flex-items">
//                 <h1 className="left-h1 margin-top-20">Glossary and Rulings</h1>

//                 { account && account.roles.includes("admin")?
//                     <NavLink to="/storycreate">
//                         <button
//                             className="left red margin-left-13">
//                             Create
//                         </button>
//                     </NavLink>:
//                 null}
//             </div>

//             <div className="fullTableBorder">
//                 {stories.map(function(story, index, arr) {
//                     return (
//                         <div className="flex" key={story.name}>
//                             <div className="table200">
//                                 <h5 className="text-table aligned">{story.name}</h5>
//                             </div>
//                             <div className="tableText flex-items between-space">
//                                 <h5 className="text-table-2">{story.text}</h5>
//                                 { account && account.roles.includes("admin")?
//                                 <NavLink className="nav-link" to={`/news/${story.id}`}>
//                                     <h5 className="text-table">[Edit]</h5>
//                                 </NavLink>:
//                             null}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//         </div>
//     );
// }

// export default StoriesPage;
