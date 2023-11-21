// const then = "2022-06-26T16:23:23.488Z";

// // Convert the string to a Date object
// const thenDate = new Date(then);

// // Get the current time
// const timeNow = new Date();

// // Calculate the time difference
// const timeDifference = timeNow - thenDate;

// // Define time units
// const oneMinute = 60 * 1000; // milliseconds
// const oneHour = oneMinute * 60;
// const oneDay = oneHour * 24;
// const oneMonth = oneDay * 30.44;
// const oneYear = oneDay * 365.25;

// // Calculate years, months, days, hours, minutes, and seconds
// let ago = Math.abs(timeDifference);
// const years = Math.floor(ago / oneYear);
// ago -= years * oneYear;
// const months = Math.floor(ago / oneMonth);
// ago -= months * oneMonth;
// const days = Math.floor(ago / oneDay);
// ago -= days * oneDay;
// const hours = Math.floor(ago / oneHour);
// ago -= hours * oneHour;
// const minutes = Math.floor(ago / oneMinute);
// ago -= minutes * oneMinute;
// const seconds = Math.floor(ago / 1000);

// // Format the time difference
// if (years > 0) {
//   console.log(`${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''} ago`);
// } else if (months > 0) {
//   console.log(`${months} month${months > 1 ? 's' : ''}, ${hours} hours, ${minutes} minutes, and ${seconds} seconds ago`);
// } else if (days > 0) {
//   console.log(`${days} day${days > 1 ? 's' : ''}, ${hours} hours, ${minutes} minutes, and ${seconds} seconds ago`);
// } else if (hours > 0) {
//   console.log(`${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minutes, and ${seconds} seconds ago`);
// } else if (minutes > 0) {
//   console.log(`${minutes} minute${minutes > 1 ? 's' : ''} and ${seconds} seconds ago`);
// } else {
//   console.log(`${seconds} seconds ago`);
// }



// <Card className="text-white text-center card-list-card">
//   <div className="card-image-wrapper">
//     <div className="card-image-clip">
//       <Card.Img
//         src={deck.cover_card ? deck.cover_card : ""}
//         alt="Card image"
//         variant="bottom"
//         className="card-image"
//       />
//     </div>
//   </div>
//   <Card.ImgOverlay className="blackfooter2 mt-auto">
//     <h5>{deck.name}</h5>
//     {/* Other card content */}
//   </Card.ImgOverlay>
// </Card>


// .card-image-wrapper {
//     position: relative;
//     overflow: hidden;
//     height: 50%; /* Adjust this value as needed to control the height */
//   }

//   .card-image-clip {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 100%;
//     clip-path: inset(0 0 50% 0); /* Adjust the inset values to control the clipped portion */
//   }

//   .card-image {
//     width: 100%;
//     height: auto;
//     object-fit: cover;
//   }

// .filter(deck => {
//   if (deckQuery.cardNumber) {
//       const allCards = deck.cards.concat(deck.pluck);
//       console.log(allCards)
//       const stringifiedCards = allCards.map(card => card.toString());
//       return stringifiedCards.some(card => card.includes(deckQuery.cardNumber));
//   } else {
//       return true;
//   }
// })



// body {
//   margin-bottom: 200px;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
//     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//     sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   /* background-image: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("./backg.png"); */
//   background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url("./backg.png");
//   background-size: 85%, 60%;
//   background-repeat: no-repeat, repeat;
//   background-position: center center, center center;
//   background-attachment: fixed, fixed;
//   z-index: -1,-100;
//   color: white;
// }

// h1 {
//   font-weight: bold;
//   text-align: center;
// }

// h2 {
//   text-align: center;
// }
// body::after {
//   content: "";
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   background-size: 125px;
//   background-image: url("./frame2.png");
//   background-repeat: repeat;
//   animation: scroll 840s linear infinite;
//   opacity: .05;
//   z-index: -20;
//   margin-bottom: 200px;
// }
// @keyframes scroll {
//   0% {
//     background-position: -3000px 3000px;
//   }
//   12.5% {
//     background-position: 0px -3000px;
//   }
//   25% {
//     background-position: -3000px 0px;
//   }
//   37.5% {
//     background-position: 0px 3000px;
//   }
//   50% {
//     background-position: -3000px 3000px;
//   }
//   62.5% {
//     background-position: 0px -3000px;
//   }
//   75% {
//     background-position: -3000px 0px;
//   }
//   87.5% {
//     background-position: 0px 3000px;
//   }
//   100% {
//     background-position: -3000px 3000px;
//   }
// }

// import React, { useEffect, useState } from "react";

// function LightSwitch() {
//     const [isDark, setIsDark] = useState(false);

//     const handleDark = (event) => {
//         setIsDark(!isDark);
//         localStorage.setItem("darkMode", JSON.stringify(isDark));
//     }

//     useEffect(() => {
//         // Retrieve the dark mode state from local storage
//         const savedDarkMode = localStorage.getItem("darkMode");

//         // If the dark mode state exists in local storage, use it to set the initial state
//         if (savedDarkMode) {
//             setIsDark(JSON.parse(savedDarkMode));
//             document.body.classList.toggle("dark", JSON.parse(savedDarkMode));
//         } else {
//             // If no dark mode state exists in local storage, check the user's preferred color scheme
//             const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
//             setIsDark(prefersDarkMode);
//         }
//     }, []);

//     useEffect(() => {
//         // Update the dark mode state in local storage whenever it changes
//         localStorage.setItem("darkMode", JSON.stringify(isDark));

//         document.body.classList.toggle("dark", isDark);
//     }, [isDark]);

//     return (
//         <div>
//             {isDark?
//                 <img
//                     className="light-dark"
//                     src="https://i.imgur.com/bL1Lcll.png"
//                     alt="light"
//                     onClick={handleDark}/>
//                 :
//                 <img
//                     className="light-dark"
//                     src="https://i.imgur.com/aC79zoE.png"
//                     alt="dark"
//                     onClick={handleDark}/>
//             }
//         </div>

// );
// }

// export default LightSwitch;


// import React from "react";

// function Modal() {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Modal Title</h2>
//         <p>Modal content goes here...</p>
//       </div>
//     </div>
//   );
// }

// export default Modal;


// .modal {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 9999;
// }

// .modal-content {
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
// }


// import React, { useState } from "react";
// import Modal from "./Modal";

// function App() {
//   const [showModal, setShowModal] = useState(false);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div>
//       <button onClick={toggleModal}>Open Modal</button>
//       {showModal && <Modal />}
//     </div>
//   );
// }

// export default App;



// import React from "react";

// function Navbar() {
//   return (
//     <nav>
//       <ul className="navbar-menu">
//         <li className="navbar-item">
//           <a href="#">Home</a>
//         </li>
//         <li className="navbar-item dropdown">
//           <a href="#">Dropdown</a>
//           <ul className="dropdown-menu">
//             <li>
//               <a href="#">Item 1</a>
//             </li>
//             <li>
//               <a href="#">Item 2</a>
//             </li>
//             <li>
//               <a href="#">Item 3</a>
//             </li>
//           </ul>
//         </li>
//         <li className="navbar-item">
//           <a href="#">About</a>
//         </li>
//         <li className="navbar-item">
//           <a href="#">Contact</a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


// .navbar-menu {
//   list-style: none;
//   display: flex;
//   justify-content: space-between;
//   background-color: #f0f0f0;
//   padding: 10px;
// }

// .navbar-item {
//   margin-right: 10px;
// }

// .dropdown {
//   position: relative;
// }

// .dropdown-menu {
//   position: absolute;
//   top: 100%;
//   left: 0;
//   background-color: #f0f0f0;
//   display: none;
//   padding: 10px;
// }

// .dropdown:hover .dropdown-menu {
//   display: block;
// }


// import React, { useState } from "react";

// function Navbar() {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <nav>
//       <ul className="navbar-menu">
//         <li className="navbar-item">
//           <a href="#">Home</a>
//         </li>
//         <li className="navbar-item dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
//           <a href="#">Dropdown</a>
//           {showDropdown && (
//             <ul className="dropdown-menu">
//               <li>
//                 <a href="#">Item 1</a>
//               </li>
//               <li>
//                 <a href="#">Item 2</a>
//               </li>
//               <li>
//                 <a href="#">Item 3</a>
//               </li>
//             </ul>
//           )}
//         </li>
//         <li className="navbar-item">
//           <a href="#">About</a>
//         </li>
//         <li className="navbar-item">
//           <a href="#">Contact</a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


// const [cardType, setCardType] = useState([]);
// const [extraEffects, setExtraEffects] = useState([]);
// const [reactions, setReactions] = useState([]);
// const [cardTags, setCardTags] = useState([]);

// const [cardTypeInput, setCardTypeInput] = useState("");
// const [extraEffectsInput, setExtraEffectsInput] = useState("");
// const [reactionsInput, setReactionsInput] = useState("");
// const [cardTagsInput, setCardTagsInput] = useState("");

// // Inside the JSX
// <input
//   className="builder-input"
//   type="text"
//   placeholder="Card Type"
//   value={cardTypeInput}
//   onChange={(e) => setCardTypeInput(e.target.value)}
// />
// <button onClick={handleAddCardType}>Add</button>


// const handleAddCardType = () => {
//   if (cardTypeInput) {
//     setCardType([...cardType, cardTypeInput]);
//     setCardTypeInput("");
//   }
// };

// const handleAddExtraEffect = () => {
//   if (extraEffectsInput) {
//     setExtraEffects([...extraEffects, extraEffectsInput]);
//     setExtraEffectsInput("");
//   }
// };

// // Repeat similar functions for reactions and cardTags
{/* <div>
  {cardType.map((item, index) => (
    <div key={index}>
      {item}
      <button onClick={() => handleRemoveCardType(index)}>Remove</button>
    </div>
  ))}
</div>

const handleRemoveCardType = (index) => {
  const updatedCardType = [...cardType];
  updatedCardType.splice(index, 1);
  setCardType(updatedCardType);
}; */}

// const handleRemoveExtraEffect = (index) => {
//   const updatedExtraEffects = [...extraEffects];
//   updatedExtraEffects.splice(index, 1);
//   setExtraEffects(updatedExtraEffects);
// };

// // Repeat similar functions for reactions and cardTags


// clicking any button in a form will sumbit the form



// .selected {
// 	--angle: 0deg;

// 	border: 4px solid;
// 	border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
//   border-radius: 90px;
//   overflow: hidden;
// 	animation: 10s rotate linear infinite;
// }

// @keyframes rotate {
// 	to {
// 		--angle: 360deg;
// 	}
// }

// @property --angle {
//   syntax: '<angle>';
//   initial-value: 0deg;
//   inherits: false;
// }


// .gradient-border {
//   /* --borderWidth: 3px; */
//   border-radius: 7px;
//   background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
//   overflow: hidden;
// }
// .
// .gradient-border:after {
//   content: '';
//   position: absolute;

//   height: 100%;
//   width: 120px;
//   background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
//   border-radius: 7px;
//   z-index: -1;
//   animation: animatedgradient 3s ease alternate infinite;
//   background-size: 300% 300%;
//   overflow: hidden;
// }


// @keyframes animatedgradient {
// 	0% {
// 		background-position: 0% 50%;
// 	}
// 	50% {
// 		background-position: 100% 50%;
// 	}
// 	100% {
// 		background-position: 0% 50%;
// 	}
// }

// import { PullsContext } from "./AppProvider"; // Adjust the import path to match your project structure

// function YourComponent() {
//   // Access the PullsContext
//   const { pulls, setPulls } = useContext(PullsContext);

//   // Now you can use pulls and setPulls in your component
//   // ...

//   return (
//     <div>
//       {/* Your component JSX */}
//     </div>
//   );
// }

// export default YourComponent;
// .ultra3 {
//   --angle: 0deg;
//   display: flex;
//   background-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red);
//   position: absolute;
//   z-index: 200;
//   width: 350px;
//   height: 487px;
//   margin: 6px 0px 0px 0px;
//   border-radius: 17px;
//   overflow: hidden;
//   top: 100%;
//   left: 100%;
//   display: none;
//   transform: translate(10%, -80%);
//   animation: 3s rotate linear infinite;
//   transition: transform 0.3s ease-in-out;

// }

//     @keyframes rotate {
//       to {
//         --angle: 360deg;
//       }
//     }

//     @property --angle {
//       syntax: '<angle>';
//       initial-value: 0deg;
//       inherits: false;
//     }

//  .ultr::after .img {
//     display: inline-block;
//   }

//   /* .card-container:hover .ultra3 {
//     display: inline-block;

//   } */

// .card-image3 {
//   position: absolute;
//   z-index: 200;
//   width: 338px;
//   margin: 2.5% 0px 0px 0%;
//   border-radius: 17px;
//   overflow: hidden;
//   top: 100%;
//   left: 100%;
//   display: none;
//   transform: translate(10%, -80%);
// }

// <h5 onClick={() => handleRemoveCard(card)}
// className="rainbow rainbow_text_animated"
// style={{fontWeight: "700"}}
// >{card.name}</h5>
// <div className="ultra3">
// </div>

// <img

// className="card-image3"

// src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
// alt={card.name}

// <div className="card-container pointer">
// <h5 onClick={() => handleRemoveCard(card)}
//     className="rainbow rainbow_text_animated2"
//     style={{fontWeight: "700"}}
// >{card.name}</h5>
// <img
//     className="card-image"
//     src={card.picture_url}
//     alt={card.name}
// />
// </div> :
// <div className="card-container pointer">
// <h5 onClick={() => handleRemoveCard(card)}>{card.name}</h5>
// <img
//     className="card-image"
//     src={card.picture_url}
//     alt={card.name}
// />

//Navbar elements to add before modal later
        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Articles
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Search Articles
                    </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Strategy Guides
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Series Lore
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul> */}

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Game Play
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Search Game Play
                    </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    How To Play
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Game Modes
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Formats
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Mechanics
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Restricted Lists
                    </NavLink>
                </li>
              </ul>
            </li>
          </ul> */}

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Community
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/forum">
                    Forum
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/forum">
                    Users
                    </NavLink>
                </li>
              </ul>
            </li>
          </ul> */}

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/cards/create">
                    Card Create
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}



      // Include the Email.js library in your HTML file
{/* <script src="https://cdn.emailjs.com/dist/email.min.js"></script>

// Initialize Email.js with your API keys
emailjs.init("deGtSFC4mncNpm_4n");

// Create a function to send an email
function sendEmail() {
  const templateParams = {
    to_email: "nantahkl@gmail.com",
    from_name: "Team CardBase",
    message: "Here's the reset link.",
    // reset_link: `http://localhost:3000/reset/${passwordReset.id}`
    reset_link: "http://localhost:3000/reset/64f6a25e07273674a7a1375d"
  };

  emailjs.send("service_5y7llwl", "template_dpy223d", templateParams)
    .then(function(response) {
      console.log("Email sent successfully:", response);
    }, function(error) {
      console.error("Email sending failed:", error);
    });
} */}

// const shouldRedirect = true; // Replace with your specific condition

// if (shouldRedirect) {
//   let countdown = 5; // 5 seconds

//   // Function to update and display the countdown
//   function updateCountdown() {
//     if (countdown === 0) {
//       // Redirect to a new URL when the countdown reaches zero
//       window.location.href = 'https://example.com/newpage'; // Replace with your desired URL
//     } else {
//       // Update and display the countdown
//       document.getElementById('countdown').textContent = countdown;
//       countdown--;
//       setTimeout(updateCountdown, 1000); // Update every 1 second (1000 milliseconds)
//     }
//   }

//   // Start the countdown initially
//   updateCountdown();
// }
// In this code:

// We start with a countdown variable set to 5, representing 5 seconds.

// The updateCountdown function updates and displays the countdown. If the countdown reaches zero, it performs the redirection; otherwise, it schedules itself to run again after 1 second (1000 milliseconds).

// We start the countdown initially by calling updateCountdown().

// You can display the countdown value in your HTML, for example, in a <span> element with an id of countdown:

// html
// Copy code
// <p>Redirecting in <span id="countdown">5</span> seconds...</p>
// With this code, the countdown will be displayed and decremented every second until it reaches zero, at which point the redirection will occur. Make sure to replace the redirection URL with your desired URL.


                {/* <NavLink className="dropdown-item" to="/topcards">

                </NavLink>
                <NavLink className="dropdown-item" to="/series">
                  Classes and Series
                </NavLink>
                <NavLink className="dropdown-item" to="/cardsets">
                  Mechanics
                </NavLink>
                <NavLink className="dropdown-item" to="/cardsets">
                  How to Play and Rulings
                </NavLink> */}


              //   <ul className="navbar-menu">
              //   <li className="nav-item">
              //     <h5 onClick={() => handleShowMenu(true, "decks")}
              //       className="navbar-menu-item"
              //     >
              //       Decks
              //     </h5>
              //     { showMenu.show && showMenu.section === "decks"?
              //       <div className="nav-dropdown-menu">
              //         <NavLink className="nav-dropdown-item" to="/deckbuilder">
              //           Deck Builder
              //         </NavLink>
              //         <NavLink className="nav-dropdown-item" to="/decks">
              //           Search Decks
              //         </NavLink>
              //       </div>: null
              //     }
              //   </li>
              //   <li className="nav-item">
              //     <h5 onClick={() => handleShowMenu(true, "cards")}
              //       className="navbar-menu-item"
              //     >
              //       Cards
              //     </h5>
              //     { showMenu.show && showMenu.section === "cards"?
              //       <div>
              //         <NavLink className="nav-dropdown-item" to="/cards">
              //           Search Cards
              //         </NavLink>
              //         <NavLink className="nav-dropdown-item" to="/topcards">
              //           Top Cards
              //         </NavLink>
              //         <NavLink className="nav-dropdown-item" to="/series">
              //             Series
              //           </NavLink>
              //         <NavLink className="nav-dropdown-item" to="/cardsets">
              //           Card Sets
              //         </NavLink>
              //       </div>:null
              //       }
              //   </li>
              //   <li className="nav-item">
              //     <h5 onClick={() => handleShowMenu(true, "gameplay")}
              //       className="navbar-menu-item"
              //     >
              //       Game Play
              //     </h5>
              //     { showMenu.show && showMenu.section === "gameplay"?
              //       <div>
              //         <NavLink className="nav-dropdown-item" to="/gameplay">
              //           GamePlay Portal
              //         </NavLink>
              //       </div>:null
              //     }
              //   </li>
              //   { account && account.roles.includes("admin")?
              //     <li className="nav-item">
              //       <h5 onClick={() => handleShowMenu(true, "admin")}
              //         className="navbar-menu-item"
              //       >
              //         Admin
              //       </h5>
              //       { showMenu.show && showMenu.section === "admin"?
              //         <div>
              //           <NavLink className="nav-dropdown-item" to="/cardcreate">
              //             Card Create
              //           </NavLink>
              //           <NavLink className="nav-dropdown-item" to="/categorycreate">
              //             Category Create
              //           </NavLink>
              //           <NavLink className="nav-dropdown-item" to="/cardtypecreate">
              //             Card Type Create
              //           </NavLink>
              //           <NavLink className="nav-dropdown-item" to="/cardtagcreate">
              //             Card Tag Create
              //           </NavLink>
              //           <NavLink className="nav-dropdown-item" to="/extraeffectcreate">
              //             Extra Effect Create
              //           </NavLink>
              //           <NavLink className="nav-dropdown-item" to="/reactioncreate">
              //             Reaction Create
              //           </NavLink>
              //         </div>:null
              //       }
              //     </li>:null
              //   }
              // </ul>


            //   const handleFileChange = (event) => {
            //     const file = event.target.files;
            //     if (file) {
            //         const reader = new FileReader();

            //         reader.onload = (e) => {
            //         try {
            //             const importedDeck = JSON.parse(e.target.result);
            //             setImportedDecks([...importedDecks, importedDeck]);
            //         } catch (error) {
            //             console.error('Error parsing imported deck JSON:', error);
            //         }
            //     };
            //     reader.readAsText(file);
            //     }
            // };


//             import React, { useState, useEffect, useRef } from 'react'
// import { NavLink } from 'react-router-dom';


// function StatsPanel({
// main_list,
// pluck_list
// }) {

//     const stats = {
//         fighters: 0,
//         auras: 0,
//         moves: 0,
//         endings: 0,
//         anyTypes: 0,
//         items: 0,
//         events: 0,
//         comebacks: 0,
//         staunch: 0,
//         power: 0,
//         unity: 0,
//         canny: 0
//     }

//     const [showStats, setShowStats] = useState(false)
//     const [showModal, setShowModal] = useState({
//         show: false,
//         label: "",
//         card_type: 0,
//         card_class: ""
//     })
//     const content = useRef(null)
//     useOutsideAlerter(content)

//     function useOutsideAlerter(ref) {
//         useEffect(() => {
//           // Function for click event
//             function handleOutsideClick(event) {
//                 if (ref.current && !ref.current.contains(event.target)
//                     && !event.target.closest(".stat-item")) {
//                     handleClose();
//                 }
//             }
//           // Adding click event listener
//             document.addEventListener("click", handleOutsideClick);
//                 return () => document.removeEventListener("click", handleOutsideClick);
//         }, [ref]);
//     }

//     for (let card of main_list){
//         if (card.card_type[0] === 1001) {
//             stats["fighters"] += 1
//         }
//         else if (card.card_type[0] === 1002) {
//             stats["auras"] += 1
//         }
//         else if (card.card_type[0] === 1003) {
//             stats["moves"] += 1
//         }
//         else if (card.card_type[0] === 1004) {
//             stats["endings"] += 1
//         }
//         else if (card.card_type[0] === 1005) {
//             stats["anyTypes"] += 1
//         }

//         if (card.card_class === "Staunch") {
//             stats["staunch"] += 1
//         }
//         else if (card.card_class === "Power") {
//             stats["power"] += 1
//         }
//         else if (card.card_class === "Unity") {
//             stats["unity"] += 1
//         }
//         else if (card.card_class === "Canny") {
//             stats["canny"] += 1
//         }
//     }

//     for (let card of pluck_list){
//         if (card.card_type[0] === 1006) {
//             stats["items"] += 1
//         }
//         else if (card.card_type[0] === 1007) {
//             stats["events"] += 1
//         }
//         else if (card.card_type[0] === 1008) {
//             stats["comebacks"] += 1
//         }
//     }

//     const handleShowStats = (event) => {
//         setShowStats(!showStats)
//     }

//     const handleClose = () => {
//         setShowModal({
//             show: false,
//             label: "",
//             card_type: 0,
//             card_class: ""
//         })
//         document.body.style.overflow = 'auto';
//     };

//     const handleSetClass = (card_class, item) => {
//         setShowModal({
//             show: true,
//             label: item,
//             card_type: 0,
//             card_class: card_class
//         })
//         document.body.style.overflow = 'hidden';
//     };

//     const handleSetType = async(card_type, item) => {
//         setShowModal({
//             show: true,
//             label: item,
//             card_type: card_type,
//             card_class: ""
//         })
//         document.body.style.overflow = 'hidden';
//     };

//     const fullLength = main_list.length + pluck_list.length

//     const card_list = main_list.concat(pluck_list)
//     const filteredCards = card_list.filter(card =>
//         (showModal.card_type? card.card_type[0] === showModal.card_type: true))
//         .filter(card => (showModal.card_class? card.card_class === showModal.card_class: true))


//     return(
//         <div>
//             {showModal.show?
//                 <div className="large-modal topbar"
//                 >
//                     <div className="outScrollable" ref={content}>
//                         <h1 className="centered-h1"
//                             style={{color: "black"}}>{showModal.label}</h1>
//                         <div>
//                             <div className="cd-inner2 card-pool-fill">
//                                 {filteredCards.map((card) => {
//                                     return (
//                                         <NavLink to={`/cards/${card.card_number}`}>
//                                             <img
//                                                 className="cd-related-modal-card pointer"
//                                                 title={card.name}
//                                                 src={card.picture_url ? card.picture_url : "logo4p.png"}
//                                                 alt={card.name}/>
//                                         </NavLink>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                         <div className="cd-inner margin-top-20">
//                             <button onClick={handleClose}>
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>:null
//             }
//             <div className={showStats ? "rarities" : "no-rarities"}>
//                 <div style={{display: "flex", alignItems: "center"}}>
//                     <h2
//                         className="left"
//                         style={{margin: "1% 5px 1% 20px", fontWeight: "700"}}
//                         >Deck Stats</h2>
//                     <img className="logo" src="https://i.imgur.com/n86pToh.png" alt="bars icon"/>
//                     {fullLength > 0 ?
//                         <h5
//                         className="left db-pool-count"
//                         style={{marginLeft: "2px"}}
//                         >{fullLength}</h5>:
//                         null}
//                     { showStats ?
//                         <h5 className={fullLength > 0 ? "left db-pluck-count" : "hidden2"}
//                         onClick={() => handleShowStats()}>
//                                 &nbsp;[Hide]
//                         </h5> :
//                         <h5 className={fullLength > 0 ? "left db-pluck-count" : "hidden2"}
//                         onClick={() => handleShowStats()}>
//                             &nbsp;[Show]
//                         </h5>}
//                 </div>
//                 {fullLength > 0 ?
//                 <div>
//                     <div className={showStats ? "card-pool-fill4": "hidden2"}
//                         style={{marginTop: "10px"}}>
//                         <button className={stats.fighters? "stat-item" : "hidden2"}
//                             onClick={() => handleSetType(1001, "Fighters")}>
//                             Fighters: {stats.fighters}</button>
//                         <button className={stats.auras? "stat-item" : "hidden2"}
//                             onClick={() => handleSetType(1002, "Auras")}>
//                             Auras: {stats.auras}</button>
//                         <button className={stats.moves? "stat-item" : "hidden2"}
//                             onClick={() => handleSetType(1003, "Moves")}>
//                             Moves: {stats.moves}</button>
//                         <button className={stats.endings? "stat-item" : "hidden2"}
//                             onClick={() => handleSetType(1004, "Endings")}>
//                             Endings: {stats.endings}</button>
//                         <button className={stats.anyTypes? "stat-item" : "hidden2"}
//                             onClick={() => handleSetType(1005, "Any Types")}>
//                             Any Types: {stats.anyTypes}</button>
//                         <button className={stats.items? "stat-item" : "hidden2"}
//                             onClick={() => handleSetType(1006, "Items")}>
//                             Items: {stats.items}</button>
//                         <button className={stats.events? "stat-item" : "hidden2"}
//                             onClick={() => handleSetType(1007, "Events")}>
//                             Events: {stats.events}</button>
//                         <button className={stats.comebacks? "stat-item" : "hidden2"}
//                             onClick={() => handleSetType(1008, "Comebacks")}>
//                             Comebacks: {stats.comebacks}</button>
//                         <button className={stats.staunch? "stat-item" : "hidden2"}
//                             onClick={() => handleSetClass("Staunch", "Staunch")}>
//                             Staunch: {stats.staunch}</button>
//                         <button className={stats.power? "stat-item" : "hidden2"}
//                             onClick={() => handleSetClass("Power", "Power")}>
//                             Power: {stats.power}</button>
//                         <button className={stats.unity? "stat-item" : "hidden2"}
//                             onClick={() => handleSetClass("Unity", "Unity")}>
//                             Unity: {stats.unity}</button>
//                         <button className={stats.canny? "stat-item" : "hidden2"}
//                             onClick={() => handleSetClass("Canny", "Canny")}>
//                             Canny: {stats.canny}</button>
//                     </div>
//                 </div>
//                 :
//                 <h4 className="left no-cards">No cards added</h4>}
//             </div>
//         </div>
//     )
// }

// export default StatsPanel

// const playCard = (card, index, deckType) => {
//   const pluckZones = {...activePluck}
//   if (deckType === "main") {
//       const playZones = {...playArea}
//       const extra_slots = ["slot_5", "slot_6", "slot_7", "slot_8"]
//       const nextAvailableSlot = extra_slots.find(slot => playZones[slot].length === 0)
//       const fighter_slot = playZones.fighter_slot
//       const aura_slot = playZones.aura_slot
//       const move_slot = playZones.move_slot
//       const ending_slot = playZones.ending_slot
//       const newHand = [...hand]
//       if (card.card_type[0].name === "Fighter") {
//           if (fighter_slot.length === 0) {
//               fighter_slot.push(card)
//           } else if (nextAvailableSlot) {
//               playZones[nextAvailableSlot].push(card)
//           } else {
//               console.error("No available slots")
//           }
//       } else if (card.card_type[0].name === "Aura") {
//           if (aura_slot.length === 0) {
//               aura_slot.push(card)
//           } else if (nextAvailableSlot) {
//               playZones[nextAvailableSlot].push(card)
//           } else {
//               console.error("No available slots")
//           }
//       } else if (card.card_type[0].name === "Move") {
//           if (move_slot.length === 0) {
//               move_slot.push(card)
//           } else if (nextAvailableSlot) {
//               playZones[nextAvailableSlot].push(card)
//           } else {
//               console.error("No available slots")
//           }
//       } else if (card.card_type[0].name === "Ending") {
//           if (ending_slot.length === 0) {
//               ending_slot.push(card)
//           } else if (nextAvailableSlot) {
//               playZones[nextAvailableSlot].push(card)
//           } else {
//               console.error("No available slots")
//           }
//       }
//       console.log(card, index)
//       setHand(newHand.filter((_, i) => i !== index))
//       setPlayArea(playZones)
//   }
// }

// const newPlayArea = {...player.playArea}
// const selectZone = [...newPlayArea[zone]]
// const newDiscardPile = [...player.mainDiscard]
// newDiscardPile.push(card)
// selectZone.filter((_, i) => i !== index)
// newPlayArea[zone] = selectZone
// console.log(playArea)
// setDiscard(newDiscardPile)
// setPlayArea(newPlayArea)


// <div className="card-pool-fill-hand">
// {player.ownership.map((card, index) => {
//     return (
//         <div style={{display: "flex", justifyContent: "center"}}>
//             <img
//                 onClick={() => selectPluck(index)}
//                 onMouseEnter={() => handleHoveredCard(card)}
//                 className={
//                     selectedPluckIndex === index?
//                     "selected builder-card pointer glow3"
//                 :
//                     "builder-card pointer glow3"
//                 }
//                 title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
//                 src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
//                 alt={card.name}/>
//         </div>
//     );
// })}
// </div>

//when clicking works: no card in hand then card added -- works again when a new card is drawn; before playing a card
