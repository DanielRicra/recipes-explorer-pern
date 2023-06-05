# README

Welcome to the Recipe Search and Management Web Application project!

## Description

This project aims to develop a user-friendly web application that leverages a recipe database to provide a comprehensive recipe search and management system. Users will be able to search for recipes, save new recipe.

The project utilizes the PERN stack, which stands for PostgreSQL, Express, React, and Node.js. Additional technologies such as Redux, React Router DOM, and Axios will also be used to enhance the functionality and user experience of the application.

## Project Structure

The project follows a typical directory structure for a PERN stack application. Here's an overview:

```bash
client
└── src
    ├── components
    ├── redux
    ├── services
    ├── App.jsx
    └── main.jsx

server
└── src
   ├── controllers
   ├── models
   ├── routes
   ├── services
   └── index.js
```

- **client**: This directory contains the client-side code of the application, built with React.js.
    - **src/components**: Contains reusable UI components.
    - **src/redux**: Holds Redux-related files such as actions, reducers, and store configuration.
    - **src/services**: Contains service files for making API requests and handling data.
    - **App.jsx**: The main component that sets up the application's routes and layout.
    - **main.jsx**: The entry point file for the client-side application.

- **server**: This directory contains the server-side code of the application, built with Express.js and Node.js.
    - **controllers**: Contains controller files that handle the logic for different API endpoints.
    - **models**: Holds the data models for interacting with the PostgreSQL database.
    - **routes**: Defines the API routes and their corresponding controller functions.
    - **services**: Contains additional service files or helper functions used within the server.
    - **index.js**: The entry point file for the server-side application.

## Technologies Used

The project utilizes the following technologies:

- PostgreSQL: A powerful open-source relational database management system.
- Express.js: A web application framework for building Node.js applications.
- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime environment.
- Redux: A state management library for JavaScript applications.
- React Router DOM: A library for routing in React applications.
- Axios: A promise-based HTTP client for making API requests.

## Getting Started

To start using the Recipe Management Web Application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project's root directory.
3. Set up the PostgreSQL database and configure the connection details in the server's `.env` file.
4. Install the dependencies for both the client and server by running `npm install` in the `client` and `server` directories.
5. Start the client-side development server by running `npm start` in the `client` directory.
6. Start the server-side development server by running `npm start` in the `server` directory.
7. Open your browser and visit `http://localhost:3000` to access the Recipe Management Web Application.

## Feedback

If you have any feedback, suggestions, or questions, please feel free to open an issue in the repository or contact us by email at [danielquispe.142@gmail.com](mailto:danielquispe.142@gmail.com).

Enjoy managing your recipes with the Recipe Search and Management Web Application!

Daniel R. Ricra quispe