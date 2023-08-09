import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, addToFavorites }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie.Id === movieId);

  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <img className="w-100" src={movie.Image} />
      </div>
      <div>
      <button className="button" onClick={() => addToFavorites(movie.Id)} variant="primary">
        Add to Favorites
      </button>
    </div>
      <Link to={`/`}>
        <button className="button">Back</button>
      </Link>
    </div>
  );
};
