import React, { Component } from 'react';
import axios from 'axios';
import { Alert, Button, Image, Modal, Spinner } from 'react-bootstrap';
import PersonCard from './PersonCard';

// API that returns 10 random users
const API_URL = 'https://randomuser.me/api/?results=10';

class PersonList extends Component {
  //Define state default values
  state = {
    persons: [],
    loading: false,
    error: null,
    loadedWith: '',
    selectedPerson: null
  };

  //Component Lifecycle Callback
  componentDidMount() {
    this.loadWithAxios();
  }

  // Load the users using axios
  loadWithAxios = () => {
    this.setState({ loading: true, error: null });

    axios.get(API_URL)
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons, loading: false, loadedWith: 'Axios' });
      })
      .catch(err => {
        this.setState({ loading: false, error: 'Axios request failed: ' + err.message });
      });
  };

  // Load the same users using the built-in fetch API
  loadWithFetch = () => {
    this.setState({ loading: true, error: null });

    fetch(API_URL)
      .then(res => {
        // fetch does not reject on HTTP errors, so check the status here
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        const persons = data.results;
        this.setState({ persons, loading: false, loadedWith: 'Fetch' });
      })
      .catch(err => {
        this.setState({ loading: false, error: 'Fetch request failed: ' + err.message });
      });
  };

  // Open and close the details popup
  showDetails = (person) => {
    this.setState({ selectedPerson: person });
  };

  closeDetails = () => {
    this.setState({ selectedPerson: null });
  };

  render() {
    const { persons, loading, error, loadedWith, selectedPerson } = this.state;

    return (
      <div>
        {/* Green header bar */}
        <h1 className="header-bar bg-success text-center py-3 mb-0">User List</h1>

        {/* Buttons to reload the list with axios or fetch */}
        <div className="text-center my-3">
          <Button variant="dark" size="sm" className="me-2" onClick={this.loadWithAxios} disabled={loading}>
            Load with Axios
          </Button>
          <Button variant="secondary" size="sm" onClick={this.loadWithFetch} disabled={loading}>
            Load with Fetch
          </Button>
          {!loading && loadedWith && (
            <p className="mt-2 mb-0">
              Loaded {persons.length} users using <strong>{loadedWith}</strong>
            </p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <Alert variant="danger" className="mx-3">
            {error}
          </Alert>
        )}

        {/* Spinner while loading, otherwise the list of cards */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          persons.map(person => (
            <PersonCard
              key={person.login.uuid}
              person={person}
              onShowDetails={this.showDetails}
            />
          ))
        )}

        {/* Details popup for the selected person */}
        <Modal show={selectedPerson !== null} onHide={this.closeDetails} centered>
          {selectedPerson && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  {selectedPerson.name.title} {selectedPerson.name.first} {selectedPerson.name.last}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <Image src={selectedPerson.picture.large} roundedCircle className="mb-3" alt="person" />
                <p><strong>Email:</strong> {selectedPerson.email}</p>
                <p><strong>Phone:</strong> {selectedPerson.phone}</p>
                <p><strong>Cell:</strong> {selectedPerson.cell}</p>
                <p><strong>Nationality:</strong> {selectedPerson.nat}</p>
                <p className="mb-0">
                  <strong>Address:</strong> {selectedPerson.location.street.number}{' '}
                  {selectedPerson.location.street.name}, {selectedPerson.location.city},{' '}
                  {selectedPerson.location.state}, {selectedPerson.location.country} -{' '}
                  {selectedPerson.location.postcode}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeDetails}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    );
  }
}

export default PersonList;
