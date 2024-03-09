import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Login from "../Login/Login";

function EditBookPage({ islogedin }) {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [newBookData, setNewBookData] = useState({
    title: "",
    image: "",
    pages: "",
    publicationDate: "",
    description: "",
    authorId: "",
    publisherId: "",
    rating: "",
    genreId: "",
    languageId: "",
  });
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
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
  const navigate = useNavigate();
  var notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });

  useEffect(() => {
    axios
      .get(`https://book-vue-backend.onrender.com/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setNewBookData({
          title: response.data.title,
          image: response.data.image,
          pages: response.data.pages,
          publicationDate: response.data.publicationDate,
          description: response.data.description,
          authorId: response.data.authorId,
          publisherId: response.data.publisherId,
          rating: response.data.rating,
          genreId: response.data.genreId,
          languageId: response.data.languageId,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("https://book-vue-backend.onrender.com/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("https://book-vue-backend.onrender.com/publishers")
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setNewBookData({
      ...newBookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthorSearch = (searchTerm) => {
    axios
      .get(`https://book-vue-backend.onrender.com/authors?q=${searchTerm}`)
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePublisherSearch = (searchTerm) => {
    axios
      .get(`https://book-vue-backend.onrender.com/publishers?q=${searchTerm}`)
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditBook = () => {
    if (isNaN(newBookData.authorId)) {
      axios
        .post("https://book-vue-backend.onrender.com/authors", {
          name: newBookData.authorId,
        })
        .then((newAuthorResponse) => {
          const newAuthorId = newAuthorResponse.data.id;
          updateBook(newAuthorId);
          notyf.success(`author ${newAuthorId} has been successfully added`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateBook(newBookData.authorId);
    }
  };

  const updateBook = (authorId) => {
    axios
      .put(`https://book-vue-backend.onrender.com/books/${id}`, {
        ...newBookData,
        authorId: authorId,
      })
      .then((response) => {
        console.log("Book updated successfully", response.data);
        notyf.success(
          `book ${response.data.title} has been successfully updated`
        );
        navigate(`/books/${id}`);
      })
      .catch((error) => {
        console.error("Error updating book", error);
      });
  };

  return (
    <div className="mx-auto max-w-4xl sm:mt-30 shadow-2xl p-10 mr">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Edit Book
      </h2>
      {islogedin ? (
        <form className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Title:
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="title"
                    value={newBookData.title}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Image URL:
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="image"
                    value={newBookData.image}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Pages:
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="pages"
                    value={newBookData.pages}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Publication date:
                <div className="mt-2.5">
                  <input
                    type="date"
                    name="publicationDate"
                    value={newBookData.publicationDate}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </label>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Description:
                <div className="mt-2.5">
                  <textarea
                    className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                    name="description"
                    value={newBookData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
            </div>

            <div className="flex mt-6 items-center justify-center gap-x-6">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Author:
                <div className="flex mt-6 justify-center gap-x-6">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="authorId"
                    value={
                      authors.find(
                        (author) =>
                          author.id.toString() === newBookData.authorId
                      )?.name || newBookData.authorId
                    }
                    placeholder="Type author"
                    onChange={(e) => {
                      setNewBookData({
                        ...newBookData,
                        authorId: e.target.value,
                      });
                      handleAuthorSearch(e.target.value);
                    }}
                  />
                </div>
              </label>
              <div className="flex mt-6 items-center justify-center gap-x-6">
                {authors
                  .filter((author) =>
                    author.name.toLowerCase().includes(newBookData.authorId)
                  )
                  .map((filteredAuthor) => (
                    <div
                      key={filteredAuthor.id}
                      onClick={() =>
                        setNewBookData({
                          ...newBookData,
                          authorId: filteredAuthor.id.toString(),
                        })
                      }
                    >
                      {filteredAuthor.name}
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex mt-6 items-center justify-center gap-x-6">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Publisher:
                <div className="flex mt-6 justify-center gap-x-6">
                  <input
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    name="publisherId"
                    value={
                      publishers.find(
                        (publisher) =>
                          publisher.id.toString() === newBookData.publisherId
                      )?.name || newBookData.publisherId
                    }
                    placeholder="Type publisher"
                    onChange={(e) => {
                      setNewBookData({
                        ...newBookData,
                        publisherId: e.target.value,
                      });
                      handlePublisherSearch(e.target.value);
                    }}
                  />
                </div>
              </label>
              <div className="flex mt-6 items-center justify-center gap-x-6">
                {publishers
                  .filter((publisher) =>
                    publisher.name
                      .toLowerCase()
                      .includes(newBookData.publisherId)
                  )
                  .map((filteredPublisher) => (
                    <div
                      key={filteredPublisher.id}
                      onClick={() =>
                        setNewBookData({
                          ...newBookData,
                          publisherId: filteredPublisher.id.toString(),
                        })
                      }
                    >
                      {filteredPublisher.name}
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex mt-6 items-center justify-center gap-x-6">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Genre:
                <div className="flex mt-6 justify-center gap-x-6">
                  <select
                    name="genreId"
                    value={newBookData.genreId}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      Select a genre
                    </option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            <div className="flex mt-6 items-center justify-center gap-x-6">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Language:
                <div className="flex mt-6 justify-center gap-x-6">
                  <select
                    name="languageId"
                    value={newBookData.languageId}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      Select a language
                    </option>
                    {languages.map((language) => (
                      <option key={language.id} value={language.id}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="button"
              onClick={handleEditBook}
              className="items-center m-10 rounded-md bg-indigo-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p>need to be logged in...</p>
          <Link to={"/login"}>
            <p className="text-black underline">Login</p>
          </Link>
        </div>
      )}

      <div className="space"></div>
    </div>
  );
}

export default EditBookPage;
