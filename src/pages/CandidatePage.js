import React, { useState, useEffect } from "react";
import { Container, Col, Form, Row, Button, InputGroup } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { config } from "rxjs";
export default function CandidatePage() {
  const [candidate, setCandidate] = useState({});
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getCandidate = async () => {
      const response = await fetch("http://localhost:3001/candidates/" + id);
      const data = await response.json();
      setCandidate(data);
    };
    getCandidate();
  }, []);
  const handleSubmit =async event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const config = {
        method: 'PUT',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(candidate)
    }
    setValidated(true);
    const response = await fetch('http://localhost:3001/candidates/' + id, config);
  };
  return (
    <div>
      <Container>
        <h1>Candidate Page</h1>
        <Row>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                  value={candidate.first_name}
                    required
                    type="text"
                    placeholder="First name"
                    defaultValue="Mark"
                    onChange={(e)=> setCandidate({...candidate,first_name: e.target.value})}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                  value={candidate.last_name}
                    required
                    type="text"
                    placeholder="Last name"
                    defaultValue="Otto"
                    onChange={(e)=> setCandidate({...candidate,last_name: e.target.value})}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomEmail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      value={candidate.email}
                      type="text"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e)=> setCandidate({...candidate,email: e.target.value})}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a Email.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Company</Form.Label>
                  <Form.Control type="text" placeholder="Company" required value={candidate.company} onChange={(e)=> setCandidate({...candidate,company: e.target.value})}/>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Company.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>Job</Form.Label>
                  <Form.Control type="text" placeholder="Job" required value={candidate.job_title}onChange={(e)=> setCandidate({...candidate,job_title: e.target.value})}/>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Job.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
