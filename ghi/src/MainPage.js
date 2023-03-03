import TopRow from "./display/TopRow";
import DeckRow from "./display/DeckRow";
import CardRow from "./display/CardRow";

function MainPage() {
    return (
      <div>

      <div>
        <TopRow/>
      </div>
      <div>
        <DeckRow/>
      </div>
      <div>
        <CardRow/>
      </div>
      </div>
    );
  }

  export default MainPage;
