import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../profile-view/manage-favorites";
import "./movie-view.scss";

export const MovieView = ({ movies, user }) => {

  const { movieId } = useParams();
  const token = localStorage.getItem("token");

  const movie = movies.find((movie) => movie.Id.$oid === movieId);

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
        <span>ID: </span>
        <span>{movieId}</span>
      </div>
      <div>
        <img className="w-100" src={movie.Image} />
      </div>
      <div>
    </div>
    <button variant="link" className="button" onClick={() => addFavorite(user, movieId, token)}>Add to Favorites</button>
<button variant="link" className="button" onClick={() => removeFavorite(user, movieId, token)}>Remove Favorite</button>
      <Link to={`/`}>
        <button className="button">Back</button>
      </Link>
    </div>
  );
};
