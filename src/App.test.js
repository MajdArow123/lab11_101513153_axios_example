import { render, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';

// Mock axios so the test does not call the real API
jest.mock('axios', () => ({
  get: jest.fn()
}));

// One fake user in the same shape as the randomuser.me response
const fakePerson = {
  gender: 'female',
  name: { title: 'Miss', first: 'Eliza', last: 'Moore' },
  location: {
    street: { number: 4638, name: 'North Street' },
    city: 'Truro',
    state: 'South Glamorgan',
    country: 'United Kingdom',
    postcode: 'LP5 6QN',
    timezone: { description: 'Abu Dhabi, Muscat, Baku, Tbilisi' }
  },
  email: 'eliza.moore@example.com',
  login: { uuid: '491a78ec-7494-4c8c-8da1-731102e13a17', username: 'bigladybug274' },
  dob: { date: '1948-09-02T18:41:36.832Z', age: 72 },
  registered: { date: '2004-05-05T09:52:39.914Z' },
  phone: '017684 73458',
  cell: '0708-312-222',
  picture: { large: 'https://randomuser.me/api/portraits/women/1.jpg' },
  nat: 'GB'
};

beforeEach(() => {
  axios.get.mockResolvedValue({ data: { results: [fakePerson] } });
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
});

test('renders the User List header', async () => {
  render(<App />);
  expect(screen.getByText(/User List/i)).toBeInTheDocument();
  // wait for the mocked axios data to show up
  expect(await screen.findByText('bigladybug274')).toBeInTheDocument();
});

test('shows a card for each person loaded with axios', async () => {
  render(<App />);
  expect(await screen.findByText(/Miss Eliza Moore - 491a78ec/)).toBeInTheDocument();
  expect(screen.getByText('FEMALE')).toBeInTheDocument();
  expect(screen.getByText(/Loaded 1 users using/)).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/?results=10');
});
