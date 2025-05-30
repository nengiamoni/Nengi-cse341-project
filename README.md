# Book Management API

A RESTful API for managing books and authors, built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for books and authors
- Data validation and error handling
- MongoDB integration
- Swagger API documentation
- RESTful design principles

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd nengi-cse341-project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Documentation

Once the server is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Authors

- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get a specific author
- `POST /api/authors` - Create a new author
- `PUT /api/authors/:id` - Update an author
- `DELETE /api/authors/:id` - Delete an author

## Data Models

### Book
- title (String, required)
- author (ObjectId, required, ref: 'Author')
- isbn (String, required, unique)
- publicationYear (Number, required)
- genre (String, required, enum)
- price (Number, required)
- description (String, required)

### Author
- firstName (String, required)
- lastName (String, required)
- birthDate (Date, required)
- nationality (String, required)
- biography (String, required)
- awards (Array, optional)
- website (String, optional)

## Error Handling

The API includes comprehensive error handling for:
- Invalid input data
- Not found resources
- Server errors
- Database connection issues

## License

MIT