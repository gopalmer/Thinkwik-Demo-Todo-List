# Todo API

A robust RESTful API for managing todo tasks with user authentication, built with Express.js, TypeScript, and MongoDB.

## Features

- **User Authentication**: Secure signup and login with JWT
- **Todo Management**: Create, read, update, and delete todos
- **Advanced Filtering**: Search, sort, and filter todos
- **Pagination**: Paginated results for better performance
- **API Documentation**: Comprehensive Swagger documentation
- **Automated Tasks**: CRON jobs for background processing
- **Logging**: Detailed logging for debugging and monitoring
- **Type Safety**: Full TypeScript support with custom types
- **Input Validation**: Request validation with Joi/Celebrate
- **Modular Structure**: Well-organized code with clear separation of concerns

## Technology Stack

- **Node.js & Express**: Server and API framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication mechanism
- **Joi & Celebrate**: Request validation
- **Swagger/OpenAPI**: API documentation
- **Node-cron**: Scheduled tasks

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm (v8 or higher) or yarn (v1.22 or higher)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-api.git
cd todo-api
```

2. install dependencies 
```bash
npm install or yarn install
```

3. Run Project
``` bash
npm run dev or yarn run dev
```

4. add env
``` bash
MONGODB_URI = replace your mongo
PORT = replace your port
JWT_SECRET = replace you secret key
```
