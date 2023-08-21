import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../index.scss";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row } from "react-bootstrap";

export const MovieView = ({ movies, user, setUser }) => {

  const { movieId } = useParams();
  const token = localStorage.getItem("token");
  const [ Fav, setFav ] = useState(false);

  useEffect(() => {
    const inFavs = user.FavoriteMovies.includes(movieId)
    setFav(inFavs)
  }, []);

  
  const removeFav = () => {
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

 const addFav = () => {
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
  
  const movie = movies.find((movie) => movie.Id.$oid === movieId);

  const similarMovies = movies.filter(
    (m) => m.Genre.Name === movie.Genre.Name && m.Id.$oid !== movieId
  );

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
                <Button style={{backgroundColor: "#C886FF", fontFamily: "Caprasimo, cursive"}} onClick={removeFav}>Remove from favorites</Button>
            ) : (
                <Button style={{backgroundColor: "#C886FF", fontFamily: "Caprasimo, cursive"}} onClick={addFav}>Add to favorites</Button>
            )}
    <div>
      {similarMovies.length > 0 ? (

      similarMovies.map((similarMovies) => (
        <Col>
        <h2>Similar movies:</h2>
        <Row className="mb-4" md={3}>
        <MovieCard key={similarMovies.Id.$oid} movie={similarMovies} />
        </Row>
        </Col>
      ))

      ) : (
        <p></p>
      )}

    </div>

      <Link to={`/`}>
        <Button style={{backgroundColor: "#C886FF", fontFamily: "Caprasimo, cursive"}}>Back</Button>
      </Link>
    </div>
  );
};
