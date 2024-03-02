import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditBookPage() {
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
    languageId: ""
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
        .post("https://book-vue-backend.onrender.com/authors", { name: newBookData.authorId })
        .then((newAuthorResponse) => {
          const newAuthorId = newAuthorResponse.data.id;
          updateBook(newAuthorId);
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
        navigate(`/books/${id}`);
      })
      .catch((error) => {
        console.error("Error updating book", error);
      });
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newBookData.title}
          onChange={handleInputChange}
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={newBookData.image}
          onChange={handleInputChange}
        />
        <label>Pages:</label>
        <input
          type="number"
          name="pages"
          value={newBookData.pages}
          onChange={handleInputChange}
        />
        <label>Publication date:</label>
        <input
          type="date"
          name="publicationDate"
          value={newBookData.publicationDate}
          onChange={handleInputChange}
          required pattern="\d{2}-\d{2}-\d{4}"
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={newBookData.description}
          onChange={handleInputChange}
        />
        <label>Author:</label>
        <input
          type="text"
          name="authorId"
          value={
            authors.find((author) => author.id.toString() === newBookData.authorId)?.name ||
            newBookData.authorId
          }
          placeholder="Type author"
          onChange={(e) => {
            setNewBookData({ ...newBookData, authorId: e.target.value });
            handleAuthorSearch(e.target.value);
          }}
        />

        <div>
          {authors
            .filter((author) => author.name.toLowerCase().includes(newBookData.authorId))
            .map((filteredAuthor) => (
              <div key={filteredAuthor.id} onClick={() => setNewBookData({ ...newBookData, authorId: filteredAuthor.id.toString() })}>
                {filteredAuthor.name}
              </div>
            ))}
        </div>

        <label>Publisher:</label>
       <input
       type="text"
       name="publisherId"
       value={
         publishers.find((publisher) => publisher.id.toString() === newBookData.publisherId)?.name ||
          newBookData.publisherId
        }
       placeholder="Type publisher"
       onChange={(e) => {
       setNewBookData({ ...newBookData, publisherId: e.target.value });
       handlePublisherSearch(e.target.value)
       }}
        />  
        <div>
          {publishers
            .filter((publisher) => publisher.name.toLowerCase().includes(newBookData.publisherId))
            .map((filteredPublisher) => (
              <div key={filteredPublisher.id} onClick={() => setNewBookData({ ...newBookData, publisherId: filteredPublisher.id.toString() })}>
                {filteredPublisher.name}
              </div>
            ))}
        </div>

        <label>Genre:</label>
        <select
          name="genreId"
          value={newBookData.genreId}
          onChange={handleInputChange}
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

        <label>Language:</label>
        <select
          name="languageId"
          value={newBookData.languageId}
          onChange={handleInputChange}
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
      </form>
      <button type="button" onClick={handleEditBook}>
        Save Changes
      </button>
    </div>
  );
}

export default EditBookPage;

