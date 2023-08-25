import { NavLink } from "react-router-dom";
import React, { useState } from "react";


function Nav() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [token, setToken] = useState(false)
  const [loginCred, setLoginCred] = useState({
    username: "",
    password: "",
  })
  const [register, setRegister] = useState({
    email: "",
    username: "",
    password: "",
  })
  const [passwordCon, setPasswordCon] = useState("")

  const handleShowLoginModal = (event) => {
    setShowLoginModal(!showLoginModal)
    document.body.classList.add("no-scroll")
    if (showLoginModal === false) {
      resetLoginCred()
      document.body.classList.remove("no-scroll")
    }
    setShowSignUpModal(false)
    resetRegister()
    console.log(showLoginModal)
  }

  const handleShowSignUpModal = (event) => {
    setShowSignUpModal(!showSignUpModal)
    if (showSignUpModal === false) {
      resetRegister()
    }
    setShowLoginModal(false)
    resetLoginCred()
    console.log(showSignUpModal)
  }

  const handleLogin = (event) => {
    setShowLoginModal(false)
    resetLoginCred()
    setToken(true)
  }

  const handleSignUp = (event) => {
    setShowSignUpModal(false)
    resetRegister()
    setToken(true)
  }

  const handleLogout = (event) => {
    alert("You have logged out.")
    setToken(false)
  }

  const handleGoToAccount = (event) => {
    alert("You are going to your account page.")
  }

  const handleRegisterChange = (event) => {
      setRegister({ ...register, [event.target.name]: event.target.value });
  };

  const handlePasswordConChange = (event) => {
      setPasswordCon(event.target.value);
  };

  const handleLoginCredChange = (event) => {
    setLoginCred({ ...loginCred, [event.target.name]: event.target.value });
  };

  // const registerCheck = (register) => {
  //   const check = []
  //   const specialChar = ["!","@","#","$","%","^","&","*","+","~"]
  //   if (allUsers.some(username => username === register.username)) {
  //     check.push("Username is already used")
  //   }

  // }

  // const handleRegisterSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = {...register};
  //   if (data.password === passwordCon) {
  //     const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`;
  //     const fetchConfig = {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //           "Content-Type": "application/json",
  //       },
  //     };

  //     const response = await fetch(cardUrl, fetchConfig);
  //     if (response.ok) {
  //         await response.json();
  //         setCard({
  //             name: "",
  //             card_class: "",
  //             hero_id: "",
  //             series_name: "",
  //             card_number: "",
  //             enthusiasm: "",
  //             effect_text: "",
  //             second_effect_text: "",
  //             illustrator: "",
  //             picture_url: "",
  //             file_name: "",
  //             card_type: [],
  //             extra_effects: [],
  //             reactions: [],
  //             card_tags: [],
  //         });
  //         window.location.href = `${process.env.PUBLIC_URL}/cards/${card_number}`;
  //     } else {
  //         alert("Error in creating card");
  //     }
  //   }
  // };

  const resetRegister = (event) => {
    setRegister({
      email: "",
      username: "",
      password: "",
    });
    resetPasswordCon()
  };

  const resetLoginCred = (event) => {
    setLoginCred({
      username: "",
      password: "",
    });
    resetPasswordCon()
  };

  const resetPasswordCon = (event) => {
    setPasswordCon("");
  };


  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top topbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          PlayMaker CardBase
        </NavLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Decks
                </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/deckbuilder">
                    Deck Builder
                    </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/decks">
                    Search Decks
                    </NavLink>
                </li>
              </ul>
            </li>
          </ul>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cards
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/cards">
                    Search Cards
                    </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cards/create">
                    Card Create
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cards/topcards">
                    Top Cards
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cards/series">
                    Series
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cards/card_sets">
                    Card Sets
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Articles
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Search Articles
                    </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Strategy Guides
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Series Lore
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul> */}

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Game Play
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Search Game Play
                    </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    How To Play
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Game Modes
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Formats
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Mechanics
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/gameplay">
                    Restricted Lists
                    </NavLink>
                </li>
              </ul>
            </li>
          </ul> */}

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Community
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/forum">
                    Forum
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/forum">
                    Users
                    </NavLink>
                </li>
              </ul>
            </li>
          </ul> */}

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a href="/#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/cards/create">
                    Card Create
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      </div>

      { showSignUpModal?
        <div className="medium-modal">
        <h2 className="label black">  Create Account </h2>
        <div style={{margin: "20px 20px 20px 20px"}}>
            <h5 className="label black">Email </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Email"
                onChange={handleRegisterChange}
                name="email"
                value={register.email}>
            </input>

            <h5 className="label black">Username </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Username"
                onChange={handleRegisterChange}
                name="username"
                value={register.username}>
            </input>

            <h5 className="label black">Password </h5>
            <input
                className="builder-input"
                type="password"
                placeholder=" Password"
                onChange={handleRegisterChange}
                name="password"
                value={register.password}>
            </input>

            <h5 className="label black">Password </h5>
            <input
                className="builder-input"
                type="password"
                placeholder=" Confirm Password"
                onChange={handlePasswordConChange}
                value={passwordCon}>
            </input>
        </div>
        <button onClick={handleSignUp}>Signup</button>
        <button onClick={handleShowSignUpModal}>Close</button>
        </div>:
        null
      }

      { showLoginModal?
        <div className="medium-modal">
        <h2 className="label black">  User Login </h2>
        <div style={{margin: "20px 20px 20px 20px"}}>
            <h5 className="label black">Username </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Username"
                onChange={handleLoginCredChange}
                name="username"
                value={loginCred.username}>
            </input>

            <h5 className="label black">Password </h5>
            <input
                className="builder-input"
                type="password"
                placeholder=" Password"
                onChange={handleLoginCredChange}
                name="password"
                value={loginCred.password}>
            </input>

            <h5 className="label black">Password </h5>
            <input
                className="builder-input"
                type="password"
                placeholder=" Confirm Password"
                onChange={handlePasswordConChange}
                value={passwordCon}>
            </input>
        </div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleShowLoginModal}>Close</button>
      </div>:
      null
      }

      </div>
      { !token?<>
                <button className="button100"
                  onClick={handleShowLoginModal}>
                  Login
                </button>
                <button className="button100"
                  onClick={handleShowSignUpModal}>
                  Signup
                </button>
              </>
                :
              <>
                <button className="button100"
                  onClick={handleLogout}>
                  Logout
                </button>
                <button className="button100"
                  onClick={handleGoToAccount}>
                  Account
                </button>
              </>
      }
      </div>
    </nav>
  );
}

export default Nav;
