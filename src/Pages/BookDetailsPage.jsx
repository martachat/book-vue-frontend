import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BookDetailsPage() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [authorDetails, setAuthorDetails] = useState(null);
  const [genreDetails, setGenreDetails] = useState(null);
  const [languageDetails, setLanguageDetails] = useState(null);
  const [publisherDetails, setPublisherDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5005/books/${id}`)
      .then((response) => {
        setBookDetails(response.data);

        const authorId = response.data.authorId;
        axios.get(`http://localhost:5005/authors/${authorId}`)
          .then((authorResponse) => {
            setAuthorDetails(authorResponse.data);
          })
          .catch((error) => {
            console.log(error);
          });

        const genreId = response.data.genreId;
        axios.get(`http://localhost:5005/genres/${genreId}`)
          .then((genreResponse) => {
            setGenreDetails(genreResponse.data);
            console.log(genreResponse.data);
          })
          .catch((error) => {
            console.log(error);
          });

        const languageId = response.data.languageId;
        axios.get(`http://localhost:5005/languages/${languageId}`)
          .then((languageResponse) => {
            setLanguageDetails(languageResponse.data);
            console.log(languageResponse.data);
          })
          .catch((error) => {
            console.log(error);
          });

        const publisherId = response.data.publisherId;
        axios.get(`http://localhost:5005/publishers/${publisherId}`)
          .then((publisherResponse) => {
            setPublisherDetails(publisherResponse.data);
            console.log(publisherResponse.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  return (
    <div>
      {bookDetails && authorDetails && genreDetails && languageDetails && publisherDetails ? (
        <>
          <img
            src={bookDetails.image}
            alt={bookDetails.title}
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
          <h2>{bookDetails.title}</h2>
          <p>By {authorDetails.name}</p>
          <p>{bookDetails.description}</p>
          <h3>Genre</h3>
          <p>{genreDetails.name}</p>
          <table>
            <tbody>
              <tr>
                <th>Language:</th>
                <td>{languageDetails.name}</td>
              </tr>
              <tr>
                <th>Publisher:</th>
                <td>{publisherDetails.name}</td>
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetailsPage;



