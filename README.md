# Kudos Board

A full-stack application for creating and sharing kudos boards. This project allows users to create, share, and interact with kudos boards for celebrating achievements, expressing gratitude, and more.

## Project Structure

This project is organized into two main directories:

- **client**: Contains the React frontend application built with Vite
  - Uses React Router for navigation
  - Material UI for component styling
  - Responsive design for various screen sizes

- **server**: Contains the Express.js backend application
  - RESTful API endpoints
  - Environment configuration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

```bash
npm run install:all
```

### Development

To run both the client and server in development mode:

```bash
npm run dev
```

To run only the client:

```bash
npm run client
```

To run only the server:

```bash
npm run server:dev
```

### Production

To start the production server:

```bash
npm start
```

## Features

- Create and customize kudos boards
- Share boards with others
- Filter boards by category
- Search functionality
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - Material UI
  - Emotion (CSS-in-JS)
  - Vite

- **Backend**:
  - Express.js
  - Node.js
  - dotenv for environment configuration
