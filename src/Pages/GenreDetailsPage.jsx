import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function GenreDetailsPage() {
  const { id } = useParams();
  const [genreDetails, setGenreDetails] = useState(null);
  const [genreBooks, setGenreBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreResponse = await axios.get(
          `https://book-vue-backend.onrender.com/genres/${id}`
        );
        setGenreDetails(genreResponse.data);

        const booksResponse = await axios.get(
          `https://book-vue-backend.onrender.com/books`
        );

        const genreBooks = booksResponse.data.filter(
          (book) => book.genreId === Number(id)
        );

        const booksWithAuthors = await Promise.all(
          genreBooks.map(async (book) => {
            const authorResponse = await axios.get(
              `https://book-vue-backend.onrender.com/authors/${book.authorId}`
            );
            return { ...book, author: authorResponse.data.name };
          })
        );

        setGenreBooks(booksWithAuthors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {genreDetails ? (
        <>
          <h2>{genreDetails.name}</h2>

          {genreBooks.length > 0 ? (
            <ul
              style={{
                listStyleType: "none",
                padding: '50px',
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {genreBooks.map((book) => (
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
                    <p>
                      By{" "}
                      <Link
                        to={`/authors/${book.authorId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {book.author}
                      </Link>
                    </p>
                    <p>⭐ {book.rating}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books available for this genre.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GenreDetailsPage;
