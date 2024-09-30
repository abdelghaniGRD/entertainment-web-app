import "./App.css";
import BookMarked from "./BookMarked.js";
import "./Main.js";
import Main from "./Main.js";
import Movies from "./Movies.js";

import TvSeries from "./TvSeries.js";
import Header from "./Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./Data/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        localStorage.setItem("data", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>

        <Routes>
          <Route
            path="/"
            element={<Main data={data} loading={loading} />}
          ></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/tv-series" element={<TvSeries />}></Route>
          <Route path="/bookmarked" element={<BookMarked />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
