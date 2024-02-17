import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GenreDetailsPage() {

    const { id } = useParams();
    const [genreDetails, setGenreDetails] = useState(null);
    const [genreBooks, setGenreBooks] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const genreResponse = await axios.get(`http://localhost:5005/genres/${id}`);
            setGenreDetails(genreResponse.data);
    
            const booksResponse = await axios.get(`http://localhost:5005/books`);
    
            const genreBooks = booksResponse.data.filter(book => book.genreId === Number(id));
    
            const booksWithAuthors = await Promise.all(
              genreBooks.map(async (book) => {
                const authorResponse = await axios.get(`http://localhost:5005/authors/${book.authorId}`);
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
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {genreBooks.map((book) => (
                    <li key={book.id}>
                      <img
                        src={book.image}
                        alt={book.title}
                        style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }}
                      />
                      <strong>{book.title}</strong> - {book.author}
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


export default GenreDetailsPage