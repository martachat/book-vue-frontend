import axios from "../../api/axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import Button from "@mui/material/Button";

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
      <div>
        <input
          type="text"
          className="search"
          placeholder="Search 🔎"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          style={{ borderColor: "#393B72", color: "white" }}
          value={filterOption}
          onChange={handleFilterOptionChange}
        >
          <option value="book">Search by Book</option>
          <option value="author">Search by Author</option>
        </select>
        <select value={sortOption} onChange={handleSortOptionChange}>
          <option value="">No Sorting</option>
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      <div className="home_page">
        {filteredItems.map((item) => (
          <div key={item.id} className="container_home">
            <div className="container_home">
              <img src={item.image} alt={item.title} width={"300px"}></img>
              <div className="home_text">
                <Link to={`/books/${item.id}`} className="link">
                  <h4>{item.title}</h4>{" "}
                </Link>
                {item.author ? (
                  <div style={{ textDecoration: "none", color: "inherit" }}>
                    <Link to={`/authors/${item.author.id}`} className="link">
                      <p>
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
