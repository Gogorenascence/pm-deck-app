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

  const [showMobileMenu, setShowMobileMenu] = useState(false)

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
    if (!showLoginModal){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
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
    setShowMobileMenu(false)
  }

  const handleShowSignUpModal = async (event) => {
    if (!showSignUpModal){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
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
    setShowMobileMenu(false)
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
      handleShowSignUpModal()
    }
  };

  const Login = async (event) => {
    event.preventDefault();
    const token = await login(loginCred);
    if (token) {
      resetLoginCred();
      setShowLoginModal(false);
      handleShowLoginModal()
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

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
    handleShowMenu(false, "none")
  }

  const handleClickBrand = () => {
    setShowMobileMenu(false)
    handleShowMenu(false, "none")
  }

  return (
    <nav className="navbar topbar" ref={navbar}>
      <div className="nav-main">
        <div style={{display: "flex"}}>
          <NavLink className="navbar-brand2 navbar-select" to="/"
            onClick={() => handleClickBrand()}>
            PlayMaker CardBase
          </NavLink>
          <ul className="navbar-menu none">
            <li className="nav-item">
              <div className={ showMenu.show && showMenu.section === "decks"?
                "navbar-selected pointer": "navbar-select pointer"}
                onClick={() => handleShowMenu(true, "decks")}>
                <h5 className="navbar-menu-item">
                  Decks
                </h5>
              </div>
              { showMenu.show && showMenu.section === "decks"?
              <div className="nav-dropdown-content">
                <NavLink className="dropdown-select username2" to="/deckbuilder" onClick={() => followLink()}>
                  <div className="nav-dropdown-item">
                    Deck Builder
                  </div>
                </NavLink>
                <NavLink className="dropdown-select username2" to="/decks" onClick={() => followLink()}>
                  <div className="nav-dropdown-item">
                    Search Decks
                  </div>
                </NavLink>
              </div>: null
              }
            </li>
            <li className="nav-item">
              <div className={ showMenu.show && showMenu.section === "cards"?
                "navbar-selected pointer": "navbar-select pointer"}
                onClick={() => handleShowMenu(true, "cards")}>
                <h5 className="navbar-menu-item">
                  Cards
                </h5>
              </div>
              { showMenu.show && showMenu.section === "cards"?
                <div className="nav-dropdown-content">
                  <NavLink className="dropdown-select username2" to="/cards" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Search Cards
                    </div>
                  </NavLink>
                  <NavLink className="dropdown-select username2" to="/topcards" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Top Cards
                    </div>
                  </NavLink>
                  <NavLink className="dropdown-select username2" to="/series" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                        Series
                    </div>
                  </NavLink>
                  <NavLink className="dropdown-select username2" to="/cardsets" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Card Sets
                    </div>
                  </NavLink>
                </div>:null
                }
            </li>
            <li className="nav-item">
              <div className={ showMenu.show && showMenu.section === "gameplay"?
                "navbar-selected pointer": "navbar-select pointer"}
                onClick={() => handleShowMenu(true, "gameplay")}>
                <h5 className="navbar-menu-item">
                  Game Play
                </h5>
              </div>
              { showMenu.show && showMenu.section === "gameplay"?
                <div className="nav-dropdown-content">
                  <NavLink className="dropdown-select username2" to="/gameplay" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      GamePlay Portal
                    </div>
                  </NavLink>
                </div>:null
              }
            </li>
            { account && account.roles.includes("admin")?
              <li className="nav-item">
                <div className={showMenu.show && showMenu.section === "admin"?
                  "navbar-selected pointer": "navbar-select pointer"}
                  onClick={() => handleShowMenu(true, "admin")}>
                  <h5 className="navbar-menu-item">
                    Admin
                  </h5>
                </div>
                { showMenu.show && showMenu.section === "admin"?
                  <div className="nav-dropdown-content">
                    <NavLink className="dropdown-select username2" to="/cardcreate" onClick={() => followLink()}>
                      <div className="nav-dropdown-item">
                        Card Create
                      </div>
                    </NavLink>
                    <NavLink className="dropdown-select username2" to="/categorycreate" onClick={() => followLink()}>
                      <div className="nav-dropdown-item">
                        Category Create
                      </div>
                    </NavLink>
                    <NavLink className="dropdown-select username2" to="/cardtypecreate" onClick={() => followLink()}>
                      <div className="nav-dropdown-item">
                        Card Type Create
                      </div>
                    </NavLink>
                    <NavLink className="dropdown-select username2" to="/cardtagcreate" onClick={() => followLink()}>
                      <div className="nav-dropdown-item">
                        Card Tag Create
                      </div>
                    </NavLink>
                    <NavLink className="dropdown-select username2" to="/extraeffectcreate" onClick={() => followLink()}>
                      <div className="nav-dropdown-item">
                        Extra Effect Create
                      </div>
                    </NavLink>
                    <NavLink className="dropdown-select username2" to="/reactioncreate" onClick={() => followLink()}>
                      <div className="nav-dropdown-item">
                        Reaction Create
                      </div>
                    </NavLink>
                  </div>:null
                }
              </li>:null
            }
          </ul>
        </div>

        <img className="threebars hidden2 media-display"
          onClick={() => handleShowMobileMenu()}
          src="https://i.imgur.com/Q1Y2vV9.png"
          alt="menu"/>

        <div className="none">
          { !account?
            <div className="accountbuttons">
              <div className="navbar-select pointer"
                onClick={() => handleShowLoginModal()}>
                <h5 className="navbar-menu-item">
                  Login
                </h5>
              </div>
              <div className="navbar-select pointer"
                onClick={() => handleShowSignUpModal()}>
                <h5 className="navbar-menu-item">
                  Signup
                </h5>
              </div>
            </div>
              :
            <div className="accountbuttons">
              <NavLink className="username2" to="/account">
                <div className="navbar-select pointer">
                  <h5 className="navbar-menu-item">
                    {account.username}
                  </h5>
                </div>
              </NavLink>
              <div className="navbar-select pointer"
                onClick={() => logout()}>
                <h5 className="navbar-menu-item">
                  Logout
                </h5>
              </div>
            </div>
          }
        </div>
      </div>

      <ul className={showMobileMenu? "navbar-menu hidden2 maximize": "navbar-menu hidden2 minimize"}>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "decks"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "decks")}>
            <h5 className="navbar-menu-item">
              Decks
            </h5>
          </div>
          { showMenu.show && showMenu.section === "decks"?
          <div className="nav-dropdown-content">
            <NavLink className="nav-dropdown-item" to="/deckbuilder" onClick={() => handleShowMobileMenu()}>
              <div className="dropdown-select">
                  Deck Builder
              </div>
            </NavLink>
            <NavLink className="nav-dropdown-item" to="/decks" onClick={() => handleShowMobileMenu()}>
              <div className="dropdown-select">
                Search Decks
              </div>
            </NavLink>
          </div>: null
          }
        </li>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "cards"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "cards")}>
            <h5 className="navbar-menu-item">
              Cards
            </h5>
          </div>
          { showMenu.show && showMenu.section === "cards"?
            <div className="nav-dropdown-content">
              <NavLink className="nav-dropdown-item" to="/cards" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Search Cards
                </div>
              </NavLink>
              <NavLink className="nav-dropdown-item" to="/topcards" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Top Cards
                </div>
              </NavLink>
              <NavLink className="nav-dropdown-item" to="/series" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Series
                </div>
              </NavLink>
              <NavLink className="nav-dropdown-item" to="/cardsets" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Card Sets
                </div>
              </NavLink>
            </div>:null
            }
        </li>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "gameplay"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "gameplay")}>
            <h5 className="navbar-menu-item">
              Game Play
            </h5>
          </div>
          { showMenu.show && showMenu.section === "gameplay"?
            <div className="nav-dropdown-content">
              <NavLink className="nav-dropdown-item" to="/gameplay" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  GamePlay Portal
                </div>
              </NavLink>
            </div>:null
          }
        </li>
        { account && account.roles.includes("admin")?
          <li className="nav-item">
            <div className={showMenu.show && showMenu.section === "admin"?
              "navbar-selected pointer": "navbar-select pointer"}
              onClick={() => handleShowMenu(true, "admin")}>
              <h5 className="navbar-menu-item">
                Admin
              </h5>
            </div>
            { showMenu.show && showMenu.section === "admin"?
              <div className="nav-dropdown-content">
                <NavLink className="nav-dropdown-item" to="/cardcreate" onClick={() => handleShowMobileMenu()}>
                  <div className="dropdown-select">
                    Card Create
                  </div>
                </NavLink>
                <NavLink className="nav-dropdown-item" to="/categorycreate" onClick={() => handleShowMobileMenu()}>
                  <div className="dropdown-select">
                    Category Create
                  </div>
                </NavLink>
                <NavLink className="nav-dropdown-item" to="/cardtypecreate" onClick={() => handleShowMobileMenu()}>
                  <div className="dropdown-select">
                    Card Type Create
                  </div>
                </NavLink>
                <NavLink className="nav-dropdown-item" to="/cardtagcreate" onClick={() => handleShowMobileMenu()}>
                  <div className="dropdown-select">
                    Card Tag Create
                  </div>
                </NavLink>
                <NavLink className="nav-dropdown-item" to="/extraeffectcreate" onClick={() => handleShowMobileMenu()}>
                  <div className="dropdown-select">
                    Extra Effect Create
                  </div>
                </NavLink>
                <NavLink className="nav-dropdown-item" to="/reactioncreate" onClick={() => handleShowMobileMenu()}>
                  <div className="dropdown-select">
                    Reaction Create
                  </div>
                </NavLink>
              </div>:null
            }
          </li>:null
        }
        { !account?
          <li className="nav-item2">
            <div className="navbar-select2 pointer"
              onClick={() => handleShowLoginModal()}>
              <h5 className="navbar-menu-item">
                Login
              </h5>
            </div>
            <div className="navbar-select2 pointer"
              onClick={() => handleShowSignUpModal()}>
              <h5 className="navbar-menu-item">
                Signup
              </h5>
            </div>
          </li>
          :
          <li className="nav-item2">
            <NavLink className="username2" to="/account" onClick={() => handleShowMobileMenu()}>
              <div className="navbar-select2 pointer">
                <h5 className="navbar-menu-item">
                  {account.username}
                </h5>
              </div>
            </NavLink>
            <div className="navbar-select2 pointer"
              onClick={() => logout()}>
              <h5 className="navbar-menu-item">
                Logout
              </h5>
            </div>
          </li>
          }
      </ul>

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
