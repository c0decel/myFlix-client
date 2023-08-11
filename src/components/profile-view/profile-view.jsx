import React from "react";
import { DeleteAccount } from "./delete-account";
import { UpdateInfo } from "./update-info";
import { MovieCard } from "../movie-card/movie-card";

const ProfileView = ({ user, movies, setUser }) => {

  const handleUpdateUser = (newUsername) => {
    setUser({ ...user, Username: newUsername }); // Update the username in user state
  };
  
  return (

    <div>
      <div>
      <h1>{user.Username}'s Profile</h1>
      </div>

      <div className="favorite-movies">

        <h2>Favorites:</h2>
          {user.FavoriteMovies.map((favoriteMovieId) => {
            const matches = movies.find((movie) => movie.Id.$oid === favoriteMovieId);

            if (matches) 
            {
              console.log("favoriteMovieId:", favoriteMovieId); //don't fk this up thanks
              console.log("matches:", matches); //don't move this it'll make ur life much harder

              return (
                <div key={favoriteMovieId}>
                  <MovieCard movie={matches} />
                </div>
              );
            }
            
            return null;
          })}
        </div>
      <h3>Account Details:</h3>
      <p>Username: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <p>Birthdate: {user.Birthdate}</p>
      <h4>Update Account Information:</h4>
      <UpdateInfo user={user} updateUser={handleUpdateUser} setUser={setUser} />
      <DeleteAccount user={user} />
    </div>
  );
};
export default ProfileView;