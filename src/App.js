import "./App.css";
import BookMarked from "./BookMarked.js";
import "./Main.js";
import Main from "./Main.js";
import Movies from "./Movies.js";
import Search from "./Search.js";
import TvSeries from "./TvSeries.js";
import Header from "./Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Search />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/tv-series" element={<TvSeries />}></Route>
          <Route path="/bookmarked" element={<BookMarked />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
