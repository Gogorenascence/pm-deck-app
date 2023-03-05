import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, {useRef, useEffect} from "react";

// import {TweenMex, Power3} from "gsap"
// // import './App.css';

import DecksPage from "./SiteComp/DecksPage"
import CardsPage from "./SiteComp/CardsPage"
import ArticlesPage from "./SiteComp/ArticlesPage"
import GamePlayPage from "./SiteComp/GamePlayPage"
import ForumPage from "./SiteComp/ForumPage"
import MainPage from "./MainPage";
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
          <Route path="/decks" element={<DecksPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/gameplay" element={<GamePlayPage />} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
