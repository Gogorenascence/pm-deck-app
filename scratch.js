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



import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import GameBoard from "./GameBoard";
import PositionSlider from "./PositionSlider";
import CardInfoPanel from "./CardInfoPanel";
import LogChatPanel from "./LogChatPanel";
import {
    specialSound,
    destroySound,
    shuffleSound,
    summonSound,
    drawSound,
    gainSound,
    activateSound,
    discardSound,
    menuSound,
    startSound,
    equipSound,
    flipSound
} from "../Sounds/Sounds";


function SimulatorPage() {
    document.body.classList.add("dark")
    const {
        game,
        setGame,
        player,
        setPlayer,
        playerMainDeck,
        setPlayerMainDeck,
        playerPluckDeck,
        setPlayerPluckDeck,
        playArea,
        setPlayArea,
        activePluck,
        setActivePluck,
        handleChangeTransformRotateX,
        handleChangeScale,
        handleChangePosition,
        fieldStyle,
        showExtra,
        setShowExtra,
        volume,
        setVolume,
        addToLog,
        faceDown,
        setFaceDown,
        playingFaceDown,
        setPlayingFaceDown
    } = useContext(GameStateContext)

    const [selectedMainDeck, setSelectedMainDeck] = useState({
        name: "",
        cards: []
    })
    const [selectedPluckDeck, setSelectedPluckDeck] = useState({
        name: "",
        cards: []
    })
    const [decks, setDecks] = useState([])
    const [cards, setCards] = useState([])
    const [hand, setHand] = useState(player.hand)
    const [ownership, setOwnership] = useState(player.ownership)
    const [discard, setDiscard] = useState(player.mainDiscard)
    const [pluckDiscard, setPluckDiscard] = useState(player.pluckDiscard)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [selectedPluckIndex, setSelectedPluckIndex] = useState(null)
    const [hoveredCard, setHoveredCard] = useState("")
    const [prompt, setPrompt] = useState({
        message: "",
        action: "",
    })
    const [fromDeck, setFromDeck] = useState(false)
    const [fromDiscard, setFromDiscard] = useState(false)
    const [showCardMenu, setShowCardMenu] = useState(null)
    const [showPluckMenu, setShowPluckMenu] = useState(null)
    const [loading, setLoading] = useState(false)
    const [placing, setPlacing] = useState(true)
    const [shuffling, setShuffling] = useState(false)
    const [shufflingPluck, setShufflingPluck] = useState(false)

    const getDecks = async() =>{
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const data = await response.json();
        setDecks(data.decks.sort((a,b) => a.name.localeCompare(b.name)));
        setLoading(false)
    };

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/full_cards/`);
        const cardData = await response.json();
        setCards(cardData.cards);
    };

    useEffect(() => {
        getCards();
        getDecks();

        document.title = "Simulator - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    useEffect(() => {
        if (selectedIndex === null && selectedPluckIndex === null) {
            setPrompt({message: "", action: ""})
        }
    }, [showCardMenu, showPluckMenu])

    const handleChangeDeck = (event) => {
        const deckID = event.target.value
        const deckFound = decks.find(deck => deck.id === deckID)
        setSelectedMainDeck({
            name: deckFound.name + " Main",
            cards: deckFound.cards
        });
        setSelectedPluckDeck({
            name: deckFound.name + " Pluck",
            cards: deckFound.pluck
        })
    };

    const fillDecks = (event) => {
        const filledMainDeck = selectedMainDeck.cards.map(cardNumber =>
            cards.find(card => card.card_number === cardNumber)
        );
        const filledPluckDeck = selectedPluckDeck.cards.map(cardNumber =>
            cards.find(card => card.card_number === cardNumber)
        );
        setPlayerMainDeck({name: selectedMainDeck.name, cards: filledMainDeck})
        setPlayerPluckDeck({name: selectedPluckDeck.name, cards: filledPluckDeck})
        equipSound(volume)
        addToLog("System", "system", `${selectedMainDeck.name} selected`)
    }

    useEffect(() => {
        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            mainDeck: playerMainDeck.cards,
            pluckDeck: playerPluckDeck.cards,
            hand: hand,
            ownership: ownership,
            playArea: playArea,
            activePluck: activePluck,
            mainDiscard: discard,
            pluckDiscard: pluckDiscard
        }));
    }, [playerMainDeck, playerPluckDeck, hand, ownership, playArea, activePluck, discard, pluckDiscard]);

    const allPlayerPluck = player.activePluck.slot_1?.length +
        player.activePluck.slot_2?.length +
        player.activePluck.slot_3?.length +
        player.activePluck.slot_4?.length

    const isShuffling = () => {
        setShuffling(true)
        setTimeout(() => setShuffling(false), 1000)
    }

    const isShufflingPluck = () => {
        setShufflingPluck(true)
        setTimeout(() => setShufflingPluck(false), 1000)
    }

    const shuffleMainDeck = () => {
        isShuffling()
        const shuffledDeck = [...playerMainDeck.cards]
        let currentMainIndex = shuffledDeck.length, randomMainIndex;
        // While there remain elements to shuffle.
        while (currentMainIndex !== 0) {
            // Pick a remaining element.
            randomMainIndex = Math.floor(Math.random() * currentMainIndex);
            currentMainIndex--;
            // And swap it with the current element.
            [shuffledDeck[currentMainIndex], shuffledDeck[randomMainIndex]] = [
            shuffledDeck[randomMainIndex], shuffledDeck[currentMainIndex]];
        }
        setPlayerMainDeck({name: selectedMainDeck.name, cards: shuffledDeck});
        shuffleSound(volume)
        addToLog("System", "system", "Shuffling Main deck")
    }

    const shufflePluckDeck = () => {
        isShufflingPluck()
        const shuffledDeck = [...playerPluckDeck.cards]
        let currentPluckIndex = shuffledDeck.length, randomPluckIndex;
        // While there remain elements to shuffle.
        while (currentPluckIndex !== 0) {
            // Pick a remaining element.
            randomPluckIndex = Math.floor(Math.random() * currentPluckIndex);
            currentPluckIndex--;
            // And swap it with the current element.
            [shuffledDeck[currentPluckIndex], shuffledDeck[randomPluckIndex]] = [
            shuffledDeck[randomPluckIndex], shuffledDeck[currentPluckIndex]];
        }
        setPlayerPluckDeck({name: selectedPluckDeck.name, cards: shuffledDeck});
        shuffleSound(volume)
        addToLog("System", "system", "Shuffling Pluck deck")
    }

    const gameStart = () => {
        const shuffledMainDeck = [...playerMainDeck.cards]
        let currentMainIndex = shuffledMainDeck.length, randomMainIndex;
        // While there remain elements to shuffle.
        while (currentMainIndex !== 0) {
            // Pick a remaining element.
            randomMainIndex = Math.floor(Math.random() * currentMainIndex);
            currentMainIndex--;
            // And swap it with the current element.
            [shuffledMainDeck[currentMainIndex], shuffledMainDeck[randomMainIndex]] = [
            shuffledMainDeck[randomMainIndex], shuffledMainDeck[currentMainIndex]];
        }
        setHand(shuffledMainDeck.slice(0,6))
        // soundLoop(drawSound, 6, .07)
        gainSound(volume)
        startSound(volume)
        setPlayerMainDeck({name: selectedMainDeck.name, cards: shuffledMainDeck.slice(6)});

        const shuffledPluckDeck = [...playerPluckDeck.cards]
        let currentPluckIndex = shuffledPluckDeck.length, randomPluckIndex;
        // While there remain elements to shuffle.
        while (currentPluckIndex !== 0) {
            // Pick a remaining element.
            randomPluckIndex = Math.floor(Math.random() * currentPluckIndex);
            currentPluckIndex--;
            // And swap it with the current element.
            [shuffledPluckDeck[currentPluckIndex], shuffledPluckDeck[randomPluckIndex]] = [
            shuffledPluckDeck[randomPluckIndex], shuffledPluckDeck[currentPluckIndex]];
        }
        setOwnership([shuffledPluckDeck[0]])
        setPlayerPluckDeck({name: selectedPluckDeck.name, cards: shuffledPluckDeck.slice(1)});
        setGame(true)
        addToLog("System", "system", "Game Start!")
    }

    const checkPlayer = () => {
        console.log(player)
        activateSound(volume)
        // soundLoop(drawSound, 6, .1)
    }

    const resetPlayer = () => {
        setPlayerMainDeck({name: "", cards: []})
        setPlayerPluckDeck({name: "", cards: []})
        setDiscard([])
        setPluckDiscard([])
        setHand([])
        setOwnership([])
        setPlayArea({
            fighter_slot: [],
            aura_slot: [],
            move_slot: [],
            ending_slot: [],
            slot_5: [],
            slot_6: [],
            slot_7: [],
            slot_8: [],
        })
        setActivePluck({
            slot_1: [],
            slot_2: [],
            slot_3: [],
            slot_4: [],
        })
        setGame(false)
        addToLog("System", "system", "Player was reset")
    }

    const mute = () => {
        volume > 0? setVolume(0) : setVolume(0.05)
    }

    const drawCard = () => {
        if (hand.length < 8) {
            const newHand = [...hand]
            const newMainDeck = [...playerMainDeck.cards]
            newHand.push(newMainDeck[0])
            drawSound(volume)
            setHand(newHand)
            setPlayerMainDeck({
                name: selectedMainDeck.name,
                cards: newMainDeck.slice(1)
            });
        } else {
            addToLog("System", "system", "You can have more than 8 cards in your hand.")
        }
    }

    const addCardFromDeck = (index, unfurling) => {
        if (hand.length < 8) {
            const newHand = [...hand]
            const newMainDeck = [...playerMainDeck.cards]
            const cardToAdd = newMainDeck[index]
            newHand.push(cardToAdd)
            drawSound(volume)
            setHand(newHand)
            const newShuffledMainDeck = newMainDeck.filter((_, i) => i !== index)
            isShuffling()
            if (unfurling === false) {
                let currentMainIndex = newShuffledMainDeck.length, randomMainIndex;
                while (currentMainIndex !== 0) {
                    randomMainIndex = Math.floor(Math.random() * currentMainIndex);
                    currentMainIndex--;
                    [newShuffledMainDeck[currentMainIndex], newShuffledMainDeck[randomMainIndex]] = [
                    newShuffledMainDeck[randomMainIndex], newShuffledMainDeck[currentMainIndex]];
                }
                shuffleSound(volume)
            }
            setPlayerMainDeck({
                name: selectedMainDeck.name,
                cards: newShuffledMainDeck
            });
            !unfurling?
                addToLog("System", "system", `"${cardToAdd.name}" was added from the deck to ${player.name}'s hand`):
                addToLog("System", "system", `"${cardToAdd.name}" was added from the unfurled cards to ${player.name}'s hand`)
        } else {
            addToLog("System", "system", "You can have more than 8 cards in your hand.")
        }
    }

    const addCardFromDiscard = (index) => {
        if (hand.length < 8) {
            const newHand = [...hand]
            const newDiscardPile = [...discard]
            const cardToAdd = newDiscardPile[index]
            newHand.push(cardToAdd)
            setHand(newHand)
            setDiscard(newDiscardPile.filter((_, i) => i !== index))
            drawSound(volume);
            addToLog("System", "system", `"${cardToAdd.name}" was added from discard pile to ${player.name}'s hand`)
        } else {
            addToLog("System", "system", "You can have more than 8 cards in your hand.")
        }
    }

    const discardFromDeck = (index) => {
        const newDiscardPile = [...discard]
        const newMainDeck = [...playerMainDeck.cards]
        const cardToDiscard = newMainDeck[index]
        newDiscardPile.push(cardToDiscard)
        setDiscard(newDiscardPile)
        setPlayerMainDeck({
            name: selectedMainDeck.name,
            cards: newMainDeck.filter((_, i) => i !== index)
        });
        discardSound(volume)
        addToLog("System", "system", `${player.name} discarded "${cardToDiscard.name}" from their deck`)
    }

    const drawPluck = () => {
        if (ownership.length + allPlayerPluck < 8) {
            const newOwnership = [...ownership]
            const newPluckDeck = [...playerPluckDeck.cards]
            newOwnership.push(newPluckDeck[0])
            setOwnership(newOwnership)
            gainSound(volume)
            setPlayerPluckDeck({
                name: selectedPluckDeck.name,
                cards: newPluckDeck.slice(1)
            });
        } else {
            addToLog(
                "System",
                "system",
                "You can have more than 8 Pluck between in your Ownership and Active Pluck."
            )
        }
    }

    const addPluckFromDeck = (index, unfurling) => {
        if (ownership.length + allPlayerPluck < 8) {
            const newOwnership = [...ownership]
            const newPluckDeck = [...playerPluckDeck.cards]
            const cardToAdd = newPluckDeck[index]
            newOwnership.push(cardToAdd)
            gainSound(volume)
            setOwnership(newOwnership)
            const newShuffledPluckDeck = newPluckDeck.filter((_, i) => i !== index)
            if (unfurling === false) {
                isShufflingPluck()
                let currentPluckIndex = newShuffledPluckDeck.length, randomPluckIndex;
                while (currentPluckIndex !== 0) {
                    randomPluckIndex = Math.floor(Math.random() * currentPluckIndex);
                    currentPluckIndex--;
                    [newShuffledPluckDeck[currentPluckIndex], newShuffledPluckDeck[randomPluckIndex]] = [
                    newShuffledPluckDeck[randomPluckIndex], newShuffledPluckDeck[currentPluckIndex]];
                }
                shuffleSound(volume)
            }
            setPlayerPluckDeck({
                name: selectedPluckDeck.name,
                cards: newShuffledPluckDeck
            });
            !unfurling?
                addToLog("System", "system", `"${cardToAdd.name}" was added from Pluck deck to ${player.name}'s ownership`):
                addToLog("System", "system", `"${cardToAdd.name}" was added from the unfurled Pluck to ${player.name}'s ownership`)
            } else {
            addToLog(
                "System",
                "system",
                "You can have more than 8 Pluck between in your Ownership and Active Pluck."
            )
        }
    }

    const addPluckFromDiscard = (index) => {
        if (ownership.length + allPlayerPluck < 8) {
            const newOwnership = [...ownership]
            const newDiscardPile = [...pluckDiscard]
            const cardToAdd = newDiscardPile[index]
            newOwnership.push(cardToAdd)
            setOwnership(newOwnership)
            gainSound(volume)
            setPluckDiscard(newDiscardPile.filter((_, i) => i !== index));
            addToLog("System", "system", `"${cardToAdd.name}" was added from Pluck discard pile to ${player.name}'s ownership`)
        } else {
            addToLog(
                "System",
                "system",
                "You can have more than 8 Pluck between in your Ownership and Active Pluck."
            )
        }
    }

    const discardFromPluckDeck = (index) => {
        const newPluckDiscardPile = [...pluckDiscard]
        const newPluckDeck = [...playerPluckDeck.cards]
        const pluckToDiscard = newPluckDeck[index]
        newPluckDiscardPile.push(pluckToDiscard)
        setPluckDiscard(newPluckDiscardPile)
        setPlayerPluckDeck({
            name: selectedPluckDeck.name,
            cards: newPluckDeck.filter((_, i) => i !== index)
        });
        discardSound(volume)
        addToLog("System", "system", `${player.name} discarded "${pluckToDiscard.name}" from their Pluck deck`)
    }

    const handleShowCardMenu = (index, event) => {
        event.preventDefault()
        showCardMenu === index?
            setShowCardMenu(null):
            setShowCardMenu(index)
        menuSound(volume)
    }

    const selectCard = (index) => {
        setShowCardMenu(null)
        if (selectedIndex === index) {
            setSelectedIndex(null)
            setPrompt({message: "", action: ""})
            setFromDeck(false)
            setFromDiscard(false)
        } else {
            setSelectedIndex(index)
            !placing?
            setPrompt({
                message: "Select a Zone to Play Your Card!",
                action: "playArea"
            }):
            setPrompt({
                message: "Select a Zone to Place Your Card!",
                action: "playArea"
            })
        }
    }

    const handleCardFromHand = (index) => {
        setFromDeck(false)
        setFromDiscard(false)
        setPlacing(false)
        selectCard(index)
    }

    const handlePlaceCardFromHand = (index) => {
        setFromDeck(false)
        setFromDiscard(false)
        setPlacing(true)
        selectCard(index)
    }

    const selectPluck = (index) => {
        selectedPluckIndex === index? setSelectedPluckIndex(null): setSelectedPluckIndex(index)
        !placing?
        setPrompt({
            message: "Select a Zone to Play Your Pluck!",
            action: "activePluck"
        }):
        setPrompt({
            message: "Select a Zone to Place Your Pluck!",
            action: "activePluck"
        })
    }

    const playCard = (zone, zoneFaceDown) => {
        if (selectedIndex !== null) {
            if (fromDeck) {
                const playedCard = playerMainDeck.cards[selectedIndex]
                const newMainDeck = [...playerMainDeck.cards]
                const playZones = {...player.playArea}
                const selectZone = playZones[zone]
                setPrompt({message: "", action: ""})
                !placing? selectZone.push(playedCard): selectZone.unshift(playedCard)
                specialSound(volume)
                setPlayerMainDeck({
                    name: selectedMainDeck.name,
                    cards: newMainDeck.filter((_, i) => i !== selectedIndex)
                });
                setSelectedIndex(null)
                setFromDeck(false)
                setPlayArea(playZones)
                addToLog("System", "system", `${player.name} played "${playedCard.name}" from the deck`)
            } else if (fromDiscard) {
                const playedCard = player.mainDiscard[selectedIndex]
                const playZones = {...player.playArea}
                const selectZone = playZones[zone]
                const newDiscardPile = [...player.mainDiscard]
                setPrompt({message: "", action: ""})
                !placing? selectZone.push(playedCard): selectZone.unshift(playedCard)
                specialSound(volume)
                setDiscard(newDiscardPile.filter((_, i) => i !== selectedIndex))
                setSelectedIndex(null)
                setFromDiscard(false)
                setPlayArea(playZones)
                addToLog("System", "system", `${player.name} played "${playedCard.name}" from the discard pile`)
            } else {
                const playedCard = player.hand[selectedIndex]
                const playZones = {...player.playArea}
                const selectZone = playZones[zone]
                const newHand = [...player.hand]
                setPrompt({message: "", action: ""})
                !placing? selectZone.push(playedCard): selectZone.unshift(playedCard)
                summonSound(volume)
                if (zoneFaceDown){
                    setFaceDown({...faceDown, [zoneFaceDown]: true})
                }
                setHand(newHand.filter((_, i) => i !== selectedIndex))
                setSelectedIndex(null)
                setFromDeck(false)
                setPlayArea(playZones)
                setShowCardMenu(null)
                zoneFaceDown? addToLog("System", "system", `${player.name} played a card face-down`):
                    addToLog("System", "system", `${player.name} played "${playedCard.name}"`)
            }
            setPlayingFaceDown(false)
            setShowCardMenu(null)
        }
    }

    const playPluck = (zone) => {
        if (selectedPluckIndex !== null) {
            const playedPluck = player.ownership[selectedPluckIndex]
            const pluckZones = {...player.activePluck}
            const selectZone = pluckZones[zone]
            const newOwnership = [...player.ownership]
            setPrompt({message: "", action: ""})
            selectZone.push(playedPluck)
            setOwnership(newOwnership.filter((_, i) => i !== selectedPluckIndex))
            setSelectedPluckIndex(null)
            specialSound(volume)
            setActivePluck(pluckZones)
            addToLog("System", "system", `${player.name} played "${playedPluck.name}"`)
        }
    }

    const discardCard = (card, index, zone) => {
        const newPlayArea = {...player.playArea}
        const selectZone = newPlayArea[zone]
        const newDiscardPile = [...player.mainDiscard]

        newDiscardPile.push(card)
        const newSelectZone = selectZone.filter((_, i) => i !== index)
        destroySound(volume)
        newPlayArea[zone] = newSelectZone

        setDiscard(newDiscardPile)
        setPlayArea(newPlayArea)
    }

    const discardCardFromHand = (index) => {
        const discardedCard = player.hand[index]
        const newDiscardPile = [...player.mainDiscard]
        const newHand = [...player.hand]
        newDiscardPile.push(discardedCard)
        setHand(newHand.filter((_, i) => i !== index))
        setDiscard(newDiscardPile)
        discardSound(volume)
        setShowCardMenu(null)
        addToLog("System", "system", `${player.name} discarded "${discardedCard.name}" from their hand`)
    }

    const topDeckCard = (index) => {
        const toppedCard = player.hand[index]
        const newCards = [...player.mainDeck]
        const newHand = [...player.hand]
        newCards.unshift(toppedCard)
        setHand(newHand.filter((_, i) => i !== index))
        setPlayerMainDeck({...playerMainDeck, cards: newCards})
        flipSound(volume)
        setShowCardMenu(null)
        addToLog("System", "system", `${player.name} returned "${toppedCard.name}" to the top of their deck`)
    }

    const bottomDeckCard = (index) => {
        const bottomCard = player.hand[index]
        const newCards = [...player.mainDeck]
        const newHand = [...player.hand]
        newCards.push(bottomCard)
        setHand(newHand.filter((_, i) => i !== index))
        setPlayerMainDeck({...playerMainDeck, cards: newCards})
        flipSound(volume)
        setShowCardMenu(null)
        addToLog("System", "system", `${player.name} returned "${bottomCard.name}" to the bottom of their deck`)
    }

    const returnDiscardedCardToDeck = (index, position) => {
        const returnedCard = player.mainDiscard[index]
        const newCards = [...player.mainDeck]
        const newDiscard = [...player.mainDiscard]
        if (position === "top") {
            newCards.unshift(returnedCard)
            addToLog("System", "system", `${player.name} returned "${returnedCard.name}" to the top of their deck`)
        } else {
            newCards.push(returnedCard)
            addToLog("System", "system", `${player.name} returned "${returnedCard.name}" to the bottom of their deck`)
        }
        setDiscard(newDiscard.filter((_, i) => i !== index))
        setPlayerMainDeck({...playerMainDeck, cards: newCards})
        flipSound(volume)
        setShowCardMenu(null)
    }

    const discardPluck = (card, index, zone) => {
        const newActivePluck = {...player.activePluck}
        const selectZone = newActivePluck[zone]
        const newDiscardPile = [...player.pluckDiscard]

        newDiscardPile.push(card)
        const newSelectZone = selectZone.filter((_, i) => i !== index)
        newActivePluck[zone] = newSelectZone
        destroySound(volume)
        setPluckDiscard(newDiscardPile)
        setActivePluck(newActivePluck)
    }

    const discardPluckFromOwnership = (index) => {
        const discardedPluck = player.ownership[index]
        const newDiscardPile = [...player.pluckDiscard]
        const newOwnership = [...player.ownership]
        newDiscardPile.push(discardedPluck)
        setOwnership(newOwnership.filter((_, i) => i !== index))
        discardSound(volume)
        setPluckDiscard(newDiscardPile)
        addToLog("System", "system", `${player.name} discarded "${discardedPluck.name}" from their ownership`)
    }

    const returnPluckToDeck = (index, position) => {
        const returnedPluck = player.ownership[index]
        const newPluck = [...player.pluckDeck]
        const newOwnership = [...player.ownership]
        if (position === "top") {
            newPluck.unshift(returnedPluck)
            addToLog("System", "system", `${player.name} returned "${returnedPluck.name}" to the top of their Pluck deck`)
        } else {
            newPluck.push(returnedPluck)
            addToLog("System", "system", `${player.name} returned "${returnedPluck.name}" to the bottom of their Pluck deck`)
        }
        setOwnership(newOwnership.filter((_, i) => i !== index))
        setPlayerPluckDeck({...playerPluckDeck, cards: newPluck})
        flipSound(volume)
        setShowCardMenu(null)
    }

    const returnDiscardedPluckToDeck = (index, position) => {
        const returnedPluck = player.pluckDiscard[index]
        const newPluck = [...player.pluckDeck]
        const newPluckDiscard = [...player.pluckDiscard]
        if (position === "top") {
            newPluck.unshift(returnedPluck)
            addToLog("System", "system", `${player.name} returned "${returnedPluck.name}" to the top of their Pluck deck`)
        } else {
            newPluck.push(returnedPluck)
            addToLog("System", "system", `${player.name} returned "${returnedPluck.name}" to the bottom of their Pluck deck`)
        }
        setPluckDiscard(newPluckDiscard.filter((_, i) => i !== index))
        setPlayerPluckDeck({...playerPluckDeck, cards: newPluck})
        flipSound(volume)
        setShowCardMenu(null)
    }

    const handleHoveredCard = (cardItem) => {
        setHoveredCard(cardItem)
    }

    return (
        <div className="cd-inner">
            <CardInfoPanel hoveredCard={hoveredCard}/>
            <div className={prompt.message? "promptBar pointer": "noPromptBar"}
                onClick={() => setPrompt({message: "", action: ""})}
            >
                <h1 className={prompt.message? null: "hidden2"}>{prompt.message}</h1>
            </div>
            <div className="cd-inner">
                <div className="deckSelect">
                    <h5 className="label">Select a Deck </h5>
                    <select
                        className="builder-input"
                        type="text"
                        placeholder=" Deck"
                        onChange={handleChangeDeck}
                        name="Deck">
                        <option value="">Deck</option>
                        {decks.map((deck) => (
                            <option value={deck.id}>{deck.name}</option>
                            ))}
                    </select>
                    <button onClick={fillDecks}>Get Deck</button>

                    {player.mainDeck.length > 0 ?
                        <>
                            <button onClick={!game? gameStart: resetPlayer}>{!game? "Game Start": "Reset Player"}</button>
                        </>:null
                    }

                    <button onClick={checkPlayer}>Player Info</button>
                    <button onClick={mute}>{volume >0? "Sound Off":"Sound On"}</button>
                </div>
                <div className={loading? "deckSelect2": "hidden2"}>
                {/* <div className="deckSelect2"> */}
                    <p>Loading decks...</p>
                </div>
            <div>
                <GameBoard
                    playArea={player.playArea}
                    activePluck={player.activePluck}
                    drawCard={drawCard}
                    addCardFromDeck={addCardFromDeck}
                    addCardFromDiscard={addCardFromDiscard}
                    drawPluck={drawPluck}
                    addPluckFromDeck={addPluckFromDeck}
                    addPluckFromDiscard={addPluckFromDiscard}
                    returnPluckToDeck={returnPluckToDeck}
                    mainDeck={player.mainDeck}
                    pluckDeck={player.pluckDeck}
                    ownership={player.ownership}
                    showPluckMenu={showPluckMenu}
                    setShowPluckMenu={setShowPluckMenu}
                    fromDeck={fromDeck}
                    setFromDeck={setFromDeck}
                    fromDiscard={fromDiscard}
                    setFromDiscard={setFromDiscard}
                    playCard={playCard}
                    playPluck={playPluck}
                    fieldStyle={fieldStyle}
                    mainDiscard={player.mainDiscard}
                    discardCard={discardCard}
                    discardFromDeck={discardFromDeck}
                    returnDiscardedCardToDeck={returnDiscardedCardToDeck}
                    pluckDiscard={player.pluckDiscard}
                    discardPluck={discardPluck}
                    discardPluckFromOwnership={discardPluckFromOwnership}
                    discardFromPluckDeck={discardFromPluckDeck}
                    returnDiscardedPluckToDeck={returnDiscardedPluckToDeck}
                    handleHoveredCard={handleHoveredCard}
                    selectCard={selectCard}
                    selectedIndex={selectedIndex}
                    selectPluck={selectPluck}
                    selectedPluckIndex={selectedPluckIndex}
                    shuffleMainDeck={shuffleMainDeck}
                    shufflePluckDeck={shufflePluckDeck}
                    showExtra={showExtra}
                    setShowExtra={setShowExtra}
                    volume={volume}
                    shuffling={shuffling}
                    shufflingPluck={shufflingPluck}
                    />

                {player.hand.length > 0 || player.ownership.length > 0?
                    <>
                        <div className="card-pool-fill-hand">
                            {player.hand.map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <div>
                                            <div className={showCardMenu === index? "card-menu": "hidden2"}>
                                                <div className="card-menu-item"
                                                    onClick={() => {
                                                        setPlayingFaceDown(false)
                                                        handleCardFromHand(index)
                                                    }}
                                                ><p>{selectedIndex === index && !playingFaceDown? "Cancel" : "Play Face-Up"}</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => {
                                                        setPlayingFaceDown(true)
                                                        handleCardFromHand(index)
                                                    }}
                                                ><p>{selectedIndex === index && playingFaceDown? "Cancel" : "Play Face-Down"}</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => handlePlaceCardFromHand(index)}
                                                ><p>Place</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => discardCardFromHand(index)}
                                                ><p>Discard</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => topDeckCard(index)}
                                                ><p>Decktop</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => bottomDeckCard(index)}
                                                ><p>Deckbottom</p></div>
                                            </div>
                                            <img
                                                onClick={(event) => handleShowCardMenu(index, event)}
                                                onContextMenu={(event) => handleShowCardMenu(index, event)}
                                                onMouseEnter={() => handleHoveredCard(card)}
                                                onDoubleClick={() => {
                                                    setPlayingFaceDown(false)
                                                    handleCardFromHand(index)
                                                }}
                                                className={
                                                    showCardMenu === index || selectedIndex === index && !fromDeck && !fromDiscard?
                                                    "selected3 builder-card-hand pointer"
                                                :
                                                    "builder-card-hand pointer"
                                                }
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                            </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>: null
                }
            </div>

            </div>
            <div className="rightSimSide">
                <PositionSlider
                    handleChangePosition={handleChangePosition}
                    handleChangeScale={handleChangeScale}
                    handleChangeTransformRotateX={handleChangeTransformRotateX}
                />
                <LogChatPanel/>
            </div>
        </div>
    );
}

export default SimulatorPage;



// import { useEffect, useMemo } from "react";
// import { useMediaQuery } from "react-responsive";
// import createPersistedState from "use-persisted-state";
// const LightPrefState = createPersistedState("colorScheme");

// export function LightPref() {
//     const systemPrefersDark = useMediaQuery(
//         {
//         query: "(prefers-color-scheme: dark)",
//         },
//         undefined
//     );

//     const [isDark, setIsDark] = LightPrefState();
//     const value = useMemo(
//         () => (isDark === undefined ? !!systemPrefersDark : isDark),
//         [isDark, systemPrefersDark]
//     );

//     useEffect(() => {
//         if (value) {
//         document.body.classList.add("dark");
//         } else {
//         document.body.classList.remove("dark");
//         }
//     }, [value]);

//     return {
//         isDark: value,
//         setIsDark,
//     };
// }


import { useState, useEffect } from "react";
import React from 'react-router-dom';


function CardModal() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true)
    const handleHide = () => setShow(false)

    return (
        <div>
            {/* <section className={`img-modal ${show ? null : "hidden2"}`}>
                <img
                    className="modal-card"
                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                    alt="Card image"/>
            </section> */}
        </div>
    );
}

export default CardModal;



        // for (let deck of sortedDecks){
        //     const date = new Date(deck["created_on"]["full_time"])
        //     const time_now = new Date();
        //     time_now.setHours(time_now.getHours() + 5);
        //     // Calculate years, months, days, hours, minutes, and seconds
        //     let ago = Math.abs(time_now - date);
        //     const years = Math.floor(ago / 31557600000);
        //     ago -= years * 31557600000;
        //     const months = Math.floor(ago / 2630016000);
        //     ago -= months * 2630016000;
        //     const days = Math.floor(ago / 86400000);
        //     ago -= days * 86400000;
        //     const hours = Math.floor(ago / 3600000);
        //     ago -= hours * 3600000;
        //     const minutes = Math.floor(ago / 60000);
        //     ago -= minutes * 60000;
        //     // Format the time difference
        //     if (years > 0) {
        //     deck["created_on"]["ago"] = `${years} year ago`;
        //     } else if (months > 0) {
        //     deck["created_on"]["ago"] = `${months} month${months > 1 ? 's' : ''} ago`;
        //     } else if (days > 0) {
        //     deck["created_on"]["ago"] = `${days} day${days > 1 ? 's' : ''} ago`;
        //     } else if (hours > 0) {
        //     deck["created_on"]["ago"] = `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 1 ? ' and ' + minutes + ' minutes ago' : ' ago'}`;
        //     } else if (minutes > 0) {
        //     deck["created_on"]["ago"] = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        //     } else {
        //     deck["created_on"]["ago"] = "a few seconds ago";
        //     }

        //     const updateDate = new Date(deck["updated_on"]["full_time"])
        //     // Calculate years, months, days, hours, minutes, and seconds
        //     let updateAgo = Math.abs(time_now - updateDate);
        //     const updateYears = Math.floor(updateAgo / 31557600000);
        //     updateAgo -= updateYears * 31557600000;
        //     const updateMonths = Math.floor(updateAgo / 2630016000);
        //     updateAgo -= updateMonths * 2630016000;
        //     const updateDays = Math.floor(updateAgo / 86400000);
        //     updateAgo -= updateDays * 86400000;
        //     const updateHours = Math.floor(updateAgo / 3600000);
        //     updateAgo -= updateHours * 3600000;
        //     const updateMinutes = Math.floor(updateAgo / 60000);
        //     updateAgo -= updateMinutes * 60000;
        //     // Format the time difference
        //     if (updateYears > 0) {
        //     deck["updated_on"]["ago"] = `${updateYears} year ago`;
        //     } else if (updateMonths > 0) {
        //     deck["updated_on"]["ago"] = `${updateMonths} month${updateMonths > 1 ? 's' : ''} ago`;
        //     } else if (updateDays > 0) {
        //     deck["updated_on"]["ago"] = `${updateDays} day${updateDays > 1 ? 's' : ''} ago`;
        //     } else if (updateHours > 0) {
        //     deck["updated_on"]["ago"] = `${updateHours} hour${updateHours > 1 ? 's' : ''} ${updateMinutes > 1 ? ' and ' + updateMinutes + ' minutes ago' : ' ago'}`;
        //     } else if (updateMinutes > 0) {
        //     deck["updated_on"]["ago"] = `${updateMinutes} minute${updateMinutes > 1 ? 's' : ''} ago`;
        //     } else {
        //     deck["updated_on"]["ago"] = "a few seconds ago";
        //     }
        // }

        {
            "title": "Test Article",
            "subtitle": "This is a Test",
            "author": "John Cussack",
            "created": "2-6-2024",
            "section": "Lore",
            "text": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.//Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.//Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.//Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?//Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
            "images": {
              "1": [
                {
                  "src": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g1pmf.png",
                  "caption": "This is another card image",
                  "link": "cards/1001",
                  "order": 8,
                  "alt_text": "PantheraMan"
                }
              ],
              "4": [
                {
                  "src": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g2gwm.png",
                  "caption": "This is a card image",
                  "link": "cards/1007",
                  "order": 2,
                  "alt_text": "Swift Guard"
                },
                {
                  "src": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g2gwf.png",
                  "caption": "This is also a card image",
                  "link": "cards/1005",
                  "order": 0,
                  "alt_text": "Golden Wall"
                }
              ]

            }
          }
          {Array.apply(0, Array(imageCount)).map((image, index) =>
            <button onClick={() => handleAddImage(index + 1)}>{index}</button>
        )}
