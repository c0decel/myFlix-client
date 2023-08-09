import React from "react";
import { DeleteAccount } from "./delete-account";
import { UpdateInfo } from "./update-info";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

const ProfileView = ({ user }) => {
  console.log("Favorite Movies:", user.FavoriteMovies);

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <p>Birthdate: {user.Birthdate}</p>
      <p>Favorites:</p>
      <div className="favorite-movies">
        {user.FavoriteMovies.map((movie) => {
          return <MovieCard key={movie.Id} movie={movie} />;
        })}
      </div>
      <UpdateInfo user={user} />
      <DeleteAccount user={user} />
    </div>
  );
};

export default ProfileView;
