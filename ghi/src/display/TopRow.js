import {
    Container,
    Col,
    Row,
    Card,
} from "react-bootstrap";

function TopRow() {
  return (
    <div>
<Container>
    <Row md={5} className="g-4">
        <Col>
        <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
      <Card.Img src="ge3.png" alt="Card image" variant="bottom"/>
      <Card.ImgOverlay className="blackfooter mt-auto">
        <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Deck Builder</Card.Title>
      </Card.ImgOverlay>
    </Card>
    </Col>
    <Col>
        <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
      <Card.Img src="ge3.png" alt="Card image" variant="bottom"/>
      <Card.ImgOverlay className="blackfooter mt-auto">
        <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">New Decks</Card.Title>
      </Card.ImgOverlay>
    </Card>
    </Col>
    <Col>
        <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
      <Card.Img src="ge3.png" alt="Card image" variant="bottom"/>
      <Card.ImgOverlay className="blackfooter mt-auto">
        <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Popular Cards</Card.Title>
      </Card.ImgOverlay>
    </Card>
    </Col>
    <Col>
        <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
      <Card.Img src="ge3.png" alt="Card image" variant="bottom"/>
      <Card.ImgOverlay className="blackfooter mt-auto">
        <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Articles</Card.Title>
      </Card.ImgOverlay>
    </Card>
    </Col>
    <Col>
        <Card className="bg-dark text-white text-center" style={{ width: '250px' }}>
      <Card.Img src="ge3.png" alt="Card image" variant="bottom"/>
      <Card.ImgOverlay className="blackfooter mt-auto">
        <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Game Play</Card.Title>
      </Card.ImgOverlay>
    </Card>
        </Col>
    </Row>
    </Container>
    </div>
  );
}

export default TopRow;
