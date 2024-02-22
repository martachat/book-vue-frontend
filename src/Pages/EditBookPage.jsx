import React, { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

function EditBookPage() {

    const { id } = useParams(); 
    const [book, setBook] = useState({})
    const [newBookData, setNewBookData] = useState({
      title: "",
      image: "",
      pages: "",
      publicationDate: "",
      description: "",
      authorId:"",
      publisherId:"",
      rating: "",
      genreId:"",
      languageId:""

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
          .get(`http://localhost:5005/books/${id}`)
          .then((response) => {
            setBook(response.data);
            setNewBookData({
              title: response.data.title,
              image: response.data.image,
              pages: response.data.pages,
              publicationDate: response.data.publicationDate,
              description: response.data.description,
              authorId: response.data.authorId.toString(),
              publisherId: response.data.publisherId.toString(), 
              rating: response.data.rating,
              genreId: response.data.genreId.toString(), 
              languageId: response.data.languageId.toString(), 
              
            });
          })
          .catch((error) => {
            console.error(error);
          });

          axios
          .get("http://localhost:5005/authors")
          .then((response) => {
            setAuthors(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [id]);

      axios
      .get("http://localhost:5005/publishers")
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      const handleInputChange = (e) => {
        setNewBookData({
          ...newBookData,
          [e.target.name]: e.target.value,
        });
      };

      const handleAuthorSearch = (searchTerm) => {
        axios
          .get(`http://localhost:5005/authors?q=${searchTerm}`)
          .then((response) => {
            setAuthors(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const handleEditBook = () => {
        if (isNaN(newBookData.authorId)) {
          axios
            .post("http://localhost:5005/authors", { name: newBookData.authorId })
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
          .put(`http://localhost:5005/books/${id}`, {
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
          value={newBookData.authorId}
          onChange={(e) => {
            setNewBookData({ ...newBookData, authorId: e.target.value });
            handleAuthorSearch(e.target.value);
          }}
        />
        <div>
          {authors.map((author) => (
            <div key={author.id} onClick={() => setNewBookData({ ...newBookData, authorId: author.id.toString() })}>
              {author.name}
            </div>
          ))}
          <label>Publisher:</label>
        <input
          type="text"
          name="publisherId"
          value={newBookData.publisherId}
          onChange={(e) => {
            setNewBookData({ ...newBookData, publisherId: e.target.value });
            handlePublisherSearch(e.target.value);
          }}
        />
        <div>
          {publishers.map((publisher) => (
            <div key={publisher.id} onClick={() => setNewBookData({ ...newBookData, publisherId: publisher.id.toString() })}>
              {publisher.name}
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
     </div>
     <button type="button" onClick={handleEditBook}>
          Save Changes
        </button>
   </form>
</div>
  )
}

export default EditBookPage