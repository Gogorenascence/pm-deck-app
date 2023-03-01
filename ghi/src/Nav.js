import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          PlayMaker CardBase
        </NavLink>
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
                  <NavLink className="dropdown-item" to="/decks">
                    Deck Builder
                    </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/decks">
                    Popular Decks
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/decks">
                    Newest Decks
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/decks">
                    Deck Search
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
                    Popular Cards
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cards">
                    Newest Cards
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cards">
                    New Series
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cards">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cards">
                    Card Search
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
                Articles
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Popular Articles
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Newest Articles
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
                <li>
                  <NavLink className="dropdown-item" to="/articles">
                    Article Search
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
                Game Play
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
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
          </ul>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </nav>
  );
}

export default Nav;
