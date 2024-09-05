import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Search({ setSearchQuery, title }) {
  const handleQueryOnChange = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <div className="app-search">
      <img alt="search icon" src="./assets/icon-search.svg"></img>
      <label>
        <input
          type="text"
          placeholder={title}
          onChange={handleQueryOnChange}
        ></input>
      </label>
    </div>
  );
}

export default Search;
