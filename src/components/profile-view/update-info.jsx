import { useState } from "react";
import "../../index.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateInfo = ({ user, updateUser, setUser }) => {
  const [username, updateUsername] = useState("");
  const storedToken = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username
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
        console.log("Information updated, new username is", username);
        updateUser(username);
        setUser({ ...user, Username: username });
      } else {
        alert("update failed, sign up with the right info next time");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>New Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
          required
        />
              </Form.Group>
           <Button type="submit" className="button">
        Update Username
      </Button>
    </Form>
  );
  
};

