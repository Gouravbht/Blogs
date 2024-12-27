import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const data = axios.post("http://localhost:5000/api/auth/login", formData);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className="mt-5">
      <Row className="  justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
