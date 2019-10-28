import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Container,
  ListGroupItem,
  CardGroup
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const getCandidates = async () => {
    const response = await fetch("http://localhost:3001/candidates");
    const data = await response.json();
    setCandidates(data);
  };
  useEffect(() => {
    getCandidates();
  }, []);
  const onDeleteCandidate = (e, id) => {
    e.preventDefault();
    const config = {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    };
    fetch(`http://localhost:3001/candidates/${id}`, config);
    const newCandidates = candidates.filter(candidate => candidate.id !== id);
    setCandidates(newCandidates);
  };
  console.log("sad", candidates);
  const renderCard = () => {
    return candidates.map(candidate => {
      return (
        <Col col="3" key={candidate.id}>
          <Card style={{width:"300px"}}>
            <Card.Img variant="top" src={candidate.photo_url} />
            <Card.Body>
              <Card.Title>
                {candidate.first_name + " " + candidate.last_name}
              </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{candidate.email}</ListGroupItem>
              <ListGroupItem>{candidate.company}</ListGroupItem>
              <ListGroupItem>{candidate.job_title}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Link className="card-link" to={`/candidates/${candidate.id}`}>Edit</Link>
              <Link className="card-link"
                onClick={e => onDeleteCandidate(e, candidate.id)}
                to={`/candidates/${candidate.id}`}
              >
                Delete
              </Link>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  return <CardGroup>{renderCard()}</CardGroup>;
}
