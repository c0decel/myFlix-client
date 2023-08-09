import React from "react";
import { DeleteAccount } from "./delete-account";
import { UpdateInfo } from "./update-info";
import { FavoriteMovies } from "./favorites";

const ProfileView = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <p>Birthdate: {user.Birthdate}</p>
      <p>Favorites: {user.FavoriteMovies}</p>
      <UpdateInfo user={user} />
      <DeleteAccount user={user} />
    </div>
  );
};

export default ProfileView;
