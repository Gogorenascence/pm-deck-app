import { Link, NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          PlayMaker CardBase
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <div className="dropdown mx-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Decks
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/decks">
                    Deck Builder
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/decks">
                    Popular Decks
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/decks">
                    Newest Decks
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/decks">
                    Deck Search
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown mx-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cards
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/cards">
                    Popular Cards
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/cards">
                    Newest Cards
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/cards">
                    New Series
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/cards">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/cards">
                    Card Search
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown mx-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Articles
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/articles">
                    Popular Articles
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/articles">
                    Newest Articles
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/articles">
                    Strategy Guides
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/articles">
                    Series Lore
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/articles">
                    Article Search
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown mx-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Game Play
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/gameplay">
                    How To Play
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/gameplay">
                    Game Modes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/gameplay">
                    Formats
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/gameplay">
                    Mechanics
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/gameplay">
                    Restricted Lists
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown mx-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Community
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/forum">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/forum">
                    Users
                  </Link>
                </li>
              </ul>
            </div>

            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
