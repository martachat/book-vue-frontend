import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function BookDetailsPage() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://book-vue-backend.onrender.com/books/${id}?_expand=author&_expand=publisher&_expand=genre&_expand=language`
      )
      .then((response) => {
        console.log(response.data);
        setBookDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {bookDetails ? (
        <>
          <div className="book-details-content">
            <div className="book-details-image">
              <img
                src={bookDetails.image}
                alt={bookDetails.title}
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>

            <div className="book-details-text">
              <h2>{bookDetails.title}</h2>
              <Link
                to={`/authors/${bookDetails.author.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p>
                  By <strong>{bookDetails.author.name}</strong>
                </p>
              </Link>
              <p>{bookDetails.description}</p>
            </div>
          </div>

          <h3>Genre</h3>
          <Link
            to={`/genres/${bookDetails.genre.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button style={{ backgroundColor: "#6C757D", color: "white" }}>
              {bookDetails.genre.name}
            </button>
          </Link>
          <div
            className="center-table-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <table className="center-table">
              <tbody>
                <tr>
                  <th>Language:</th>
                  <td>{bookDetails.language.name}</td>
                </tr>
                <tr>
                  <th>Publisher:</th>
                  <td>
                    <button
                      style={{ backgroundColor: "#6C757D", color: "white" }}
                    >
                      <Link
                        to={`/publishers/${bookDetails.publisher.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {bookDetails.publisher.name}
                      </Link>
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>Publication Date:</th>
                  <td>{bookDetails.publicationDate}</td>
                </tr>
                <tr>
                  <th>Number of pages:</th>
                  <td>{bookDetails.pages}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetailsPage;
