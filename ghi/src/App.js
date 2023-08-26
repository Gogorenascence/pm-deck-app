import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useContext } from "react";
import MainPage from "./MainPage";
import DeckBuilder from "./Builder/DeckBuilder"
import DecksPage from "./Decks/DecksPage"
import DeckDetailPage from "./Decks/DeckDetailPage";
import DeckEditPage from "./Decks/DeckEditPage";
import DeckCopyPage from "./Builder/DeckCopyPage";
import CardsPage from "./Cards/CardsPage"
import CardCreatePage from "./Cards/CardCreatePage";
import CardDetailPage from "./Cards/CardDetailPage";
import TopCardsPage from "./Cards/TopCardsPage";
import SetsPage from "./Cards/SetsPage";
import SetDetailPage from "./Cards/SetDetailPage";
import PullPage from "./Cards/PullPage";
import UnderConstruction from "./display/UnderConstruction";
import Nav from "./Nav";
import Footer from "./Footer";
import LightSwitch from "./display/LightSwitch";
import BackToTop from "./display/BackToTop";
import "./index.css"
import "./Massive.css"
import AppProvider from "./context/AppProvider";
import PullsDeckBuilder from "./Decks/PullsDeckBuilder";


function App() {

  return (

    <AppProvider>

    <BrowserRouter>
      <Nav/>
      <LightSwitch/>
      <BackToTop/>
      <div className="App">

        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/deckbuilder" element={<DeckBuilder />} />
          <Route path="/decks" element={<DecksPage />} />
          <Route path="/decks/:deck_id" element={<DeckDetailPage />} />
          <Route path="/decks/:deck_id/edit" element={<DeckEditPage />} />
          <Route path="/decks/:deck_id/copy" element={<DeckCopyPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/cards/create" element={<CardCreatePage />} />
          <Route path="/cards/:card_number" element={<CardDetailPage />} />
          <Route path="/cards/topcards" element={<TopCardsPage />} />
          <Route path="/cards/series" element={<UnderConstruction />} />
          <Route path="/cards/card_sets" element={<SetsPage />} />
          <Route path="/cards/card_sets/:card_set_id" element={<SetDetailPage />} />
          <Route path="/cards/card_sets/:card_set_id/pulls" element={<PullPage />} />
          <Route path="/cards/card_sets/:card_set_id/pulls/deckbuilder" element={<PullsDeckBuilder />} />
          <Route path="/articles" element={<UnderConstruction />} />
          <Route path="/gameplay" element={<UnderConstruction />} />
          <Route path="/forum" element={<UnderConstruction />} />
        </Routes>

      </div>
      <Footer/>
    </BrowserRouter>

    </AppProvider>
  );
}

export default App;
