import { useState } from "react";
import "../../index.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateInfo = ({ user }) => {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const storedToken = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email
    };

    fetch(
      `https://movie-apis-84b92f93a404.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      }
    ).then((response) => {
      if (response.ok) {
        alert("information updated");
        window.location.href = "/"; //need to update to refresh
      } else {
        alert("update failed, sign up with the right info next time");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>new username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>new password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formUsername">
        <Form.Label>new email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => updateEmail(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" className="button">
        update information
      </Button>
    </Form>
  );
};
