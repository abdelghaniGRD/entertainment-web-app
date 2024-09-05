import { useEffect, useState } from "react";
import Search from "./Search";

function TvSeries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtredData, setFiltredData] = useState();

  const [data, setData] = useState(() => {
    const dt = localStorage.getItem("data");
    return dt ? JSON.parse(dt) : [];
  });

  const allMovies = data.filter((card) => {
    return card.category === "TV Series";
  });

  useEffect(() => {
    const filter = allMovies.filter((card) => {
      const MatchesSearch = card.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return MatchesSearch;
    });

    setFiltredData(filter);
  }, [data, searchQuery]);

  const updateIsBookmarked = async (id, currentBookMark) => {
    try {
      await fetch(`http://localhost:4000/cards/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBookmarked: !currentBookMark }),
      });

      console.log(`Card with id ${id} updated successfully`);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // Show a loading state or fallback UI
  }

  return (
    <>
      <Search title={"Search For Tv Series"} setSearchQuery={setSearchQuery} />
      {searchQuery === "" ? (
        <>
          <p className="tv-series">Tv Series</p>
          <div className="main-recommended">
            <section className="main-recommended-cards">
              {allMovies.map((card) => {
                return (
                  <div className="recommended-card" key={card.id}>
                    <div
                      className="card-save"
                      onClick={() =>
                        updateIsBookmarked(card.id, card.isBookmarked)
                      }
                    >
                      <img
                        src={
                          card.isBookmarked
                            ? "./assets/icon-bookmark-full.svg"
                            : "./assets/icon-bookmark-empty.svg"
                        }
                        alt="save"
                      ></img>
                    </div>
                    <img
                      className="main-img"
                      alt={card.title}
                      src={card.thumbnail.regular.small}
                    ></img>

                    <div className="film-info">
                      <p>{card.year}</p>
                      <span></span>
                      <img
                        src={
                          card.category === "Movie"
                            ? "./assets/icon-category-movie.svg"
                            : "./assets/icon-category-tv.svg"
                        }
                        alt=""
                      ></img>
                      <p>{card.category}</p>
                      <span></span>
                      <p>{card.rating}</p>
                    </div>
                    <h2 className="title">{card.title}</h2>
                  </div>
                );
              })}
            </section>
          </div>
        </>
      ) : (
        <>
          <p className="tv-series">
            Found {filtredData.length} results for {searchQuery}
          </p>
          <div className="main-recommended">
            <section className="main-recommended-cards">
              {filtredData.map((card) => {
                return (
                  <div className="recommended-card" key={card.id}>
                    <div
                      className="card-save"
                      onClick={() =>
                        updateIsBookmarked(card.id, card.isBookmarked)
                      }
                    >
                      <img
                        src={
                          card.isBookmarked
                            ? "./assets/icon-bookmark-full.svg"
                            : "./assets/icon-bookmark-empty.svg"
                        }
                        alt="save"
                      ></img>
                    </div>
                    <div className="main-img">
                      <img
                        alt={card.title}
                        src={card.thumbnail.regular.small}
                      />
                    </div>

                    <div className="film-info">
                      <p>{card.year}</p>
                      <span></span>
                      <img
                        src={
                          card.category === "Movie"
                            ? "./assets/icon-category-movie.svg"
                            : "./assets/icon-category-tv.svg"
                        }
                        alt=""
                      ></img>
                      <p>{card.category}</p>
                      <span></span>
                      <p>{card.rating}</p>
                    </div>
                    <h2 className="title">{card.title}</h2>
                  </div>
                );
              })}
            </section>
          </div>
        </>
      )}
    </>
  );
}
export default TvSeries;
