import TopRow from "./display/TopRow";
import DeckRow from "./display/DeckRow";
import CardRow from "./display/CardRow";


function MainPage() {

  window.scroll(0, 0);
  document.body.style.overflow = 'auto';

    return (
      <div>
        <br/>
          <h1>Welcome to PlayMaker CardBase</h1>
          <h2>The PlayMaker Card Database and Deck Sharing Site</h2>
        <br/>
        <div>
          <TopRow/>
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
