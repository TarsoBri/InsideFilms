// styles
import styles from "./MoviesList.module.css";

// router
import { Link } from "react-router-dom";

// components
import { CardFavs } from "../CardFavs/CardFavs";
import Loader from "../Loader/Loader";

// hooks
import { useEffect, useState, useRef } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import { useFetch } from "../../hooks/useFetch";
import { useWindowSize } from "@uidotdev/usehooks";

// motion
import { motion } from "framer-motion";

// icons
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";

const MoviesList = ({ url }) => {
  const [page, setPage] = useState(1);
  const { data: movies, loading, error } = useFetch(url + page);

  const { addFavorites, ids, type, active } = useFavorites();

  const moviesCarrousel = useRef();
  const [width, setWidth] = useState(0);
  const size = useWindowSize();
  const [animation, setAnimation] = useState(0);

  const noteColor = (note) => {
    if (note >= 8) {
      return { color: "green" };
    } else if (note >= 6) {
      return { color: "yellow" };
    } else if (note < 6) {
      return { color: "red" };
    }
  };

  const handleDetails = (e) => {
    window.scrollTo(0, 0);
    setAnimation(animation + 0.0000000001);
    setPage(1);
  };

  const handleNewPage = () => {
    setAnimation(animation + 0.0000000001);
    setPage(page + 1);
  };

  const handleBackPage = () => {
    setPage(page - 1);
  };

  const setWidthValue = () =>
    moviesCarrousel.current?.scrollWidth - size.width + 20;

  useEffect(() => {
    if (moviesCarrousel.current?.scrollWidth > size.width) {
      setWidth(setWidthValue);
    }
  }, [size.width, movies.results, window.resize]);

  return (
    <div>
      {!error ? (
        <>
          {loading && <Loader />}
          {active && <CardFavs type={type} active={active} />}

          <motion.div
            className={styles.list_movies}
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              ref={moviesCarrousel}
              drag="x"
              className={styles.movies}
              dragConstraints={{ right: 0, left: -width }}
              initial={{ x: 200 }}
              animate={{ x: animation }}
              transition={{ duration: 1 }}
            >
              {movies.total_pages && page > 1 && (
                <div className={styles.btn_backpage_div}>
                  <button
                    onClick={handleBackPage}
                    className={styles.btn_backpage}
                  >
                    <BsArrowLeftCircle /> <span>Voltar!</span>
                  </button>
                </div>
              )}

              {movies.results &&
                movies.results.map((movie) => (
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
                          style={noteColor(
                            Number(movie.vote_average.toFixed(2))
                          )}
                        >
                          {movie.vote_average.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <Link
                      onClick={handleDetails}
                      to={`/movieDetails/${movie.id}`}
                      className={styles.details_btn}
                    >
                      Detalhes
                    </Link>
                  </div>
                ))}
              {movies.total_pages > 1 && page != movies.total_pages && (
                <div className={styles.btn_viewMore_div}>
                  <button
                    onClick={handleNewPage}
                    className={styles.btn_viewMore}
                  >
                    <BsArrowRightCircle /> <span>Ver mais!</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
          {movies.results == 0 && <p>Não há resultados...</p>}
        </>
      ) : (
        <p>Houve algum erro com a API. Tente novamente mais tarde!</p>
      )}
    </div>
  );
};

export default MoviesList;
