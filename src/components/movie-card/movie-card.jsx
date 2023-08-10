import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
      <Link to={`/movies/${movie.Id.$oid}`}>
        <Card.Title>{movie.Title}</Card.Title>
        </Link>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>{movie.Id.$oid}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Id: PropTypes.shape({
      $oid: PropTypes.string.isRequired
    }).isRequired,
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};
