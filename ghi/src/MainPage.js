import TopRow from "./Display/TopRow";
import DeckRow from "./Display/DeckRow";
import CardRow from "./Display/CardRow";
import NewsRow from "./Display/NewsRow";
import SimulatorRow from "./Display/SimulatorRow";
import { Card } from "react-bootstrap";
import { NavLink } from 'react-router-dom';


function MainPage() {

  // window.scroll(0, 0);
  document.body.style.overflow = 'auto';

    return (
      <div>
        <h1>Welcome to PlayMaker CardBase</h1>
        <h2>The PlayMaker Card Database and Deck Sharing Site</h2>
        <br/>
        <div>
          <TopRow/>
        </div>
        <br/>
        <div>
          <SimulatorRow/>
        </div>
        <h1 className="margin-top-20">CardBase News</h1>
        <br/>
        <div>
          <NewsRow/>
        </div>
        <br/>
        <h1 className="margin-top-20">Latest Decks</h1>
        <br/>
        <div>
          <DeckRow/>
        </div>
        <br/>
        <h1 className="margin-top-20 media-margin-bottom-none">Latest Cards</h1>
        <br/>
        <div>
          <CardRow/>
        </div>
      </div>
    );
  }

  export default MainPage;
