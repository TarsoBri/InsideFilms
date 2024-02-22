import styles from "./Home.module.css";

// componets
import MoviesList from "../../components/MoviesList/MoviesList";

const Home = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=pt-br&page=`;

  const url2 = `https://api.themoviedb.org/3/movie/top_rated?language=pt-br&page=`;

  const url3 = `https://api.themoviedb.org/3/movie/upcoming?language=pt-br&page=`;

  return (
    <div className={styles.home}>
      <h2>Mais aclamados do momento</h2>
      <MoviesList url={url} />

      <h2>Melhores avaliações</h2>
      <MoviesList url={url2} />

      <h2>Novidades</h2>
      <MoviesList url={url3} />
    </div>
  );
};

export default Home;
