import "./Navbar.css";
import { Link } from "react-router-dom";
import log from "../assets/icon.svg";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <img src={log}></img>
      </Link>
    </nav>
  );
}

export default Navbar;
