import TopRow from "./display/TopRow";
import DeckRow from "./display/DeckRow";
import CardRow from "./display/CardRow";
import React, { useState, useEffect } from 'react'


function MainPage() {
  const [user, setUser] = useState('')
  const getUser = async() =>{
    const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/token/`);
    const data = await response.json();
    console.log(data)

    setUser(data);
};

useEffect(() => {
  getUser();
}, [user]);

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
      </div>
    );
  }

  export default MainPage;
