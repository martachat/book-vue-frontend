import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Register from "./Register";
import "./Login.css";
const LOGIN_URL = "/login";

const Login = ({ islogedin, setIslogedin }) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const apiURL = "http://localhost:5005";
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  let accessToken = "";
  localStorage.setItem("isLoggedIn", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLogin = { email: user, password: pwd };

    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      accessToken = response?.data?.accessToken;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("isLoggedIn", true);
      setIslogedin(true);
      //   const roles = response?.data?.roles;
      console.log("accessToken2", accessToken);
      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="app-login">
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to={"/"}>Go to Home</Link>
          </p>
        </section>
      ) : (
        <section className="app-login">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="form-login">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="username-login"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="password-login"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="btn-login">Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              {/* <a href="#">Sign Up</a> */}
              <Link to={"/register"} className="link-login">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
