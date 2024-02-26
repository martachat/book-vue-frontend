import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('book');

  useEffect(() => {
    axios
      .get("http://localhost:5005/books?_expand=author")
      .then((books) => {
        console.log(books.data);
        setBooks(books.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
 
  const filteredItems = books.filter((item) => {
    const searchTarget = filterOption === 'book' ? item.title.toLowerCase() : (item.author && item.author.name.toLowerCase());
    return searchTarget && searchTarget.startsWith(searchQuery.toLowerCase());
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

  return (
    <div>
     <Banner />
      <div>
        <input
          type="text"
          className="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={filterOption} onChange={handleFilterOptionChange}>
          <option value="book">Search by Book</option>
          <option value="author">Search by Author</option>
        </select>
      </div>
      <div className="home_page">
        {filteredItems.map((item) => (
          <Link to={`/books/${item.id}`} key={item.id} className="container_home">
            <div className="container_home">
              <img
                src={item.image}
                alt={item.title}
                width={"300px"}
              ></img>
              <div className="home_text">
                <h4>{item.title}</h4>
                {item.author ? (
                  <Link to={`/authors/${item.author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <p>By <strong>{item.author.name}</strong></p>
                  </Link>
                ) : (
                  <p>Author information not available</p>
                )}
                <p>{truncate(item.description)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;