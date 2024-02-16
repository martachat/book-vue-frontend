import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [books, setBooks] = useState([]);
//   const [author, setAuthor] = useState([]);
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

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:5005/authors/${book.id}`)
  //       .then((author) => {
  //         console.log(author.data);
  //         setAuthor(author.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }, [books])
  return (
    <div className="home_page">
      {books.map((book) => {
        {
          return (
            <div key={book.id} className="container_home">
              {book ? (
                <>
                  <img src={book.image} alt={book.title} width={"300px"}></img>
                  <div className="home_text">
                    <h4>{book.title}</h4>
                    <p>By me</p>
                    <p>{truncate(book.description)}</p>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default HomePage;
