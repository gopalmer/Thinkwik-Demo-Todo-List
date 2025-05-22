Todo API
A robust RESTful API for managing todo tasks with user authentication, built with Express.js, TypeScript, and MongoDB.

Features
User Authentication: Secure signup and login with JWT
Todo Management: Create, read, update, and delete todos
Advanced Filtering: Search, sort, and filter todos
Pagination: Paginated results for better performance
API Documentation: Comprehensive Swagger documentation
Automated Tasks: CRON jobs for background processing
Logging: Detailed logging for debugging and monitoring
Type Safety: Full TypeScript support with custom types
Input Validation: Request validation with Joi/Celebrate
Modular Structure: Well-organized code with clear separation of concerns
Technology Stack
Node.js & Express: Server and API framework
TypeScript: Type-safe JavaScript
MongoDB & Mongoose: Database and ODM
JWT: Authentication mechanism
Joi & Celebrate: Request validation
Swagger/OpenAPI: API documentation
Node-cron: Scheduled tasks


Project Structure
src/
├── config/             # Configuration files
│   ├── db.config.ts    # Database configuration
│   ├── swagger.config.ts # Swagger configuration
│   └── index.ts
├── constants/          # Application constants
│   ├── app.ts
│   ├── http.ts
│   ├── messages.ts
│   ├── routes.ts
│   └── index.ts
├── controllers/        # Request handlers
│   ├── auth.controller.ts
│   ├── todo.controller.ts
│   └── index.ts
├── middleware/         # Express middleware
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── index.ts
├── models/             # Mongoose models
│   ├── auth.model.ts
│   ├── todo.model.ts
│   └── index.ts
├── routes/             # API routes
│   ├── auth.routes.ts
│   ├── todo.routes.ts
│   ├── swagger.routes.ts
│   └── index.ts
├── services/           # Business logic
│   ├── auth.service.ts
│   ├── todo.service.ts
│   ├── cron.service.ts
│   └── index.ts
├── swagger/            # Swagger documentation
│   ├── auth.swagger.ts
│   └── todo.swagger.ts
├── utils/              # Utility functions
│   ├── cron.helper.ts
│   └── index.ts
├── validators/         # Request validators
│   ├── auth.validator.ts
│   ├── todo.validator.ts
│   └── index.ts
└── index.ts            # Application entry point

Installation
Prerequisites
Node.js (v14 or higher)
MongoDB (local or Atlas)
npm or yarn

Setup
Clone the repository:
git clone https://github.com/yourusername/todo-api.git
cd todo-api