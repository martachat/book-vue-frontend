import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useParams } from "react-router-dom";
import "./BookDetails.css";
import Rating from "../../components/Rating";

function BookDetailsPage() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  const [total, setTotal] = useState(0);
  const [globalRatings, setGlobalRatings] = useState(0);
  const [fiveP, setFiveP] = useState(0);
  const [fourP, setFourP] = useState(0);
  const [threeP, setThreeP] = useState(0);
  const [twoP, setTwoP] = useState(0);
  const [oneP, setOneP] = useState(0);

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
          <div className="book-details-content flex pt-10">
            <div className="book-details-image ml-4 flex flex-1 flex-col h-240 w-240 flex-shrink-0 rounded-md border border-gray-200 px-24 ">
              <img
                src={bookDetails.image}
                alt={bookDetails.title}
                style={{ width: "400px", height: "550px" }}
              />
            </div>

            <div className="book-details-text p-24 min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight p-4">
                {bookDetails.title}
              </h2>
              <Link
                to={`/authors/${bookDetails.author.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p className="py-5">
                  By <strong>{bookDetails.author.name}</strong>
                </p>
              </Link>
              <p>{bookDetails.description}</p>
            </div>
          </div>

          <div className="pt-10 columns-2 pb-10 place-self-end">
            <div className="w-full">
              <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight p-4 underline #2563eb">
                Genre
              </h3>
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
            </div>
            <div className=""></div>

            <Rating  total= {total} globalRatings={globalRatings} fiveP={fiveP} fourP={fourP} threeP={threeP} twoP={twoP} oneP={oneP} ></Rating>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetailsPage;
