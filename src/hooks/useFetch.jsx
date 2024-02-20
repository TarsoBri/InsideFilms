import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [notResults, setNotResults] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setloading(true);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzZlMTU3MjJkZGJmNTI3NWQzOGYwY2I1YjQ0OWQxZiIsInN1YiI6IjY1YjE4ZWYzNmVlY2VlMDE0NzMzYmE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u0G9eqBcSDBVgkA7wYlM4DMCIfzoYacP1IeLNv79cLw",
        },
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => setError(error));

      if (data.results == 0) {
        setNotResults(true);
      }
      setloading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error, notResults };
};
