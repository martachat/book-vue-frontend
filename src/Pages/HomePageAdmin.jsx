import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:5005/books?_expand=author")
      .then((books) => {
        console.log(books.data);
        setBooks(books.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  function truncate(str) {
    return str.length > 60 ? str.substring(0, 60) + "..." : str;
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  const handleDeleteBook = (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5005/books/${bookId}`)
        .then(() => {
          console.log(`Book with ID ${bookId} deleted successfully`);
          navigate('/admin');
        })
        .catch((error) => {
          console.error(`Error deleting book with ID ${bookId}`, error);
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="home_page">
        {filteredBooks.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id} className="container_home">
            {book ? (
              <div className="container_home">
                <img src={book.image} alt={book.title} width={"300px"} />
                <div className="home_text">
                  <h4>{book.title}</h4>
                  {book.author ? (
                    <Link to={`/authors/${book.author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <p>By <strong>{book.author.name}</strong></p>
                    </Link>
                  ) : (
                    <p>Author information not available</p>
                  )}
                  <p>{truncate(book.description)}</p>
                </div>
                <div className="edit-delete-buttons">
                  <Link to={`/books/${book.id}/edit`}>
                  <button>Edit Book</button>
                  </Link>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete Book</button>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
