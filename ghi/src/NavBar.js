import { NavLink } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "./context/AuthContext";


function NavBar() {
  const [showMenu, setShowMenu] = useState({
    show: false,
    section: ""
  })
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

  const navbar = useRef(null)
  useOutsideAlerter(navbar);

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

  const handleShowMenu = (show, section) => {
    setShowMenu({
      show: show,
      section: section
    })
    console.log(showMenu)
  }

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
      console.log(signUpCred)

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

  function useOutsideAlerter(ref) {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleShowMenu(false, "none");
        }
      }
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }

  const followLink = () => {
    handleShowMenu(false, "none")
  }

  return (
    <nav className="navbar topbar" ref={navbar}>
      <div className="nav-main">
        <div style={{display: "flex"}}>
          <NavLink className="navbar-brand2" to="/">
            PlayMaker CardBase
          </NavLink>
          <ul className="navbar-menu">
            <li className="nav-item">
              <h5 onClick={() => handleShowMenu(true, "decks")}
                className="navbar-menu-item"
              >
                Decks
              </h5>
              { showMenu.show && showMenu.section === "decks"?
              <div className="nav-dropdown-content">
                <NavLink className="nav-dropdown-item" to="/deckbuilder" onClick={() => followLink()}>
                  Deck Builder
                </NavLink>
                <NavLink className="nav-dropdown-item" to="/decks" onClick={() => followLink()}>
                  Search Decks
                </NavLink>
              </div>: null
              }
            </li>
            <li className="nav-item">
              <h5 onClick={() => handleShowMenu(true, "cards")}
                className="navbar-menu-item"
              >
                Cards
              </h5>
              { showMenu.show && showMenu.section === "cards"?
                <div className="nav-dropdown-content">
                  <NavLink className="nav-dropdown-item" to="/cards" onClick={() => followLink()}>
                    Search Cards
                  </NavLink>
                  <NavLink className="nav-dropdown-item" to="/topcards" onClick={() => followLink()}>
                    Top Cards
                  </NavLink>
                  <NavLink className="nav-dropdown-item" to="/series" onClick={() => followLink()}>
                      Series
                    </NavLink>
                  <NavLink className="nav-dropdown-item" to="/cardsets" onClick={() => followLink()}>
                    Card Sets
                  </NavLink>
                </div>:null
                }
            </li>
            <li className="nav-item">
              <h5 onClick={() => handleShowMenu(true, "gameplay")}
                className="navbar-menu-item"
              >
                Game Play
              </h5>
              { showMenu.show && showMenu.section === "gameplay"?
                <div className="nav-dropdown-content">
                  <NavLink className="nav-dropdown-item" to="/gameplay" onClick={() => followLink()}>
                    GamePlay Portal
                  </NavLink>
                </div>:null
              }
            </li>
            { account && account.roles.includes("admin")?
              <li className="nav-item">
                <h5 onClick={() => handleShowMenu(true, "admin")}
                  className="navbar-menu-item"
                >
                  Admin
                </h5>
                { showMenu.show && showMenu.section === "admin"?
                  <div className="nav-dropdown-content">
                    <NavLink className="nav-dropdown-item" to="/cardcreate" onClick={() => followLink()}>
                      Card Create
                    </NavLink>
                    <NavLink className="nav-dropdown-item" to="/categorycreate" onClick={() => followLink()}>
                      Category Create
                    </NavLink>
                    <NavLink className="nav-dropdown-item" to="/cardtypecreate" onClick={() => followLink()}>
                      Card Type Create
                    </NavLink>
                    <NavLink className="nav-dropdown-item" to="/cardtagcreate" onClick={() => followLink()}>
                      Card Tag Create
                    </NavLink>
                    <NavLink className="nav-dropdown-item" to="/extraeffectcreate" onClick={() => followLink()}>
                      Extra Effect Create
                    </NavLink>
                    <NavLink className="nav-dropdown-item" to="/reactioncreate" onClick={() => followLink()}>
                      Reaction Create
                    </NavLink>
                  </div>:null
                }
              </li>:null
            }
          </ul>
        </div>
        <img className="threebars hidden2 media-display"
          src="https://i.imgur.com/Q1Y2vV9.png"
          alt="menu"/>
        <div style={{display: "flex", marginRight: "10px"}}>
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

      </div>
      {/* <div className="menu"> */}
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
      {/* </div> */}

    </nav>
  );
}

export default NavBar;
