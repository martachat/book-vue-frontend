import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./CreateNewBook.css";
import SearchableDropdown from "../../components/SearchableDropdown";
import PopupDialog from "../../components/PopupDialog";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function CreateNewBook() {
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [book, setBook] = useState([]);

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

  var notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });

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

  const handleAddAuthor = (inputValue) => {
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
        notyf.success(
          `author: ${authors.data.name} has been successfully added`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPublisher = (inputValue) => {
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
        notyf.success(
          `publisher: ${publishers.data.name} has been successfully added`
        );
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
    // axios
    //   .all([
    //     axios.get("https://book-vue-backend.onrender.com/authors"),
    //     axios.get("https://book-vue-backend.onrender.com/publishers"),
    //   ])
    //   .then(
    //     axios.spread((res1, res2) => {
    //       setAuthors(res1.data);
    //       setPublishers(res2.data);
    //       console.log("authors", authors);
    //       console.log("publishers", publishers);
    //     })
    //   )
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get("https://book-vue-backend.onrender.com/authors")
      .then((authors) => {
        setAuthors(authors.data);
        console.log("authors", authors.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://book-vue-backend.onrender.com/publishers")
      .then((publishers) => {
        setPublishers(publishers.data);
        console.log("publishers", publishers.data);
      })
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
      publisherId: Number(publisherId),
      authorId: Number(authorId),
      rating: 0.0,
    };

    axios
      .post("https://book-vue-backend.onrender.com/books", newBook)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
        console.log("book", book);
        notyf.success(`book: ${newBook.title} has been successfully added`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="mx-auto max-w-4xl sm:mt-30 shadow-2xl p-10 mr">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        create new book
      </h1>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Title
              <div className="mt-2.5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  name="Title"
                  placeholder="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Image
              <div className="mt-2.5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  placeholder="Image"
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                  required
                />
              </div>
            </label>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Description
              <div className="mt-2.5">
                <textarea
                  className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                  type="text"
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Publication Date
              <div className="mt-2.5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="date"
                  placeholder="Publication Date"
                  onChange={(e) => {
                    setPublicationDate(e.target.value);
                  }}
                  required
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Number of Pages
              <div className="mt-2.5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="number"
                  placeholder="Number of Pages"
                  onChange={(e) => {
                    setPages(e.target.value);
                  }}
                  required
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Genre
              <div className="mt-2.5">
                <SearchableDropdown
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Languages
              <div className="mt-2.5 ">
                <div>
                  <SearchableDropdown
                    options={languages}
                    label="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="id"
                    selectedVal={language}
                    handleChange={(val, id) => {
                      setLanguage(val);
                      setLanguageId(id);
                    }}
                  />
                </div>
              </div>
            </label>
          </div>

          <div className="flex mt-6 items-center justify-center gap-x-6">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Aothurs
              <div className="flex mt-6 justify-center gap-x-6">
                <SearchableDropdown
                  options={authors}
                  label="name"
                  id="id"
                  selectedVal={author}
                  handleChange={(val, id) => {
                    setAuthor(val);
                    setAuthorId(id);
                  }}
                  required
                />
                <button
                  onClick={openPopup}
                  className="items-center h-10 rounded-md bg-indigo-600 px-6 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  +
                </button>
                <PopupDialog
                  isOpen={isPopupOpen}
                  onClose={closePopup}
                  title="Add New Author"
                  inputPlaceholder="name of author"
                  onSend={handleAddAuthor}
                />
              </div>
            </label>
          </div>

          <div className="flex mt-6 items-center justify-center gap-x-6">
            <label className="text-sm font-semibold leading-6 text-gray-900">
              Publishers
              <div className="flex mt-6 justify-center gap-x-6">
                <SearchableDropdown
                  options={publishers}
                  label="name"
                  id="id"
                  selectedVal={publisher}
                  handleChange={(val, id) => {
                    setPublisher(val);
                    setPublisherId(id);
                  }}
                  required
                />
                <button
                  onClick={openPopup}
                  className="items-center h-10 rounded-md bg-indigo-600 px-6 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  +
                </button>
                <PopupDialog
                  isOpen={isPopupOpen}
                  onClose={closePopup}
                  title="Add New Publisher"
                  inputPlaceholder="name of the Publisher..."
                  onSend={handleAddPublisher}
                  required
                />
              </div>
            </label>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button className="items-center rounded-md bg-indigo-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            submit
          </button>
        </div>
        <div className="space"></div>
      </form>
    </div>
  );
}

export default CreateNewBook;
