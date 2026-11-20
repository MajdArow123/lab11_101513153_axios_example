import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';

// One label/value row on the right side of the card
function InfoRow({ label, children }) {
  return (
    <Row className="mb-3">
      <Col xs={4} md={3} className="text-end">{label}</Col>
      <Col>{children}</Col>
    </Row>
  );
}

// Shows one person from the API inside a card
function PersonCard({ person, onShowDetails }) {
  const { name, login, location, dob, registered } = person;

  return (
    <Card bg="info" className="person-card mx-3 my-3">
      <Card.Header className="fw-bold">
        {name.title} {name.first} {name.last} - {login.uuid}
      </Card.Header>
      <Card.Body>
        <Row>
          {/* Left column: photo and Details button */}
          <Col md={2} className="text-center">
            <Image src={person.picture.large} roundedCircle className="mb-3" alt={name.first} />
            <br />
            <Button variant="primary" onClick={() => onShowDetails(person)}>
              Details
            </Button>
          </Col>

          {/* Right column: the person's information */}
          <Col md={10}>
            <InfoRow label="User Name:">
              <span className="fs-5">{login.username}</span>
            </InfoRow>
            <InfoRow label="Gender:">{person.gender.toUpperCase()}</InfoRow>
            <InfoRow label="Time Zone Description:">{location.timezone.description}</InfoRow>
            <InfoRow label="Address:">
              {location.street.number} {location.street.name}, {location.city}, {location.state},{' '}
              {location.country} - {location.postcode}
            </InfoRow>
            <InfoRow label="Email:">{person.email}</InfoRow>
            <InfoRow label="Birth Date and Age:">{dob.date} ({dob.age})</InfoRow>
            <InfoRow label="Register Date:">{registered.date}</InfoRow>
            <InfoRow label="Phone#:">{person.phone}</InfoRow>
            <InfoRow label="Cell#:">{person.cell}</InfoRow>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PersonCard;
