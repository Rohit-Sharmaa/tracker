import "./navbar.css";

import data from "./data.js";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav_container">
        <div className="nav_logo_container">
          <h3 className="nav_title">Tracker</h3>
        </div>

        {/* Navigation menu */}
        <ul className="nav_menu">
          {data.map((item) => (
            <li key={item.id}>
              <Link to={item.link} className="nav_menu_link">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="login_button">Login</div>
      </div>
    </nav>
  );
}

export default Navbar;
