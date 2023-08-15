import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../index.scss";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies, user, setUser }) => {

  const { movieId } = useParams();
  const token = localStorage.getItem("token");
  const [ Fav, setFav ] = useState(false);

  useEffect(() => {
    const inFavs = user.FavoriteMovies.includes(movieId)
    setFav(inFavs)
  }, []);

  addFavorite = () => {
    fetch(`https://movie-apis-84b92f93a404.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
      if (response.ok) {
        console.log("added", movieId, "to favorites");
        return response.json(); // successfully added
      }
      }).then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
  };

  removeFavorite = () => {
    fetch(`https://movie-apis-84b92f93a404.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
      if (response.ok) {
        console.log("removed", movieId, "from favorites");
        return response.json(); // successfully deleted
      }
      }).then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
  };
  
  const movie = movies.find((movie) => movie.Id.$oid === movieId);

  return (
    <div className="movie-view">

      <div>
        <span className="movie-view-title">{movie.Title}</span>
      </div>

      <div className="desc">
          <div>
            <span>Directed by {movie.Director.Name}</span>
          </div>

          <div>
            <span>{movie.Genre.Name}</span>
          </div>

          <div>
            <span>{movie.Description}</span>

        </div>

    </div>
    <div>
          <img className="w-100" src={movie.Image} />
        </div>

    {Fav ? (
                <Button style={{backgroundColor: "#C886FF", fontFamily: "Caprasimo, cursive"}} onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button style={{backgroundColor: "#C886FF", fontFamily: "Caprasimo, cursive"}} onClick={addFavorite}>Add to favorites</Button>
            )}
    
      <Link to={`/`}>
        <Button style={{backgroundColor: "#C886FF", fontFamily: "Caprasimo, cursive"}}>Back</Button>
      </Link>
    </div>
  );
};
