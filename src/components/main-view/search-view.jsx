import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row } from "react-bootstrap";

export const Search = ({ movies }) => {
  const [search, setSearch] = useState("");
  
 const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        onKeyDown={handleSearch}
        placeholder="Search for a movie"
      />
    {filteredMovies.length > 0 ? (
      filteredMovies.map((movie) => (
        <Row key={movie.Id.$oid}>
        <MovieCard movie={movie} />
        </Row>
      ))
    ) : (
        <p>No matches.</p>
    )}

    </div>
  );
};
