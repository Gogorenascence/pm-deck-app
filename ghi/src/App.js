import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import DeckBuilder from "./Builder/DeckBuilder"
import DecksPage from "./Decks/DecksPage"
import DeckDetailPage from "./Decks/DeckDetailPage";
import CardsPage from "./Cards/CardsPage"
import CardCreatePage from "./Cards/CardCreatePage";
import CardDetailPage from "./Cards/CardDetailPage";
import ArticlesPage from "./Articles/ArticlesPage"
import GamePlayPage from "./GamePlay/GamePlayPage"
import ForumPage from "./Forum/ForumPage"
import Nav from "./Nav";
import "./index.css"
import "./Massive.css"


function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <div className="App">

        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/deckbuilder" element={<DeckBuilder />} />
          <Route path="/decks" element={<DecksPage />} />
          <Route path="/decks/:deck_id" element={<DeckDetailPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/cards/create" element={<CardCreatePage />} />
          <Route path="/cards/:card_number" element={<CardDetailPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/gameplay" element={<GamePlayPage />} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
