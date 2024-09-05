import Trending from "./Trending.js";
import { useEffect, useState } from "react";
function Main() {
  const [data, setData] = useState(() => {
    const dt = localStorage.getItem("data");
    return dt ? JSON.parse(dt) : [];
  });

  return (
    <>
      <main>
        <Trending data={data} />
      </main>
    </>
  );
}

export default Main;
