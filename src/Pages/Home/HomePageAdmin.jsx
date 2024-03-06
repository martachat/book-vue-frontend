import axios from "../../api/axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function HomePageAdmin() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState([]);
  const [author, setAuthor] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [success, setSuccess] = useState(false);

  var notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });

  const successToast = () => {
    notyf.success("asdasd asdasd");
  };
  useEffect(() => {
    axios
      .get("https://book-vue-backend.onrender.com/books?_expand=author")
      .then((books) => {
        console.log(books.data);
        setBooks(books.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [book]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  function truncate(str) {
    return str.length > 60 ? str.substring(0, 60) + "..." : str;
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  const handleDeleteBook = (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      axios
        .delete(`https://book-vue-backend.onrender.com/books/${bookId}`)
        .then(() => {
          console.log(`Book with ID ${bookId} deleted successfully`);
          // navigate("/admin");
          setBook(bookId);
          setSuccess(true);
          notyf.success(`book ${bookId} has been successfully deleted`);
        })
        .catch((error) => {
          console.error(`Error deleting book with ID ${bookId}`, error);
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className="home_page">
        {filteredBooks.map((book) => (
          <div key={book.id} className="container_home">
            {book ? (
              <div className="container_home">
                <img src={book.image} alt={book.title} width={"300px"} />
                <div className="home_text">
                  <Link to={`/books/${book.id}`} className="link">
                    {" "}
                    <h4>{book.title}</h4>
                  </Link>
                  {book.author ? (
                    <Link to={`/authors/${book.author.id}`} className="link">
                      <p>
                        By <strong>{book.author.name}</strong>
                      </p>
                    </Link>
                  ) : (
                    <p>Author information not available</p>
                  )}
                  <p>{truncate(book.description)}</p>
                </div>
                <div className="edit-delete-buttons">
                  <Link to={`/books/${book.id}/edit`}>
                    <button className="btn-home">Edit Book</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="btn-home"
                  >
                    Delete Book
                  </button>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ))}
      </div>
      {/* {success ? (
        <AlertBox className="alert" open={success}></AlertBox>
      ) : (
        <div />
      )} */}

      <Link to={"create"}>
        <button className="add-new-book">+</button>
        {/* <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab> */}
      </Link>
    </div>
  );
}

export default HomePageAdmin;