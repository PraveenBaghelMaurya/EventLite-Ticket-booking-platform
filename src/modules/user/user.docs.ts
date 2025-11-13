// D:\Custom\MCA\Project\Eventlite\BACKEND\src\modules\user\user.docs.ts

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *           example: "USER"
 *         avatar:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 * 
 *     SignUpRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: "Password123"
 * 
 *     SignInRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "Password123"
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "User signed up successfully"
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: "John Doe"
 *             email:
 *               type: string
 *               example: "john.doe@example.com"
 *             phone:
 *               type: string
 *               example: "+1234567890"
 *             role:
 *               type: string
 *               example: "USER"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2023-01-01T00:00:00.000Z"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Validation Failed"
 *         error:
 *           type: object
 *           properties:
 *             email:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Invalid email format"]
 *             password:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Password must be at least 6 characters"]
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   responses:
 *     ValidationError:
 *       description: Validation error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 * 
 *     Unauthorized:
 *       description: Unauthorized access
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Unauthorized access"
 * 
 *     InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Internal server error"
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/user/sign-up:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with name, email, phone, and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *           examples:
 *             example1:
 *               summary: Example sign-up request
 *               value:
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 phone: "+1234567890"
 *                 password: "Password123"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             examples:
 *               success:
 *                 summary: Successful registration
 *                 value:
 *                   success: true
 *                   message: "User signed up successfully"
 *                   data:
 *                     id: 1
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                     phone: "+1234567890"
 *                     role: "USER"
 *                     createdAt: "2023-01-01T00:00:00.000Z"
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validationError:
 *                 summary: Validation error
 *                 value:
 *                   success: false
 *                   message: "Validation Failed"
 *                   error:
 *                     email: ["Invalid email format"]
 *                     password: ["Password must be at least 6 characters"]
 *               userExists:
 *                 summary: User already exists
 *                 value:
 *                   success: false
 *                   message: "Email or phone already exists"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /api/user/sign-in:
 *   post:
 *     summary: Sign in user
 *     description: Authenticate user with email and password, returns access and refresh tokens in cookies
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *           examples:
 *             example1:
 *               summary: Example sign-in request
 *               value:
 *                 email: "john.doe@example.com"
 *                 password: "Password123"
 *     responses:
 *       200:
 *         description: User successfully signed in
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             examples:
 *               success:
 *                 summary: Successful sign-in
 *                 value:
 *                   success: true
 *                   message: "User signed in successfully"
 *                   data:
 *                     id: 1
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                     phone: "+1234567890"
 *                     role: "USER"
 *                     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     createdAt: "2023-01-01T00:00:00.000Z"
 *       400:
 *         description: Validation error or missing credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validationError:
 *                 summary: Validation error
 *                 value:
 *                   success: false
 *                   message: "Validation Failed"
 *                   error:
 *                     email: ["Invalid email format"]
 *               missingCredentials:
 *                 summary: Missing credentials
 *                 value:
 *                   success: false
 *                   message: "Email and password is required"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid password"
 *             examples:
 *               invalidPassword:
 *                 summary: Invalid password
 *                 value:
 *                   success: false
 *                   message: "Invalid password"
 *               emailNotFound:
 *                 summary: Email not found
 *                 value:
 *                   success: false
 *                   message: "Email not found"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /api/user/sign-out:
 *   post:
 *     summary: Sign out user
 *     description: Clear authentication cookies and invalidate tokens
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User successfully signed out
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "accessToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User signed out successfully"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

