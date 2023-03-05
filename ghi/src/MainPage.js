import TopRow from "./display/TopRow";
import DeckRow from "./display/DeckRow";
import CardRow from "./display/CardRow";
import ArticleRow from "./display/ArticleRow";


function MainPage() {
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
      <h1>Latest Decks</h1>
      <br/>
      <div>
        <DeckRow/>
      </div>
      <br/>
      <h1>Latest Cards</h1>
      <br/>
      <div>
        <CardRow/>
      </div>
      <br/>
      <h1>Latest Articles</h1>
      <br/>
      <div>
        <ArticleRow/>
      </div>
      </div>
    );
  }

  export default MainPage;
