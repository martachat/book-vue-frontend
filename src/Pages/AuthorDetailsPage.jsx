import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AuthorDetailsPage() {
  const { id } = useParams();
  const [authorDetails, setAuthorDetails] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5005/authors/${id}`)
      .then((response) => {
        setAuthorDetails(response.data);
        console.log(response.data);

        return axios.get(`http://localhost:5005/books`);
      })
      .then((booksResponse) => {
        const authorBooks = booksResponse.data.filter(book => book.authorId === Number(id));
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
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {authorBooks.map((book) => (
                <li key={book.id}>
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                  />
                  <strong>{book.title}</strong> 
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
