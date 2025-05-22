/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the todo
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the todo
 *         completed:
 *           type: boolean
 *           description: Whether the todo is completed
 *         user:
 *           type: string
 *           description: The id of the user who created the todo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the todo was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the todo was last updated
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         title: Complete project
 *         description: Finish the project by the deadline
 *         dueDate: 2023-06-30T00:00:00.000Z
 *         completed: false
 *         user: 60d21b4667d0d8992e610c85
 *         createdAt: 2023-06-01T00:00:00.000Z
 *         updatedAt: 2023-06-01T00:00:00.000Z
 *     TodoCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the todo
 *       example:
 *         title: Complete project
 *         description: Finish the project by the deadline
 *         dueDate: 2023-06-30T00:00:00.000Z
 *     TodoUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the todo
 *         completed:
 *           type: boolean
 *           description: Whether the todo is completed
 *       example:
 *         title: Updated project
 *         description: Updated description
 *         dueDate: 2023-07-15T00:00:00.000Z
 *         completed: true
 *     TodoResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *         todo:
 *           $ref: '#/components/schemas/Todo'
 *       example:
 *         message: Todo created successfully
 *         todo:
 *           id: 60d21b4667d0d8992e610c85
 *           title: Complete project
 *           description: Finish the project by the deadline
 *           dueDate: 2023-06-30T00:00:00.000Z
 *           completed: false
 *           user: 60d21b4667d0d8992e610c85
 *           createdAt: 2023-06-01T00:00:00.000Z
 *           updatedAt: 2023-06-01T00:00:00.000Z
 *     TodosResponse:
 *       type: object
 *       properties:
 *         todos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Todo'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: number
 *               description: Total number of todos
 *             page:
 *               type: number
 *               description: Current page
 *             limit:
 *               type: number
 *               description: Number of todos per page
 *             pages:
 *               type: number
 *               description: Total number of pages
 *       example:
 *         todos:
 *           - id: 60d21b4667d0d8992e610c85
 *             title: Complete project
 *             description: Finish the project by the deadline
 *             dueDate: 2023-06-30T00:00:00.000Z
 *             completed: false
 *             user: 60d21b4667d0d8992e610c85
 *             createdAt: 2023-06-01T00:00:00.000Z
 *             updatedAt: 2023-06-01T00:00:00.000Z
 *         pagination:
 *           total: 10
 *           page: 1
 *           limit: 10
 *           pages: 1
 *     DeleteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *       example:
 *         message: Todo deleted successfully
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoCreate'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Get all todos for the authenticated user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of todos per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for title or description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: dueDate
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by completion status
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodosResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoUpdate'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
