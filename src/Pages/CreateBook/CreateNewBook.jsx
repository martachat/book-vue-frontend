import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateNewBook.css";
import SearchableDropdown from "../../components/SearchableDropdown";
import PopupDialog from "../../components/PopupDialog";

function CreateNewBook() {
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [pages, setPages] = useState(0);

  const [genre, setGenre] = useState("Select Genre...");
  const [genreId, setGenreId] = useState(0);
  const [language, setLanguage] = useState("Select Language...");
  const [languageId, setLanguageId] = useState(0);
  const [author, setAuthor] = useState("Select Author...");
  const [authorId, setAuthorId] = useState(0);
  const [publisher, setPublisher] = useState("Select Publisher...");
  const [publisherId, setPublisherId] = useState(0);

  const [valueGenre, setValueGenre] = useState("Select Genre...");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const genres = [
    { id: 1, name: "Crime & Detective Novels" },
    { id: 2, name: "Fiction & Literature" },
    { id: 3, name: "Fantasy & Science Fiction" },
    { id: 4, name: "Biography & Autobiography" },
    { id: 5, name: "Philosophy" },
    { id: 6, name: "Children's Literature" },
    { id: 7, name: "Poetry & Poems" },
  ];
  const languages = [
    { id: 1, name: "English" },
    { id: 2, name: "French" },
    { id: 3, name: "Spanish" },
    { id: 4, name: "Italian" },
    { id: 5, name: "Portuguese" },
    { id: 6, name: "Arabic" },
    { id: 7, name: "Russian" },
  ];

  const handleSend = (inputValue) => {
    // Handle the input value here
    console.log("Sending:", inputValue);
    const newAothur = { name: inputValue };
    axios
      .post("https://book-vue-backend.onrender.com/authors", newAothur)
      .then(() => {
        return axios.get("https://book-vue-backend.onrender.com/authors");
      })
      .then((authors) => {
        setAuthors(authors.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSend2 = (inputValue) => {
    // Handle the input value here
    console.log("Sending:", inputValue);
    const newPublisher = { name: inputValue };
    axios
      .post("https://book-vue-backend.onrender.com/publishers", newPublisher)
      .then(() => {
        return axios.get("https://book-vue-backend.onrender.com/publishers");
      })
      .then((publishers) => {
        setPublishers(publishers.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    axios
      .all([
        axios.get("https://book-vue-backend.onrender.com/authors"),
        axios.get("https://book-vue-backend.onrender.com/publishers"),
      ])
      .then(
        axios.spread((res1, res2) => {
          setAuthors(res1.data);
          setPublishers(res2.data);
          console.log("authors", authors);
          console.log("publishers", publishers);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const newBook = {
      title: title,
      description: description,
      image: image,
      pages: pages,
      publicationDate: publicationDate,
      genreId: genreId,
      languageId: languageId,
      publisherId: publisherId,
      authorId: authorId,
      rating: 0.0,
    };

    axios
      .post("https://book-vue-backend.onrender.com/books", newBook)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="container">
      <h1>create new book</h1>
      <form className="inputs" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            className="input"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Image
          <input
            className="input"
            type="text"
            placeholder="Image"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </label>
        <label>
          Description
          <input
            className="input"
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <label>
          Publication Date
          <input
            className="input"
            type="date"
            placeholder="Publication Date"
            onChange={(e) => {
              setPublicationDate(e.target.value);
            }}
          />
        </label>
        <label>
          Number of Pages
          <input
            className="input"
            type="number"
            placeholder="Number of Pages"
            onChange={(e) => {
              setPages(e.target.value);
            }}
          />
        </label>

        <div className="App">
          <SearchableDropdown
            options={genres}
            label="name"
            id="id"
            selectedVal={genre}
            handleChange={(val, id) => {
              setGenre(val);
              setGenreId(id);
            }}
          />
        </div>

        <div className="App">
          <SearchableDropdown
            options={languages}
            label="name"
            id="id"
            selectedVal={language}
            handleChange={(val, id) => {
              setLanguage(val);
              setLanguageId(id);
            }}
          />
        </div>

        <div className="dropdown-container">
          <SearchableDropdown
            options={authors}
            label="name"
            id="id"
            selectedVal={author}
            handleChange={(val, id) => {
              setAuthor(val);
              setAuthorId(id);
            }}
          />
          <button className="addNew" onClick={openPopup}>
            +
          </button>
          <PopupDialog
            isOpen={isPopupOpen}
            onClose={closePopup}
            title="Add New Author"
            inputPlaceholder="name of author"
            onSend={handleSend2}
          />
        </div>

        <div className="dropdown-container">
          <SearchableDropdown
            options={publishers}
            label="name"
            id="id"
            selectedVal={publisher}
            handleChange={(val, id) => {
              setPublisher(val);
              setPublisherId(id);
            }}
          />
          <button className="addNew" onClick={openPopup}>
            +
          </button>
          <PopupDialog
            isOpen={isPopupOpen}
            onClose={closePopup}
            title="Add New Publisher"
            inputPlaceholder="name of the Publisher..."
            onSend={handleSend}
          />
        </div>

        <button className="submit"> submit</button>
        <div className="space"></div>
      </form>
    </div>
  );
}

export default CreateNewBook;
