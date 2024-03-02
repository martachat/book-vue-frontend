import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function BookDetailsPage() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://book-vue-backend.onrender.com/books/${id}?_expand=author&_expand=publisher&_expand=genre&_expand=language`)
      .then((response) => {
        console.log(response.data)
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
          <img
            src={bookDetails.image}
            alt={bookDetails.title}
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
          <h2>{bookDetails.title}</h2>
          <Link to={`/authors/${bookDetails.author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <p>By {bookDetails.author.name}</p>
          </Link>

          <p>{bookDetails.description}</p>

          <h3>Genre</h3>
          <Link to={`/genres/${bookDetails.genre.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <p>{bookDetails.genre.name}</p>
          </Link>
          <table>
            <tbody>
               <tr>
                <th>Language:</th>
                <td>{bookDetails.language.name}</td>
              </tr> 
               <tr>
                <th>Publisher:</th>
                <td>
                <Link to={`/publishers/${bookDetails.publisher.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {bookDetails.publisher.name}
                </Link>
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetailsPage;



