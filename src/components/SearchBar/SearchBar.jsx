import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdOutlineSearch } from "react-icons/md";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);

    setQuery("");
  };

  return (
    <div className={styles.searchbar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pesquisar..."
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">
          <MdOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
