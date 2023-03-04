import TopRow from "./display/TopRow";
import DeckRow from "./display/DeckRow";
import CardRow from "./display/CardRow";

function MainPage() {
    return (
      <div>
      <div>
        <TopRow/>
      </div>

      <br/>
      <h1>New Decks</h1>
      <br/>
      <div>
        <DeckRow/>
      </div>
      <br/>
      <h1>Popular Cards</h1>
      <br/>
      <div>
        <CardRow/>
      </div>
      </div>
    );
  }

  export default MainPage;
