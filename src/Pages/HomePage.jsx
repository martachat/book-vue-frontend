import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5005/books")
      .then((books) => {
        console.log(books.data);
        setBooks(books.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  function truncate(str) {
    return str.length > 60 ? str.substring(0, 60) + "..." : str;
  }

  useEffect(() => {
    books.map((book) => {
      axios
        .get(`http://localhost:5005/authors/${book.authorId}`)
        .then((author) => {
          console.log(author.data);
          setAuthor(author.data);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }, [books]);
  function handleSearch(e) {
    const query = e.target.value;
    axios
      .get(`http://localhost:5005/books?q=${query}`)
      .then((responseSearch) => {
        setBooks(responseSearch.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search"
        onChange={handleSearch}
      ></input>
      <div className="home_page">
        {books.map((book) => {
          {
            return (
              <Link to={`/`} key={book.id} className="container_home">
                {book ? (
                  <div className="container_home">
                    <img
                      src={book.image}
                      alt={book.title}
                      width={"300px"}
                    ></img>
                    <div className="home_text">
                      <h4>{book.title}</h4>
                      {author && (
                        <p>
                          {" "}
                          By <strong>{author.name}</strong>
                        </p>
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
