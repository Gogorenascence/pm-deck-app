const then = "2022-06-26T16:23:23.488Z";

// Convert the string to a Date object
const thenDate = new Date(then);

// Get the current time
const timeNow = new Date();

// Calculate the time difference
const timeDifference = timeNow - thenDate;

// Define time units
const oneMinute = 60 * 1000; // milliseconds
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;
const oneMonth = oneDay * 30.44;
const oneYear = oneDay * 365.25;

// Calculate years, months, days, hours, minutes, and seconds
let ago = Math.abs(timeDifference);
const years = Math.floor(ago / oneYear);
ago -= years * oneYear;
const months = Math.floor(ago / oneMonth);
ago -= months * oneMonth;
const days = Math.floor(ago / oneDay);
ago -= days * oneDay;
const hours = Math.floor(ago / oneHour);
ago -= hours * oneHour;
const minutes = Math.floor(ago / oneMinute);
ago -= minutes * oneMinute;
const seconds = Math.floor(ago / 1000);

// Format the time difference
if (years > 0) {
  console.log(`${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''} ago`);
} else if (months > 0) {
  console.log(`${months} month${months > 1 ? 's' : ''}, ${hours} hours, ${minutes} minutes, and ${seconds} seconds ago`);
} else if (days > 0) {
  console.log(`${days} day${days > 1 ? 's' : ''}, ${hours} hours, ${minutes} minutes, and ${seconds} seconds ago`);
} else if (hours > 0) {
  console.log(`${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minutes, and ${seconds} seconds ago`);
} else if (minutes > 0) {
  console.log(`${minutes} minute${minutes > 1 ? 's' : ''} and ${seconds} seconds ago`);
} else {
  console.log(`${seconds} seconds ago`);
}



<Card className="text-white text-center card-list-card">
  <div className="card-image-wrapper">
    <div className="card-image-clip">
      <Card.Img
        src={deck.cover_card ? deck.cover_card : ""}
        alt="Card image"
        variant="bottom"
        className="card-image"
      />
    </div>
  </div>
  <Card.ImgOverlay className="blackfooter2 mt-auto">
    <h5>{deck.name}</h5>
    {/* Other card content */}
  </Card.ImgOverlay>
</Card>


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
