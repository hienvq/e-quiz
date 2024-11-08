# E-Quiz Backend NestJS Service

This is a backend service built with NestJS.

## Installation

> **Note:** Ensure you are using Node.js LTS version and MongoDB LTS version for compatibility.

1. Clone the repository:

```bash
git clone https://github.com/hienvq/e-quiz.git
cd backend
```

2. Install dependencies:

```bash
npm install
```

## Build

To build the project, run:

```bash
npm run build
```

## Start

To start the development server, run:

```bash
npm run start:dev
```

To start the production server, run:

```bash
npm run start:prod
```

## Configuration

### MongoDB

1. Ensure MongoDB is installed and running on your machine. You can download it from [here](https://www.mongodb.com/try/download/community).

2. Create a `.env` file in the root directory and add the following configuration:

```env
PORT=YOUR_APP_PORT
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/your-database-name
```

## Database Migration

Before starting the server, ensure you run the database migrations:

```bash
npm run db:migrate
```
