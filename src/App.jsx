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
import CreateNewBook from "./Pages/CreateNewBook";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/books/:id" element={<BookDetailsPage />}></Route>
        <Route path="/authors/:id" element={<AuthorDetailsPage />}></Route>
        <Route path="/genres/:id" element={<GenreDetailsPage />}></Route>
        <Route path="/publishers/:id" element={<PublisherDetailsPage />}></Route>
        <Route path="/admin" element={<HomePageAdmin />}></Route>
        <Route path="/books/:id/edit" element={<EditBookPage />}></Route>
        <Route path="/books/create" element={<CreateNewBook />}></Route>
      </Routes>
    </div>
  );
}

export default App;
