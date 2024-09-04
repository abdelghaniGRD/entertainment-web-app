import Trending from "./Trending.js";
import { useEffect, useState } from "react";
function Main() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/cards")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      });
  }, []);

  return (
    <>
      {!loading ? (
        <main>
          <Trending data={data} setData={setData} />
        </main>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}

export default Main;
