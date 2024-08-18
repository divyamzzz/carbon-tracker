# Carbon Tracker

Welcome to **Carbon Tracker**, a web application designed to help you monitor and reduce your carbon footprint based on your device's data consumption and electricity usage. By keeping track of your carbon emissions, you can take steps towards a more sustainable and environmentally-friendly lifestyle.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure sign-up and login process for users to create an account and access their carbon footprint data.
- **Carbon Footprint Calculation**: Calculates the carbon emissions based on the device's data consumption and associated electricity usage.
- **Personalized Recommendations**: Provides users with tailored steps to reduce their carbon emissions if they exceed the safe range.
- **Congratulatory Messages**: Displays a congratulatory message if the user's carbon footprint is within the safe range.
- **Responsive Design**: User-friendly interface accessible on various devices.

## Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the backend API.
- **Bootstrap**: For responsive and modern design.

### Backend
- **Node.js**: A JavaScript runtime for building fast and scalable server-side applications.
- **Express.js**: A web application framework for Node.js, used to build the API.
- **PostgreSQL**: A powerful, open-source object-relational database system to store user data and carbon footprint calculations.

### Other Tools
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Bcrypt**: For hashing passwords before storing them in the database.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database set up.
- Git installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/carbon-tracker.git
   cd carbon-tracker
   ```

2. **Install dependencies for the frontend and backend:**

   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Set up the PostgreSQL database:**

   - Create a new PostgreSQL database.
   - Update the `DATABASE_URL` in the `.env` file located in the `server` directory with your PostgreSQL connection string.

   Example `.env` file:

   ```
   DATABASE_URL=postgres://user:password@localhost:5432/carbon_tracker
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**

   ```bash
   # Start the backend server
   cd server
   npm start
   
   # Start the frontend development server
   cd ../client
   npm start
   ```

   The application should now be running on `http://localhost:3000`.

## Usage

1. **Sign Up**: Create a new account by providing your email and a secure password.
2. **Login**: Access your account using the email and password you registered with.
3. **View Carbon Footprint**: After logging in, you can view the carbon emissions calculated based on your device's data consumption.
4. **Receive Feedback**: If your carbon emissions are within the safe range, you'll receive a congratulatory message. Otherwise, you'll be provided with actionable steps to reduce your carbon footprint.

## Database Schema

The PostgreSQL database schema consists of the following tables:

- **Users**: Stores user information such as email, hashed password, and account details.
- **CarbonFootprint**: Stores carbon footprint data, including user ID, data consumption, electricity usage, and calculated emissions.

## API Endpoints

Here are the main API endpoints used in the application:

- **POST /api/auth/signup**: Create a new user account.
- **POST /api/auth/login**: Login and receive a JWT token.
- **GET /api/carbon-footprint**: Fetch the carbon footprint for the logged-in user.
- **POST /api/carbon-footprint**: Calculate and store the carbon footprint based on user data.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request to the `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for checking out **Carbon Tracker**! Let's work together to reduce our carbon footprint and make the world a greener place. 🌍
