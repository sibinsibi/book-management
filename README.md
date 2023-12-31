# Book Management System

Book Management System is a microservices-based application for managing a collection of books with user authentication and authorization.

## Table of Contents

- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed or a MongoDB Atlas account (for database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/book-management.git
   cd book-management-system
   ```

2. Install dependencies for each service (auth-service and book-service):

   ```bash
   cd auth-service
   npm install

   cd ../book-service
   npm install
   ```

## Running the Application

To run the application locally without Docker, follow these steps:

1. Start MongoDB.

2. Run each service in separate terminals:

   ```bash
   # In auth-service directory
   npm start

   # In book-service directory
   npm start
   ```

The services will be accessible at `http://localhost:3000` for `auth-service` and `http://localhost:3001` for `book-service`.
