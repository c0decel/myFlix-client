//add or remove favorite movies

export const addFavorite = async (username, movieId, token, onApiDataChange) => {
    try {
      const response = await fetch(`https://movie-apis-84b92f93a404.herokuapp.com/users/${username}/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        console.log("added", {movieId}, "to favorites");
        return true; // successfully added
      } else {
        alert("failed to add to favorites");
      }
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  };
  
  export const removeFavorite = async (username, movieId, token) => {
    try {
      const response = await fetch(`https://movie-apis-84b92f93a404.herokuapp.com/users/${username}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        alert("removed from favorites");
        return true; // successfully removed
      } else {
        alert("failed to remove from favorites");
      }
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  };
  