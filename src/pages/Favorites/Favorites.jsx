import styles from "./Favorites.module.css";

// hooks
import { useFavoritesValue } from "../../contexts/FavoritesContext";
import { useEffect, useState } from "react";

// components
import FavsMoviesList from "../../components/FavsMoviesList/FavsMoviesList";

const Favorites = () => {
  const { favsStorage } = useFavoritesValue();
  const [favsMovies, setFavsMovies] = useState([]);
  useEffect(() => {
    const moviesParseJSON = favsStorage.map((fav) => JSON.parse(fav));
    setFavsMovies(moviesParseJSON);
  }, [favsStorage]);

  return (
    <div>
      <h2>Seus filmes favoritos</h2>
      {favsMovies && <FavsMoviesList movies_list={favsMovies} />}
    </div>
  );
};

export default Favorites;
