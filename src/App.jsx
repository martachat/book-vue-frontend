import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Navbar from "./components/Navbar";
import BookDetailsPage from "./Pages/DetailsBook/BookDetailsPage";
import AuthorDetailsPage from "./Pages/Others/AuthorDetailsPage";
import GenreDetailsPage from "./Pages/Others/GenreDetailsPage";
import PublisherDetailsPage from "./Pages/Others/PublisherDetailsPage";
import HomePageAdmin from "./Pages/Home/HomePageAdmin";
import EditBookPage from "./Pages/EditBook/EditBookPage";
import CreateNewBook from "./Pages/CreateBook/CreateNewBook";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
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
        <Route path="/admin/create" element={<CreateNewBook />}></Route>

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
