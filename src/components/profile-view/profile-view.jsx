import React from "react";
import { DeleteAccount } from "./delete-account";
import { UpdateInfo } from "./update-info";
import { MovieCard } from "../movie-card/movie-card";
import "../../index.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ProfileView = ({ user, movies, setUser }) => {
  return (
    <>

      <h1>{user.Username}'s Profile</h1>

      <h2>Favorites:</h2>

      <Col>
      <Row md={3}>
          {user.FavoriteMovies.map((favoriteMovieId) => {
            const matches = movies.find((movie) => movie.Id.$oid === favoriteMovieId);

            if (matches) 
            {
              return (
                <Row key={favoriteMovieId}>
                  <MovieCard movie={matches} />
                </Row>
              );
            }
            
            return null;
          })}
          </Row>
</Col>
      <Row>
      <h3>Account Details:</h3>
      <Col>
      <p>Username: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <p>Birthdate: {user.Birthdate}</p>
      <h4>Update Account Information:</h4>
      <UpdateInfo user={user} setUser={setUser} />
      <DeleteAccount user={user} />
      </Col>

    </Row>
    </>
  );
};
export default ProfileView;