import { useParams } from "react-router-dom";

//components
import MoviesList from "../../components/MoviesList/MoviesList";

//hooks
import { useFetch } from "../../hooks/useFetch";

const Search = () => {
  const { id } = useParams();

  const url = `https://api.themoviedb.org/3/search/movie?query=${id}&include_adult=false&language=pt-br&page=`;

  return (
    <div>
      <h2>Resultados a partir de: {id}</h2>

      <MoviesList url={url} />
    </div>
  );
};

export default Search;
