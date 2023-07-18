import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Crimson Peak",
      director: "guillermo del toro",
      genre: "romance",
      description: "After marrying Thomas Sharpe (Tom Hiddleston), Edith Cushing (Mia Wasikowska) moves to his family''s decaying mansion, where she encounters supernatural entities and dark secrets",
      image:
        "https://upload.wikimedia.org/wikipedia/en/a/ad/Crimson_Peak_theatrical_poster.jpg"
    },
    {
      id: 2,
      title: "Silence of the Lambs",
      director: "Jonathan Demme",
      genre: "thriller",
      description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/1d661187b253755ef32e1f21748ca1e217529bb72f8ef8a87a18fd8e904246a0._RI_TTW_.jpg"
    },
    {
      id: 3,
      title: "The Dark Knight",
      director: "christopher nolan",
      genre: "dramatic",
      description: "a superhero film and the second installment in Christopher Nolan''s Batman trilogy.",
      image:
        "https://m.media-amazon.com/images/I/91KkWf50SoL._AC_UF894,1000_QL80_.jpg"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
