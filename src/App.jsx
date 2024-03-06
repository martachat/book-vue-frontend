import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/Navbar";
import BookDetailsPage from "./Pages/BookDetailsPage";
import AuthorDetailsPage from "./Pages/AuthorDetailsPage";
import GenreDetailsPage from "./Pages/GenreDetailsPage";
import PublisherDetailsPage from "./Pages/PublisherDetailsPage";
import HomePageAdmin from "./Pages/HomePageAdmin";
import EditBookPage from "./Pages/EditBookPage";
import CreateNewBook from "./Pages/CreateBook/CreateNewBook";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useState } from "react";

function App() {
  const [islogedin, setIslogedin] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <div className="App">
      <Navbar islogedin={islogedin} setIslogedin={setIslogedin}></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/books/:id" element={<BookDetailsPage />}></Route>
        <Route path="/authors/:id" element={<AuthorDetailsPage />}></Route>
        <Route path="/genres/:id" element={<GenreDetailsPage />}></Route>
        <Route
          path="/publishers/:id"
          element={<PublisherDetailsPage />}
        ></Route>
        <Route path="/admin" element={<HomePageAdmin />}></Route>
        <Route path="/books/:id/edit" element={<EditBookPage />}></Route>
        <Route path="/books/create" element={<CreateNewBook />}></Route>

        <Route
          path="/login"
          element={<Login islogedin={islogedin} setIslogedin={setIslogedin} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
