import { NavLink } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function Nav() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [viewPass, setViewPass] = useState(false)

  const {
    signUpError,
    setSignUpError,
    loginError,
    setLoginError,
    token,
    setToken,
    getToken,
    signUpCred,
    setSignUpCred,
    loginCred,
    setLoginCred,
    signup,
    login,
    logout,
    getAccountData,
    account
  } = useContext(AuthContext)

  const [passwordCon, setPasswordCon] = useState("")

  useEffect(() => {
    getAccountData()
    getToken()
    .then((token) => {
      if (token) {
      setToken(token);
      }
    })
  },[]);

  const handleShowLoginModal = (event) => {
    setShowLoginModal(!showLoginModal)
    if (showLoginModal === false) {
      resetLoginCred()
    }
    setShowSignUpModal(false)
    setSignUpError("")
    setLoginError("")
    setViewPass(false)
    resetSignUpCred()
  }

  const handleShowSignUpModal = async (event) => {
    setShowSignUpModal(!showSignUpModal)
    if (showSignUpModal === false) {
      resetSignUpCred()
    }
    setShowLoginModal(false)
    setSignUpError("")
    setLoginError("")
    setViewPass(false)
    resetLoginCred()
  }

  const Signup = async (event) => {
    if (passwordCon === signUpCred.password) {
      signup()
      resetSignUpCred()
      setPasswordCon("")
      resetLoginCred()
      setShowSignUpModal(false)
    } else {
      setSignUpError("Passwords Must Match")
    }
  };

  const Login = async (event) => {
    try {
      await login(loginCred);
      if (!loginError) {
        resetLoginCred();
        setShowLoginModal(false);
      }
    } catch (error) {
      console.log("Couldn't catch the token, sorry")
    }
  };

  const handleGoToAccount = (event) => {
    alert("You are going to your account page.")
  }

  const handleSignUpCredChange = (event) => {
      setSignUpCred({ ...signUpCred, [event.target.name]: event.target.value });
      setLoginCred({...loginCred, [event.target.name]: event.target.value})
  };

  const handlePasswordConChange = (event) => {
      setPasswordCon(event.target.value);
  };

  const handleLoginCredChange = (event) => {
    setLoginCred({ ...loginCred, [event.target.name]: event.target.value });
  };

  const resetSignUpCred = (event) => {
    setSignUpCred({
      email: "",
      username: "",
      password: "",
    });
    setPasswordCon("")
  };

  const resetLoginCred = (event) => {
    setLoginCred({
      username: "",
      password: "",
    });
    setPasswordCon("")
  };

  const handleViewPass = (event) => {
    const pass = document.getElementById("pass");
    if (pass.type === "password") {
      pass.type = "text";
      setViewPass(true)
    } else {
      pass.type = "password";
      setViewPass(false)
    }
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
          <>
            <div className="medium-modal">
              <h2 className="label black">  Create Account </h2>
              <div style={{margin: "20px 20px 20px 20px"}}>
                  <h5 className="label black">Email </h5>
                  <input
                      className="builder-input"
                      type="text"
                      placeholder=" Email"
                      onChange={handleSignUpCredChange}
                      name="email"
                      value={signUpCred.email}>
                  </input>

                  <h5 className="label black">Username </h5>
                  <input
                      className="builder-input"
                      type="text"
                      placeholder=" Username"
                      onChange={handleSignUpCredChange}
                      name="username"
                      value={signUpCred.username}>
                  </input>

                  <h5 className="label black">Password </h5>
                  <input
                      className="builder-input"
                      id="pass"
                      type="password"
                      placeholder=" Password"
                      onChange={handleSignUpCredChange}
                      name="password"
                      value={signUpCred.password}>
                  </input>

                  { !viewPass?
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/MfNqq8S.png"
                      onClick={handleViewPass}
                    />:
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/w8oag0B.png"
                      onClick={handleViewPass}
                    />
                  }

                  <h5 className="label black">Confirm Password </h5>
                  <input
                      className="builder-input"
                      id="pass"
                      type="password"
                      placeholder=" Confirm Password"
                      onChange={handlePasswordConChange}
                      value={passwordCon}>
                  </input>

                  { !viewPass?
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/MfNqq8S.png"
                      onClick={handleViewPass}
                    />:
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/w8oag0B.png"
                      onClick={handleViewPass}
                    />
                  }

                  { signUpError?
                    <p className="error">{signUpError}</p>:
                    null
                  }

              </div>
              <button onClick={Signup}>Signup</button>
              <button onClick={handleShowSignUpModal}>Close</button>
            </div>
            <div className="blackSpace"></div>
          </>:
          null
        }

        { showLoginModal?
          <>
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
                      id="pass"
                      type="password"
                      placeholder=" Password"
                      onChange={handleLoginCredChange}
                      name="password"
                      value={loginCred.password}>
                  </input>

                  { !viewPass?
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/MfNqq8S.png"
                      onClick={handleViewPass}
                    />:
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/w8oag0B.png"
                      onClick={handleViewPass}
                    />
                  }

                  { loginError?
                    <p className="error">{loginError}</p>:
                    null
                  }

              </div>
              <button onClick={Login}>Login</button>
              <button onClick={handleShowLoginModal}>Close</button>
            </div>
            <div className="blackSpace"></div>
          </>:
          null
        }
      </div>
      { !token?
        <>
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
            onClick={logout}>
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
