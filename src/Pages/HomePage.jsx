import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

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

      axios
      .get('http://localhost:5005/authors')
      .then((authorsResponse) => {
        setAuthor(authorsResponse.data);
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

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      ></input>
      <div className="home_page">
        {filteredBooks.map((book) => {
          {
            return (
              <Link to={`/books/${book.id}`} key={book.id} className="container_home">
                {book ? (
                  <div className="container_home">
                    <img
                      src={book.image}
                      alt={book.title}
                      width={"300px"}
                    ></img>
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
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default HomePage;