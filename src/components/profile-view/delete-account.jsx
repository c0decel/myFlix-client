import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const DeleteAccount = ({ user }) => {
  const [confirmation, setConfirmation] = useState("");
  const storedToken = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("user"); // removes user from local storage
    localStorage.removeItem("token"); // removes token from local storage
    window.location.href = "/login"; // redirects to login
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (confirmation === `${user.Username}`) {
      fetch(
        `https://movie-apis-84b92f93a404.herokuapp.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`
          }
        }
      ).then((response) => {
        if (response.ok) {
          alert("account deleted. BYE");
          handleLogout();
          window.location.href = "/signup"; //redirects to sign up page
        } else {
          alert("deletion failed. you're here forever.");
        }
      });
    } else {
      alert("type your username to delete");
    }
  };

  return (
    <Form onSubmit={handleDelete}>
      <Form.Group controlId="formConfirmation">
        <Form.Label>type your username to delete:</Form.Label>
        <Form.Control
          type="text"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          required
        />
      </Form.Group>

      <Button type="submit" className="button">
        delete account
      </Button>
    </Form>
  );
};
