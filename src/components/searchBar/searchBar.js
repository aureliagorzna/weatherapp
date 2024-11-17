import React, { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./index.css";

const SearchBar = ({ fetchData }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = () => {
    fetchData(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <FaSearch
        className="search-icon"
        onClick={handleSearch}
        aria-label="Search"
      />
    </div>
  );
};

export default SearchBar;
