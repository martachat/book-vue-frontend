import axios from "../../api/axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function HomePageAdmin({ islogedin }) {
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
        className="m-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-4/5 focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
      {islogedin ? (
        <div className="home_page">
          {filteredBooks.map((book) => (
            <div key={book.id} className="container_home">
              <div className="container_home">
                <img src={book.image} alt={book.title} width={"300px"} />
                <div className="home_text">
                  <Link to={`/books/${book.id}`} className="link">
                    {" "}
                    <h4 className="text-xl pb-4">{book.title}</h4>
                  </Link>
                  {book.author ? (
                    <Link to={`/authors/${book.author.id}`} className="link">
                      <p className="pb-4">
                        By <strong>{book.author.name}</strong>
                      </p>
                    </Link>
                  ) : (
                    <p>Author information not available</p>
                  )}
                  <p>{truncate(book.description)}</p>
                </div>
                <div className="edit-delete-buttons">
                  <Link to={`/admin/${book.id}/edit`}>
                    <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                      Edit Book
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto m-4"
                  >
                    Delete Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>need to login...</p>
          <Link to={"/login"}>
            <p className="text-black underline">Login</p>
          </Link>
        </div>
      )}
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
