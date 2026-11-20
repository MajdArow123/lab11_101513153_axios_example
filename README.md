# COMP3123 – Lab Exercise 9 – Working with Axios and Fetch API

- **Course:** COMP 3123 – Full Stack Development I (George Brown College)
- **Lab:** Lab Exercise 9 – Lab11 – Working with Axios and Fetch API
- **Student:** Mjd Arow
- **Student ID:** 101513153

## What the app does

- Loads 10 random users from the API and shows them under a green **User List** header.
- Each user is shown in a teal card: the header has the full name and the user's UUID, the left side has the photo and a **Details** button, and the right side lists User Name, Gender, Time Zone Description, Address, Email, Birth Date and Age, Register Date, Phone# and Cell#.
- The **Details** button opens a popup with the photo, full name, email, phone, cell, nationality and full address.
- A spinner is shown while the data loads, and a red alert is shown if the request fails.

## API used

`https://randomuser.me/api/?results=10`

## Axios and Fetch

- The `PersonList` class component loads the users with **axios** in `componentDidMount()`.
- The **Load with Axios** and **Load with Fetch** buttons reload the list with axios or with the built-in **fetch** API. The line under the buttons shows which one loaded the current list.
- The API response is logged to the browser console.

## How to run

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.
