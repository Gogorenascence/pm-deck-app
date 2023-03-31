import {
    Container,
    Col,
    Row,
    Card,
} from "react-bootstrap";
import { Link } from 'react-router-dom';

function TopRow() {
  return (
    <div>
      <Container>
        <Row xs={1} sm={2} md={3} lg={3} xl={5} className="g-3">
          <Col>
            <Link to="/deck-builder">
              <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
                <Card.Img src="mv2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto zindex-0">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Deck Builder</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/decks">
              <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
                <Card.Img src="1b109Jet and Climber2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Decks</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/cards">
              <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
                <Card.Img src="1r307Burst Esper2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Cards</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/articles">
              <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
                <Card.Img src="gcb20.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Articles</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/gameplay">
              <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
                <Card.Img src="gcb17.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Game Play</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TopRow;
