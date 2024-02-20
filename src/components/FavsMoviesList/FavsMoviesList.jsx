// styles
import styles from "./FavsMoviesList.module.css";

// router
import { Link } from "react-router-dom";

// componets
import { CardFavs } from "../CardFavs/CardFavs";

// hooks
import { useEffect, useState, useRef } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import { useWindowSize } from "@uidotdev/usehooks";

// motion
import { motion } from "framer-motion";

// icons
import { IoMdHeart } from "react-icons/io";

const FavsMoviesList = ({ movies_list }) => {
  const { addFavorites, ids, active, type } = useFavorites();

  const moviesCarrousel = useRef();
  const [width, setWidth] = useState(0);
  const size = useWindowSize();

  const noteColor = (note) => {
    if (note >= 8) {
      return { color: "green" };
    } else if (note >= 6) {
      return { color: "yellow" };
    } else if (note < 6) {
      return { color: "red" };
    }
  };

  setTimeout(() => {
    setWidth(moviesCarrousel.current?.scrollWidth - size.width + 50);
  }, [100]);
  useEffect(() => {
    setWidth(moviesCarrousel.current?.scrollWidth - size.width + 50);
  }, [size.width, movies_list]);

  return (
    <div>
      {active && <CardFavs type={type} />}
      {movies_list.length > 0 ? (
        <motion.div
          ref={moviesCarrousel}
          className={styles.list_movies}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            className={styles.movies}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >
            {movies_list &&
              movies_list.map((movie) => (
                <div key={movie.id} className={styles.cardMovie}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <div className={styles.title_favorite}>
                    <h3>{movie.title}</h3>
                    <button
                      style={{
                        color: ids.includes(movie.id) ? "red" : "white",
                      }}
                      className={styles.favorite}
                      onClick={() => addFavorites(movie)}
                    >
                      <IoMdHeart />
                    </button>
                  </div>
                  <div className={styles.title_content}>
                    <p>
                      <span>Lançamento:</span> {movie.release_date}
                    </p>
                    <p>
                      <span
                        className={styles.note}
                        style={noteColor(Number(movie.vote_average.toFixed(2)))}
                      >
                        {movie.vote_average.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <Link
                    to={`/movieDetails/${movie.id}`}
                    className={styles.details_btn}
                  >
                    Detalhes
                  </Link>
                </div>
              ))}
          </motion.div>
        </motion.div>
      ) : (
        <p>Não há nenhum filme favoritado!</p>
      )}
    </div>
  );
};

export default FavsMoviesList;
