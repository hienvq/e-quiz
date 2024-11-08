# Frontend README

## Introduction

This is the frontend for the E-Quiz project.

## Installation

> **Note:** Ensure you are using Node.js LTS version and MongoDB LTS version for compatibility.

1. Clone the repository:

```bash
git clone https://github.com/hienvq/e-quiz.git
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## Building the Project

To build the project, use the following command:

```bash
npm run build
```

This will create a `dist` directory with the production build of the project.

## Starting the Development Server

To start the development server, run:

```bash
npm start
```

This will start the server on `http://localhost:3000`.

## Configuration

To configure the environment variables, create a `.env` file in the root directory and add the necessary variables. For example:

```env
VITE_API_URL=http://localhost:4000/
```

Make sure to replace the values with your actual configuration.
