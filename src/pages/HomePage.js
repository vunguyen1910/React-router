import React, { useState, useEffect } from "react";
import { Container, Col, Form, Row, Button, InputGroup } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory
} from "react-router-dom";
export default function HomePage(e) {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [currentUser, setCurrenUser] = useState({});
  let history = useHistory();
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setCurrenUser({email, password})
    setValidated(true);
    history.push('/CompanyPage');
  };
  console.log(currentUser)
  return (
    <Container>
      <Row >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Row>
    </Container>
  );
}
