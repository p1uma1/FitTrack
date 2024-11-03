# Fitness Tracker

A fitness tracking application that allows users to create custom workout plans and monitor their progress over time.

## Features

- **Custom Workout Plans**: Create and personalize your own workout routines.
- **Progress Tracking**: View progress charts and statistics.
- **User Authentication**: Sign up, log in, and securely manage your profile.

## Technology Stack

- **Frontend**: React (with TypeScript)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**: Mongoose, Axios, JWT (for authentication)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/fitness-tracker.git
Navigate to the project directory:

```bash
    cd fitness-tracker
```
Install dependencies for both the frontend and backend:

```bash
cd fitness-app # Navigate to the frontend directory
npm install  # Install frontend dependencies

cd ../fitness-tracker # Navigate to the backend directory
npm install  # Install backend dependencies
```
Configuration
Create a .env file in the server directory to store environment variables, including MongoDB URI and JWT secret.

Example .env file:

```makefile
Copy code
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
### Running the Application
Start the backend server:

```bash
Copy code
cd fitness-tracker
npm start
```
Start the frontend:

```bash
Copy code
cd fitness-app
npm run dev
```
This will launch the frontend on the default Vite server (usually http://localhost:5173) and the backend on http://localhost:3000 (or the port specified in the .env file).

