# Project Overview

This is a simple To-Do List API built using Node.js and the Express framework. It provides CRUD operations for managing tasks, with data persistence handled via a local JSON file.

# Building and Running

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation
```bash
npm install
```

### Running the Server
```bash
node index.js
```
The server will start at `http://localhost:3000`.

### Testing
There are currently no automated tests defined in this project.

# Development Conventions

*   **Framework:** Express.js
*   **Data Storage:** JSON file located in `data/todos.json`.
*   **Architecture:** MVC-like structure separating routes (`routes/`) and controller logic (`controllers/`).
*   **Style:** CommonJS modules (`require`/`module.exports`).
