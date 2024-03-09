import "./Navbar.css";
import { Link } from "react-router-dom";
import log from "../assets/icon.svg";
import { useEffect, useState } from "react";

// console.log("islogin", islogin);

function Navbar({ islogedin, setIslogedin }) {
  // const [login, setLogin] = useState("Login");
  // const [islogin, setIslogin] = useState(
  //   localStorage.getItem("isLoggedIn") === "true"
  // );

  // useEffect(() => {
  //   setLogin(islogin ? "Logout" : "Login");
  // }, [islogin, localStorage.getItem("token")]);
  // console.log("islogedin :::", islogin);

  function refreshPage() {
    window.location.reload(false);
  }

  function handleLogoutClick() {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");
    console.log("handleLogoutClick");
    setIslogedin(false);
    // setLogin("Login");
  }

  function handleLoginClick() {
    // setIslogin(true);
    console.log("handleLoginClick");
    if (islogedin) {
      // setIslogedin("Logout");
      setIslogedin(false);
    }
  }

  return (
    <nav className="navbar">
      <Link to={"/"}>
        <img src={log}></img>
      </Link>
      <div className="text-xl text-gray-900 dark:text-white hover:underline">
        {islogedin ? (
          <Link to={"#"} onClick={handleLogoutClick}>
            {/* {login} */}
            Logout
          </Link>
        ) : (
          <Link to={"login"} onClick={handleLoginClick}>
            {/* {login} */}
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
