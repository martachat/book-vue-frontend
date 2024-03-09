import axios from "../../api/axios";
import { useEffect, useState } from "react";
// import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";

// const accessToken = "";

// const axiosAuth = axios.create({
//   baseURL: apiURL,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// });

function HomePage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("book");
  const [sortOption, setSortOption] = useState("title");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://book-vue-backend.onrender.com/books?_expand=author")
      .then((books) => {
        setBooks(books.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setFilterOption("book");
    setSortOption("");
  }, []);

  const filteredItems = books
    .filter((item) => {
      const searchTarget =
        filterOption === "book"
          ? item.title.toLowerCase()
          : item.author && item.author.name.toLowerCase();
      return searchTarget && searchTarget.startsWith(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "author") {
        const authorA = (a.author && a.author.name) || "";
        const authorB = (b.author && b.author.name) || "";
        return authorA.localeCompare(authorB);
      } else if (sortOption === "date") {
        const dateA = new Date(a.publicationDate || 0);
        const dateB = new Date(b.publicationDate || 0);
        return dateA - dateB;
      } else if (sortOption === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  function truncate(str) {
    return str.length > 60 ? str.substring(0, 60) + "..." : str;
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleFilterOptionChange(e) {
    setFilterOption(e.target.value);
  }

  function handleSortOptionChange(e) {
    setSortOption(e.target.value);
  }

  return (
    <div>
      <Banner />

      <form className="flex items-center max-w-screen-md mx-auto space-x-4 ...">
        <label className="sr-only">Search</label>
        <select
          value={filterOption}
          onChange={handleFilterOptionChange}
          className="bg-gray-50 border border-gray-300 max-w-40 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="book">Search by Book</option>
          <option value="author">Search by Author</option>
        </select>
        <select
          value={sortOption}
          onChange={handleSortOptionChange}
          className="bg-gray-50 border max-w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">No Sorting</option>
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>

        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 19l-4-4M19 12A7 7 0 1 1 5 12a7 7 0 0 1 14 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search book name..."
            required
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>
      <div className="home_page">
        {filteredItems.map((item) => (
          <div key={item.id} className="container_home">
            <div className="container_home">
              <img src={item.image} alt={item.title} width={"300px"}></img>
              <div className="home_text p-4">
                <Link to={`/books/${item.id}`} className="link">
                  <h4 className="pb-4">{item.title}</h4>{" "}
                </Link>
                {item.author ? (
                  <div style={{ textDecoration: "none", color: "inherit" }}>
                    <Link to={`/authors/${item.author.id}`} className="link">
                      <p className="pb-4">
                        By <strong>{item.author.name}</strong>
                      </p>
                    </Link>
                  </div>
                ) : (
                  <p>Author information not available</p>
                )}
                <p>{truncate(item.description)}</p>
              </div>
              <p>⭐ {item.rating || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
