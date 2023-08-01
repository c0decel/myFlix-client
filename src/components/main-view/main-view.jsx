import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col } from "react-bootstrap";
import "../../index.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://movie-apis-84b92f93a404.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            Title: movie.Title,
            Description: movie.Description,
            Director: movie.Director.Name,
            Bio: movie.Director.Bio,
            Genre: movie.Genre.Name,
            Image: movie.Image
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  const updateLocalStorage = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    updateLocalStorage(user, token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user"); // removes user from local storage
    localStorage.removeItem("token"); // removes token from local storage
  };

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                handleLogin(user, token);
              }}
            />
            or
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "5px solid black" }}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                key={movie.Title}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <button
            className="button"
            onClick={() => {
              handleLogout(); // Call the logout function
            }}
          >
            Logout
          </button>
        </>
      )}
    </Row>
  );
};
