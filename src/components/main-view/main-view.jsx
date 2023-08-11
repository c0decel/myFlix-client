import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../../index.scss";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(
    !storedUser || storedUser === "undefined" ? null : JSON.parse(storedUser)
  );
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

 // const UpdateInfo = (user) => {
    //setUser(user);
   // localStorage.setItem('user', JSON.stringify(user));
 // };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movie-apis-84b92f93a404.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            Id: {$oid: movie._id}, //be careful changing you'll break ya whole shit
            Title: movie.Title,
            Description: movie.Description,
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio
            },
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
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
    console.log("new sesh, welcome", user);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user"); // removes user from local storage
    localStorage.removeItem("token"); // removes token from local storage
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user"); // removes user from local storage
          localStorage.removeItem("token");
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        handleLogin(user, token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>list is empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} />
                  </Col>
                )}
              </>
            }
          />

<Route
            path="/users/:username/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>list is empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} setUser={setUser} />
                  </Col>
                )}
              </>
            }
          />
          

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView user={user} movies={movies} setUser={setUser} />
                  </Col>
                )}
              </>
            }
          />


          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>nothing here</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.Id.$oid} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                    <button
                      className="button"
                      onClick={() => {
                        handleLogout(); // call logout
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};