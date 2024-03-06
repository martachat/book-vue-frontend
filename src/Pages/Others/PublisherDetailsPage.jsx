import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useParams } from "react-router-dom";

function PublisherDetailsPage() {
  const { id } = useParams();
  const [publisherDetails, setPublisherDetails] = useState(null);
  const [publisherBooks, setPublisherBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publisherResponse = await axios.get(
          `https://book-vue-backend.onrender.com/publishers/${id}`
        );
        setPublisherDetails(publisherResponse.data);

        const booksResponse = await axios.get(
          `https://book-vue-backend.onrender.com/books`
        );
        const publisherBooks = booksResponse.data.filter(
          (book) => book.publisherId === Number(id)
        );

        const booksWithAuthors = await Promise.all(
          publisherBooks.map(async (book) => {
            try {
              const authorResponse = await axios.get(
                `https://book-vue-backend.onrender.com/authors/${book.authorId}`
              );
              return { ...book, author: authorResponse.data.name };
            } catch (authorError) {
              console.error(
                `Error fetching author for book ${book.id}:`,
                authorError
              );
              return { ...book, author: "Unknown Author" };
            }
          })
        );

        setPublisherBooks(booksWithAuthors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {publisherDetails ? (
        <>
          <h2>{publisherDetails.name}</h2>

          {publisherBooks.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {publisherBooks.map((book) => (
                <div
                  key={book.id}
                  style={{ marginRight: "20px", marginBottom: "20px" }}
                >
                  <Link
                    to={`/books/${book.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        marginBottom: "5px",
                      }}
                    />
                    <p style={{ fontWeight: "bold", margin: 0 }}>
                      {book.title}
                    </p>
                    <p style={{ margin: 0 }}>
                      By{" "}
                      <Link
                        to={`/authors/${book.authorId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {book.author}
                      </Link>
                    </p>
                    <p style={{ margin: 0 }}>⭐ {book.rating}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No books available for this publisher.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PublisherDetailsPage;