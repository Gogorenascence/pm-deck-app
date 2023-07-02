import {
    Card,
} from "react-bootstrap";
import { Link } from 'react-router-dom';

function TopRow() {
  return (
    <div className="white-space">
      <div className="cd-inner">
          <div style={{width: "230px", margin: "0px 5px"}}>
            <Link to="/deckbuilder">
              <Card className="bg-dark text-white text-center" style={{ width: '230px' }}>
                <Card.Img src="mv2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto zindex-0">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Deck Builder</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </div>
          <div style={{width: "230px", margin: "0px 5px"}}>
            <Link to="/decks">
              <Card className="bg-dark text-white text-center" style={{ width: '230px' }}>
                <Card.Img src="1b109Jet and Climber2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Decks</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </div>
          <div style={{width: "230px", margin: "0px 5px"}}>
            <Link to="/cards">
              <Card className="bg-dark text-white text-center" style={{ width: '230px' }}>
                <Card.Img src="1r307Burst Esper2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Cards</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </div>
          <div style={{width: "230px", margin: "0px 5px"}}>
            {/* <Link to="/articles"> */}
              <Card className="bg-dark text-white text-center" style={{ width: '230px' }}>
                <Card.Img src="gcb20-2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Articles</Card.Title>
                </Card.ImgOverlay>
              </Card>
            {/* </Link> */}
          </div>
          <div style={{width: "230px", margin: "0px 5px"}}>
            {/* <Link to="/gameplay"> */}
              <Card className="bg-dark text-white text-center" style={{ width: '230px' }}>
                <Card.Img src="gcb17-2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Game Play</Card.Title>
                </Card.ImgOverlay>
              </Card>
            {/* </Link> */}
          </div>
      </div>
    </div>
  );
}

export default TopRow;
