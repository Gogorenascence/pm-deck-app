import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
// import DeckBuilder from "./Builder/DeckBuilder"
import DecksPage from "./Decks/DecksPage"
import DeckDetailPage from "./Decks/DeckDetailPage";
import DeckEditPage from "./Builder/DeckEditPage";
import DeckCopyPage from "./Builder/DeckCopyPage";
import CardsPage from "./Cards/CardsPage"
import CardCreatePage from "./Cards/CardCreatePage";
import CardDetailPage from "./Cards/CardDetailPage";
import TopCardsPage from "./Cards/TopCardsPage";
import SetsPage from "./Cards/SetsPage";
import SetDetailPage from "./Cards/SetDetailPage";
import PullPage from "./Cards/PullPage";
import UnderConstruction from "./display/UnderConstruction";
// import Nav from "./Nav";
import NavBar from "./NavBar";
import Footer from "./Footer";
import LightSwitch from "./display/LightSwitch";
import BackToTop from "./display/BackToTop";
import "./index.css"
import "./Massive.css"
import AppProvider from "./context/AppProvider";
import PullsDeckBuilder from "./Builder/PullsDeckBuilder";
import AccountPage from "./Accounts/AccountPage";
import ResetPassword from "./Accounts/ResetPasswordPage";
import GameCards from "./Cards/GameCards";
import GameDecks from "./Decks/GameDecks";
import DeckImport from "./Builder/DeckBuildandImport";
import CardCategoriesPage from "./GamePlay/Categories/CardCategoriesPage";
import CardCategoriesCreate from "./GamePlay/Categories/CardCategoryCreatePage";
import CardCategoryEdit from "./GamePlay/Categories/CardCategoryEditPage";
import CardCategoryDetail from "./GamePlay/Categories/CardCategoryDetailPage";
import CardTagCreate from "./GamePlay/CardTags/CardTagCreatePage";
import CardTagEdit from "./GamePlay/CardTags/CardTagEditPage";
import CardTagDetails from "./GamePlay/CardTags/CardTagDetailPage";
import CardTypeCreate from "./GamePlay/CardTypes/CardTypeCreatePage";
import CardTypeEdit from "./GamePlay/CardTypes/CardTypeEditPage";
import CardTypeDetails from "./GamePlay/CardTypes/CardTypeDetailPage";
import ExtraEffectsPage from "./GamePlay/ExtraEffects/ExtraEffectsPage";
import ExtraEffectCreate from "./GamePlay/ExtraEffects/ExtraEffectCreate";
import ExtraEffectEdit from "./GamePlay/ExtraEffects/ExtraEffectEdit";
import ExtraEffectDetails from "./GamePlay/ExtraEffects/ExtraEffectDetailPage";
import ReactionCreate from "./GamePlay/Reactions/ReactionCreatePage";
import ReactionEdit from "./GamePlay/Reactions/ReactionEditPage";
import ReactionDetails from "./GamePlay/Reactions/ReactionDetailPage";
import GamePlayPage from "./GamePlay/GamePlayPage";
import CardTagsPage from "./GamePlay/CardTags/CardTagsPage";
import CardTypesPage from "./GamePlay/CardTypes/CardTypesPage";
import ReactionsPage from "./GamePlay/Reactions/ReactionsPage";


function App() {

  return (

    <AppProvider>

    <BrowserRouter>
        <div className="content">
          <NavBar/>
          <LightSwitch/>
          <BackToTop/>
          <div className="App">

            <Routes>
              <Route index element={<MainPage />} />
              <Route path="/deckbuilder" element={<DeckImport />} />
              <Route path="/decks" element={<DecksPage />} />
              {/* <Route path="/deckimport" element={<DeckImport />} /> */}
              <Route path="/decks/:deck_id" element={<DeckDetailPage />} />
              <Route path="/decks/:deck_id/edit" element={<DeckEditPage />} />
              <Route path="/decks/:deck_id/copy" element={<DeckCopyPage />} />
              <Route path="/cards" element={<CardsPage />} />
              <Route path="/cardcreate" element={<CardCreatePage />} />
              <Route path="/cards/:card_number" element={<CardDetailPage />} />
              <Route path="/topcards" element={<TopCardsPage />} />
              <Route path="/cardsets" element={<SetsPage />} />
              <Route path="/cardsets/:card_set_id" element={<SetDetailPage />} />
              <Route path="/cardsets/:card_set_id/pulls" element={<PullPage />} />
              <Route path="/cardsets/:card_set_id/pulls/deckbuilder" element={<PullsDeckBuilder />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/reset/:reset_id" element={<ResetPassword />} />
              <Route path="/articles" element={<UnderConstruction />} />
              <Route path="/forum" element={<UnderConstruction />} />
              <Route path="/game/cards" element={<GameCards />} />
              <Route path="/game/decks" element={<GameDecks />} />
              <Route path="/cardcategories" element={<CardCategoriesPage />} />
              <Route path="/categorycreate" element={<CardCategoriesCreate />} />
              <Route path="/cardcategories/:card_category_id" element={<CardCategoryDetail />} />
              <Route path="/cardcategories/:card_category_id/edit" element={<CardCategoryEdit />} />
              <Route path="/cardtags" element={<CardTagsPage />} />
              <Route path="/cardtagcreate" element={<CardTagCreate />} />
              <Route path="/cardtags/:card_tag_id" element={<CardTagDetails />} />
              <Route path="/cardtags/:card_tag_id/edit" element={<CardTagEdit />} />
              <Route path="/cardtypes" element={<CardTypesPage />} />
              <Route path="/cardtypecreate" element={<CardTypeCreate />} />
              <Route path="/cardtypes/:card_type_id" element={<CardTypeDetails />} />
              <Route path="/cardtypes/:card_type_id/edit" element={<CardTypeEdit />} />
              <Route path="/extraeffects" element={<ExtraEffectsPage />} />
              <Route path="/extraeffectcreate" element={<ExtraEffectCreate />} />
              <Route path="/extraeffects/:extra_effect_id/edit" element={<ExtraEffectEdit />} />
              <Route path="/extraeffects/:extra_effect_id" element={<ExtraEffectDetails />} />
              <Route path="/reactioncreate" element={<ReactionCreate />} />
              <Route path="/reactions/:reaction_id" element={<ReactionDetails />} />
              <Route path="/reactions/:reaction_id/edit" element={<ReactionEdit />} />
              <Route path="/gameplay" element={<GamePlayPage />} />
              <Route path="/reactions" element={<ReactionsPage />} />
            </Routes>

          </div>
        </div>
        <Footer/>
    </BrowserRouter>

    </AppProvider>
  );
}

export default App;
