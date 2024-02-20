import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function PublisherDetailsPage() {
  const { id } = useParams();
  const [publisherDetails, setPublisherDetails] = useState(null);
  const [publisherBooks, setPublisherBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publisherResponse = await axios.get(`http://localhost:5005/publishers/${id}`);
        setPublisherDetails(publisherResponse.data);

        const booksResponse = await axios.get(`http://localhost:5005/books`);
        const publisherBooks = booksResponse.data.filter(book => book.publisherId === Number(id));

        const booksWithAuthors = await Promise.all(
          publisherBooks.map(async (book) => {
            try {
              const authorResponse = await axios.get(`http://localhost:5005/authors/${book.authorId}`);
              return { ...book, author: authorResponse.data.name };
            } catch (authorError) {
              console.error(`Error fetching author for book ${book.id}:`, authorError);
              return { ...book, author: 'Unknown Author' };
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
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {publisherBooks.map((book) => (
                <li key={book.id}>
                  <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img
                      src={book.image}
                      alt={book.title}
                      style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }}
                    />
                    <strong>{book.title}</strong> - {' '}
                    <Link to={`/authors/${book.authorId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {book.author}
                    </Link>
                  </Link>
                </li>
              ))}
            </ul>
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
