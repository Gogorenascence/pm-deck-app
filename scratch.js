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
