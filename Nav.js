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
    setToken,
    getToken,
    getUsers,
    signUpCred,
    setSignUpCred,
    loginCred,
    setLoginCred,
    signUpCredCheck,
    passwordCon,
    setPasswordCon,
    signup,
    login,
    logout,
    account,
    getAccountData,
  } = useContext(AuthContext)



  useEffect(() => {
    getAccountData()
    getToken()
    getUsers()
    .then((token) => {
      if (token) {
      setToken(token);
      }
    })
  },[signUpCred]);

  const handleShowLoginModal = (event) => {
    if (document.body.style.overflow == 'hidden') {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
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
    if (document.body.style.overflow == 'hidden') {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
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
    event.preventDefault();
    const check = await signUpCredCheck(signUpCred)
    if (check.length === 0) {
      signup()
      resetSignUpCred()
      setPasswordCon("")
      resetLoginCred()
      setShowSignUpModal(false)
    }
    if (document.body.style.overflow == 'hidden') {
      document.body.style.overflow = 'auto';
    }
  };

  const Login = async (event) => {
    event.preventDefault();
    const token = await login(loginCred);
    if (token) {
      resetLoginCred();
      setShowLoginModal(false);
    }
    if (document.body.style.overflow == 'hidden') {
      document.body.style.overflow = 'auto';
    }
  };

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
      collection: [],
      wishlist: [],
      decks: [],
      favorited_decks: [],
      roles: [],
      created_on: {},
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
    const passConf = document.getElementById("passConf");
    if (pass.type === "password") {
      pass.type = "text";
      setViewPass(true)
    } else {
      pass.type = "password";
      setViewPass(false)
    }
    if (passConf.type === "password") {
      passConf.type = "text";
      setViewPass(true)
    } else {
      passConf.type = "password";
      setViewPass(false)
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top topbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          PlayMaker CardBase
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="decksDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Decks
                </a>
                <div className="dropdown-menu" aria-labelledby="decksDropdown">
                  <NavLink className="dropdown-item" to="/deckbuilder">
                    Deck Builder
                  </NavLink>
                  <NavLink className="dropdown-item" to="/decks">
                    Search Decks
                  </NavLink>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="cardsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Cards
                </a>
                <div className="dropdown-menu" aria-labelledby="cardsDropdown">
                  <NavLink className="dropdown-item" to="/cards">
                    Search Cards
                  </NavLink>
                  <NavLink className="dropdown-item" to="/topcards">
                    Top Cards
                  </NavLink>
                  <NavLink className="dropdown-item" to="/cardsets">
                    Card Sets
                  </NavLink>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="cardsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Game Play
                </a>
                <div className="dropdown-menu" aria-labelledby="cardsDropdown">
                  <NavLink className="dropdown-item" to="/rulebooks">
                    How To Play
                  </NavLink>
                  <NavLink className="dropdown-item" to="/gameplay">
                    GamePlay Portal
                  </NavLink>
                  {/* <NavLink className="dropdown-item" to="/topcards">

                  </NavLink>
                  <NavLink className="dropdown-item" to="/series">
                    Classes and Series
                  </NavLink>
                  <NavLink className="dropdown-item" to="/cardsets">
                    Mechanics
                  </NavLink>
                  <NavLink className="dropdown-item" to="/cardsets">
                    How to Play and Rulings
                  </NavLink> */}
                </div>
              </li>
              { account && account.roles.includes("admin")?
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    id="cardsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Admin
                  </a>
                  <div className="dropdown-menu" aria-labelledby="cardsDropdown">
                    { account && account.roles.includes("admin")?
                        <NavLink className="dropdown-item" to="/cardcreate">
                          Card Create
                        </NavLink>:
                      null}
                    { account && account.roles.includes("admin")?
                      <NavLink className="dropdown-item" to="/categorycreate">
                        Category Create
                      </NavLink>:
                    null}
                    { account && account.roles.includes("admin")?
                      <NavLink className="dropdown-item" to="/cardtypecreate">
                        Card Type Create
                      </NavLink>:
                    null}
                    { account && account.roles.includes("admin")?
                      <NavLink className="dropdown-item" to="/cardtagcreate">
                        Card Tag Create
                      </NavLink>:
                    null}
                    { account && account.roles.includes("admin")?
                      <NavLink className="dropdown-item" to="/extraeffectcreate">
                        Extra Effect Create
                      </NavLink>:
                    null}
                    { account && account.roles.includes("admin")?
                      <NavLink className="dropdown-item" to="/reactioncreate">
                        Reaction Create
                      </NavLink>:
                    null}
                    {/* <NavLink className="dropdown-item" to="/topcards">

                    </NavLink>
                    <NavLink className="dropdown-item" to="/series">
                      Classes and Series
                    </NavLink>
                    <NavLink className="dropdown-item" to="/cardsets">
                      Mechanics
                    </NavLink>
                    <NavLink className="dropdown-item" to="/cardsets">
                      How to Play and Rulings
                    </NavLink> */}
                  </div>
                </li>:null
              }
          </ul>
        { showSignUpModal?
          <>
            <form onSubmit={Signup} className="medium-modal">
              <h2 className="label-center black">Create Account </h2>
              <div style={{ margin: "20px 20px 20px 20px"}}>

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
                      title="view password"
                    />:
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/w8oag0B.png"
                      onClick={handleViewPass}
                      title="hide password"
                    />
                  }

                  <h5 className="label black">Confirm Password </h5>
                  <input
                      className="builder-input"
                      id="passConf"
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
                      title="view password"
                    />:
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/w8oag0B.png"
                      onClick={handleViewPass}
                      title="hide password"
                    />
                  }
                </div>
                <div style={{margin: "20px 0px 20px 0px"}}>
                  { signUpError? (
                    signUpError.map((error) =>
                      (
                        <>
                          <p className="error">{error}</p>
                        </>
                      ))): null
                    }

              </div>

              <div className="aligned">
                <button type="submit">Signup</button>
                <button onClick={handleShowSignUpModal}>Close</button>
                <p onClick={handleShowLoginModal}
                  className="black pointer label-center">
                    Already have an account? Log in!
                </p>
              </div>
            </form>
            <div className="blackSpace"></div>
          </>:
          null
        }

        { showLoginModal?
          <>
            <form onSubmit={Login} className="medium-modal">
              <h2 className="label-center black">User Login </h2>
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
                      title="view password"
                    />:
                    <img
                      className="logo2 pointer"
                      src="https://i.imgur.com/w8oag0B.png"
                      onClick={handleViewPass}
                      title="hide password"
                    />
                  }

                  { loginError?
                    <p className="error">{loginError}</p>:
                    null
                  }

              </div>
              <div className="aligned">
                <button type="submit">Login</button>
                <button onClick={handleShowLoginModal}>Close</button>
                <p onClick={handleShowSignUpModal}
                  className="black pointer label-center">
                    New here? Sign Up!
                </p>
              </div>
            </form>
            <div className="blackSpace"></div>
          </>:
          null
        }
      </div>
      { !account?
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
          <NavLink to="/account">
            <button className="button100">
              {account.username}
            </button>
          </NavLink>
          <button className="button100"
            onClick={logout}>
            Logout
          </button>
        </>
      }
      </div>
    </nav>
  );
}

export default Nav;
