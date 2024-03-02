import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function AuthorDetailsPage() {
  const { id } = useParams();
  const [authorDetails, setAuthorDetails] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`https://book-vue-backend.onrender.com/authors/${id}`)
      .then((response) => {
        setAuthorDetails(response.data);
        console.log(response.data);

        return axios.get(`https://book-vue-backend.onrender.com/books`);
      })
      .then((booksResponse) => {
        const authorBooks = booksResponse.data.filter(
          (book) => book.authorId === Number(id)
        );
        setAuthorBooks(authorBooks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      {authorDetails ? (
        <>
          <h2>{authorDetails.name}</h2>

          {authorBooks.length > 0 ? (
            <ul
              style={{
                listStyleType: "none",
                padding: '50px',
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {authorBooks.map((book) => (
                <li key={book.id} style={{ marginRight: "20px" }}>
                  <Link
                    to={`/books/${book.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      <img
                        src={book.image}
                        alt={book.title}
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                    <p style={{ fontWeight: "bold" }}>{book.title}</p>
                    <p>⭐{book.rating}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books available for this author.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AuthorDetailsPage;
