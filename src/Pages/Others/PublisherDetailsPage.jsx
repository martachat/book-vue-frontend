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
    <div className="flex-wrap">
      {publisherDetails ? (
        <>
          <h2>{publisherDetails.name}</h2>

          {publisherBooks.length > 0 ? (
            <div className="flex m-8 flex-wrap">
              {publisherBooks.map((book) => (
                <div key={book.id} className="flex-wrap p-2 max-w-48">
                  <Link
                    to={`/books/${book.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    className="flex-wrap"
                  >
                    <div className="p-8 mx-auto text-center border">
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
                    </div>
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
