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
        src={deck.cover_card ? deck.cover_card : "logo4p.png"}
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
