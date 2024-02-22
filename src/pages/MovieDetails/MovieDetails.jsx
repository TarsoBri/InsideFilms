import styles from "./MovieDetails.module.css";

//router
import { useParams } from "react-router-dom";

//hooks
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useFavorites } from "../../hooks/useFavorites";

//components
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/Loader/Loader";
import { CardFavs } from "../../components/CardFavs/CardFavs";

//icons
import { FaMoneyBillTrendUp, FaMoneyBillWave } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";

const MovieDetails = () => {
  const { id } = useParams();
  const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=pt-br`;
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=pt-br&page=`;

  const { data: movieDetails, loading, error } = useFetch(urlDetails);

  const { addFavorites, ids, type, active } = useFavorites();

  const [viewActive, setViewActive] = useState(false);
  const [textOverview, setTextOverview] = useState("");
  const [textBtn, setTextBtn] = useState("");

  const viewMore = () => {
    if (movieDetails.overview) {
      if (!viewActive && movieDetails.overview.length > 150) {
        setTextOverview(movieDetails.overview.slice(0, 150) + "...");
        setTextBtn("Ver mais");
        setViewActive(true);
      } else {
        setTextOverview(
          movieDetails.overview.slice(0, movieDetails.overview.length)
        );
        setTextBtn("Esconder");
        setViewActive(false);
      }
    }
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    viewMore();
  }, [movieDetails.overview, urlDetails]);
  return (
    <div className={styles.main}>
      {!error ? (
        <>
          {loading && <Loader />}
          {movieDetails && (
            <>
              {active && <CardFavs type={type} />}
              <div
                className={styles.backdropImage}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path})`,
                }}
              >
                <div className={styles.details}>
                  <div className={styles.main_info}>
                    <div className={styles.main_info_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt=""
                      />
                      <span className={styles.runtime}>
                        {movieDetails.runtime} min
                      </span>
                    </div>
                    <div className={styles.main_info_rigth}>
                      <h3>{movieDetails.title}</h3>

                      <div className={styles.overview}>
                        <p>
                          <span>"</span>
                          {textOverview}
                          <span>"</span>
                        </p>
                        {movieDetails.overview &&
                          movieDetails.overview.length > 150 && (
                            <button onClick={viewMore}>{textBtn}</button>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.others_details}>
                    <div className={styles.genres_and_favorite}>
                      <ul>
                        {movieDetails.genres &&
                          movieDetails.genres.map((genre) => (
                            <li key={genre.id}>{genre.name}</li>
                          ))}
                      </ul>
                      <button
                        style={{
                          color: ids.includes(movieDetails.id)
                            ? "red"
                            : "white",
                        }}
                        onClick={() => addFavorites(movieDetails)}
                      >
                        <IoMdHeart />
                      </button>
                    </div>
                    <div className={styles.values}>
                      <p>
                        <span>
                          <FaMoneyBillWave />
                        </span>
                        Orçamento:{" "}
                        {movieDetails.budget > 0
                          ? movieDetails.budget + "$"
                          : "Não divulgado!"}
                      </p>

                      <p>
                        <span>
                          <FaMoneyBillTrendUp />
                        </span>
                        Receita:{" "}
                        {movieDetails.revenue > 0
                          ? movieDetails.revenue + "$"
                          : "Não divulgado!"}
                      </p>
                    </div>
                    <p>Produtoras</p>
                    <div className={styles.companies}>
                      {movieDetails.production_companies &&
                        movieDetails.production_companies.map((company) => (
                          <div
                            className={styles.companies_info}
                            key={company.id}
                          >
                            {company.logo_path ? (
                              <img
                                src={
                                  company.logo_path
                                    ? `https://image.tmdb.org/t/p/w500${company.logo_path}`
                                    : ""
                                }
                              />
                            ) : (
                              <p>{company.name}</p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <h2 className={styles.title_recomendations}>Recomendações</h2>
              <div className={styles.movies}>
                <MoviesList url={url} />
              </div>
            </>
          )}
        </>
      ) : (
        <p>Houve algum com erro com a API. Tente novamente mais tarde!</p>
      )}
    </div>
  );
};

export default MovieDetails;
