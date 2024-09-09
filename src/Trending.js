import { useEffect, useState } from "react";
import Search from "./Search";

function Trending({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtredData, setFiltredData] = useState();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(windowWidth);
    console.log(windowWidth);

    const filter = data.filter((card) => {
      const MatchesSearch = card.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return MatchesSearch;
    });
    setFiltredData(filter);
  }, [data, searchQuery, setSearchQuery]);

  const trendingCards = data.filter((card) => {
    return card.isTrending;
  });

  const recommendedCards = data.filter((card) => {
    return !card.isTrending;
  });

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

  return (
    <>
      <Search
        title={"Search For Movies Tv Series"}
        setSearchQuery={setSearchQuery}
      />

      {searchQuery === "" ? (
        <>
          <p className="trending">Trending</p>
          <div className="main-trending">
            <section className="main-trending-cards">
              {trendingCards.map((card) => {
                return (
                  <div
                    key={card.id}
                    className="card"
                    style={{
                      backgroundImage:
                        windowWidth <= 400
                          ? `url(${card.thumbnail.trending.small})`
                          : `url(${card.thumbnail.trending.large})`,
                      backgroundSize: "cover",
                    }}
                  >
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
                    {windowWidth > 768 ? (
                      <span className="play ">
                        <img src="./assets/icon-play.svg" alt="play"></img>
                        <span>play</span>
                      </span>
                    ) : (
                      ""
                    )}

                    <div className="film">
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
                  </div>
                );
              })}
            </section>
          </div>

          <p className="recomended">Recommended For you</p>

          <div className="main-recommended">
            <section className="main-recommended-cards">
              {recommendedCards.map((card) => {
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
      ) : (
        <>
          <p className="trending">
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
export default Trending;
