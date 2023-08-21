import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const maxDescriptionLength = 50;

  const shortDescription =
    movie.Description.length > maxDescriptionLength
      ? movie.Description.slice(0, maxDescriptionLength) + "..."
      : movie.Description;

  return (
    <Card className="card" style={{backgroundColor: "#E2C0FF"}}>
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body className="cardbg">
      <Link className="link" to={`/movies/${movie.Id.$oid}`}>
        <Card.Title className="title">{movie.Title}</Card.Title>
        </Link>
        <Card.Text>{shortDescription}</Card.Text>
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
