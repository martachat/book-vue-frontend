import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/Navbar";
import BookDetailsPage from "./Pages/BookDetailsPage";
import AuthorDetailsPage from "./Pages/AuthorDetailsPage";
import GenreDetailsPage from "./Pages/GenreDetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/books/:id" element={<BookDetailsPage />}></Route>
        <Route path="/authors/:id" element={<AuthorDetailsPage />}></Route>
        <Route path="/genres/:id" element={<GenreDetailsPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
