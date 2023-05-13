import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import DeckBuilder from "./Builder/DeckBuilder"
import DecksPage from "./Decks/DecksPage"
import DeckDetailPage from "./Decks/DeckDetailPage";
import DeckEditPage from "./Decks/DeckEditPage";
import CardsPage from "./Cards/CardsPage"
import CardCreatePage from "./Cards/CardCreatePage";
import CardDetailPage from "./Cards/CardDetailPage";
import ArticlesPage from "./Articles/ArticlesPage"
import GamePlayPage from "./GamePlay/GamePlayPage"
import ForumPage from "./Forum/ForumPage"
import UnderConstruction from "./display/UnderConstruction";
import Nav from "./Nav";
import Footer from "./Footer";
import BackToTop from "./display/BackToTop";
import "./index.css"
import "./Massive.css"


function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <BackToTop/>
      <div className="App">

        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/deckbuilder" element={<DeckBuilder />} />
          <Route path="/decks" element={<DecksPage />} />
          <Route path="/decks/:deck_id" element={<DeckDetailPage />} />
          <Route path="/decks/:deck_id/edit" element={<DeckEditPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/cards/create" element={<CardCreatePage />} />
          <Route path="/cards/:card_number" element={<CardDetailPage />} />
          <Route path="/cards/popular" element={<UnderConstruction />} />
          <Route path="/cards/series" element={<UnderConstruction />} />
          <Route path="/cards/products" element={<UnderConstruction />} />
          <Route path="/articles" element={<UnderConstruction />} />
          <Route path="/gameplay" element={<UnderConstruction />} />
          <Route path="/forum" element={<UnderConstruction />} />
        </Routes>

      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
