// import SearchBar from "./Reviews/Search";
import {
    Container,
    InputGroup,
    FormControl,
    Button,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
// import AlbumModal from "./AlbumModal";

// export default function SearchBar() {
//     const [searchInput, setSearchInput] = useState("");
//     const [albums, setAlbums] = useState([]);

//   async function search() {
//     await fetch(
//       `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/artists/${searchInput}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         let albums_with_dupes = data.items;
//         const seen = new Set();
//         const uniqueAlbums = albums_with_dupes.filter((album) => {
//           const duplicate = seen.has(album.name);
//           seen.add(album.name);
//           return !duplicate;
//         });
//         setAlbums(uniqueAlbums);
//       });
//   }
//   function Display() {
//     document.getElementById("dark-logo").style.display = "none";
//     document.getElementById("light-logo").style.display = "none";
//   }

function MainPage() {
    const [decks, setDecks] = useState([]);
    const [cards, setCards] = useState([]);

    const getData = async() =>{
        const deckResponse = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`);
        const cardResponse = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const decks = await deckResponse.json();
        const cards = await cardResponse.json();
        setDecks(decks.slice(-5));
        setCards(cards.slice(-5));
    };

    useEffect(() => {
        getData();
    })


    return (
        <div className="App" style={{ marginTop: "30px" }}>
            <Container>
                <Row className="mx-2 row row-cols-5">
                            <Card>
                                <p>Deck Builder</p>
                            </Card>
                            <Card>
                                <p>New Decks</p>
                            </Card>
                            <Card>
                                <p>Popular Cards</p>
                            </Card>
                            <Card>
                                <p>Articles</p>
                            </Card>
                            <Card>
                                <p>Game Play</p>
                            </Card>
                </Row>
            </Container>

            <Container>
                <Row className="mx-2 row row-cols-5">
                    {decks.map((deck) => {
                        return (
                            <Card
                                key={deck.id}
                                variant="primary">
                                <p>{deck.name}</p>
                            </Card>
                        );
                    })}
                </Row>
            </Container>

            <Container>
                <Row className="mx-2 row row-cols-5">
                    {cards.map((card) => {
                        return (
                            <Card
                                key={card.id}
                                variant="primary">
                                <p>{card.name}</p>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default MainPage;
