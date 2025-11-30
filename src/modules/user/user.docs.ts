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
 *           description: The auto-generated ID of the user
 *           example: 1
 *         name:
 *           type: string
 *           description: The full name of the user
 *           example: "Praveen Baghel"
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *           example: "praveen.baghel@example.com"
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *           example: "+91 9876543210"
 *         role:
 *           type: string
 *           enum: [USER, ORGANIZER, ADMIN]
 *           description: The role of the user
 *           example: "ORGANIZER"
 *         avatar:
 *           type: string
 *           description: URL to user's avatar image
 *           example: "https://example.com/avatars/praveen.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *           example: "2024-01-15T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *           example: "2024-01-20T14:45:00.000Z"
 *
 *     UserSignUp:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The full name of the user
 *           example: "Praveen Baghel"
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *           example: "praveen.baghel@example.com"
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *           example: "+91 9876543210"
 *         password:
 *           type: string
 *           format: password
 *           description: The password for the account
 *           example: "SecurePass123!"
 *
 *     UserSignIn:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *           example: "praveen.baghel@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: The password for the account
 *           example: "SecurePass123!"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "User authenticated successfully"
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: "Praveen Baghel"
 *             email:
 *               type: string
 *               example: "praveen.baghel@example.com"
 *             phone:
 *               type: string
 *               example: "+91 9876543210"
 *             role:
 *               type: string
 *               example: "ORGANIZER"
 *
 *     UsersListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Users fetched successfully"
 *         data:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Praveen Baghel"
 *                   email:
 *                     type: string
 *                     example: "praveen.baghel@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+91 9876543210"
 *                   role:
 *                     type: string
 *                     example: "ORGANIZER"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-15T10:30:00.000Z"
 *             pagination:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalUsers:
 *                   type: integer
 *                   example: 150
 *                 totalPages:
 *                   type: integer
 *                   example: 15
 *                 hasNext:
 *                   type: boolean
 *                   example: true
 *                 hasPrev:
 *                   type: boolean
 *                   example: false
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Authentication failed"
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               example: "AUTH_ERROR"
 *             details:
 *               type: string
 *               example: "Invalid credentials provided"
 *
 *     GoogleAuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         redirectUrl:
 *           type: string
 *           example: "https://accounts.google.com/o/oauth2/auth?client_id=123456789&redirect_uri=http://localhost:3000/auth/google/callback"
 *         message:
 *           type: string
 *           example: "Redirect to Google OAuth"
 *
 *   parameters:
 *     UserIdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *         example: 1
 *       description: User ID
 *
 *     PageQuery:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 1
 *         example: 1
 *       description: Page number for pagination
 *
 *     LimitQuery:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 10
 *         example: 10
 *       description: Number of items per page
 *
 *     SearchQuery:
 *       in: query
 *       name: searchQuery
 *       schema:
 *         type: string
 *         example: "praveen"
 *       description: Search query for user name, email, or phone
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 */

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and authorization endpoints
 *   - name: Users
 *     description: User management endpoints
 */

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignUp'
 *           examples:
 *             developerExample:
 *               summary: Developer registration
 *               value:
 *                 name: "Praveen Baghel"
 *                 email: "praveen.baghel@example.com"
 *                 phone: "+91 9876543210"
 *                 password: "SecurePass123!"
 *             organizerExample:
 *               summary: Event organizer registration
 *               value:
 *                 name: "John EventManager"
 *                 email: "john.events@example.com"
 *                 phone: "+91 9123456789"
 *                 password: "EventPass456!"
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                   example: "User signed up successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Praveen Baghel"
 *                     email:
 *                       type: string
 *                       example: "praveen.baghel@example.com"
 *                     role:
 *                       type: string
 *                       example: "USER"
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validationError:
 *                 summary: Validation failed
 *                 value:
 *                   success: false
 *                   message: "Validation Failed"
 *                   error:
 *                     name: ["Name is required"]
 *                     email: ["Invalid email format"]
 *               userExists:
 *                 summary: User already exists
 *                 value:
 *                   success: false
 *                   message: "Email or phone already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Sign in user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignIn'
 *           examples:
 *             developerLogin:
 *               summary: Developer sign in
 *               value:
 *                 email: "praveen.baghel@example.com"
 *                 password: "SecurePass123!"
 *             organizerLogin:
 *               summary: Organizer sign in
 *               value:
 *                 email: "john.events@example.com"
 *                 password: "EventPass456!"
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             examples:
 *               successResponse:
 *                 summary: Successful sign in
 *                 value:
 *                   success: true
 *                   message: "User signed in successfully"
 *                   data:
 *                     id: 1
 *                     name: "Praveen Baghel"
 *                     email: "praveen.baghel@example.com"
 *                     phone: "+91 9876543210"
 *                     role: "ORGANIZER"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Sets accessToken and refreshToken as HTTP-only cookies
 *       400:
 *         description: Validation error or missing credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidEmail:
 *                 summary: Email not found
 *                 value:
 *                   success: false
 *                   message: "Email not found"
 *               invalidPassword:
 *                 summary: Invalid password
 *                 value:
 *                   success: false
 *                   message: "Invalid password"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/sign-out:
 *   post:
 *     summary: Sign out user and clear cookies
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User signed out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Signed out successfully"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Clears accessToken and refreshToken cookies
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Initiate Google OAuth flow
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Google OAuth URL generated successfully (for API calls)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoogleAuthResponse'
 *             examples:
 *               success:
 *                 summary: OAuth URL response
 *                 value:
 *                   success: true
 *                   redirectUrl: "https://accounts.google.com/o/oauth2/auth?client_id=123456789&redirect_uri=http://localhost:3000/auth/google/callback"
 *                   message: "Redirect to Google OAuth"
 *       302:
 *         description: Redirects to Google OAuth page (for browsers)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback endpoint
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code from Google
 *         example: "4/0AeaYSHCQH8kKHEjshd78asdhjkahsd789"
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: State parameter for CSRF protection
 *         example: "abc123state456def"
 *     responses:
 *       302:
 *         description: Redirects to frontend with success or error
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Sets authentication token as HTTP-only cookie
 *       400:
 *         description: Invalid state or code
 *       500:
 *         description: Authentication failed
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/UserIdParam'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             examples:
 *               developerProfile:
 *                 summary: Developer user profile
 *                 value:
 *                   success: true
 *                   message: "User profile fetched successfully"
 *                   data:
 *                     id: 1
 *                     name: "Praveen Baghel"
 *                     email: "praveen.baghel@example.com"
 *                     phone: "+91 9876543210"
 *                     role: "ORGANIZER"
 *                     avatar: "https://example.com/avatars/praveen.jpg"
 *                     createdAt: "2024-01-15T10:30:00.000Z"
 *                     updatedAt: "2024-01-20T14:45:00.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/users/filter-user:
 *   get:
 *     summary: Filter and search users with pagination (excludes ADMIN users)
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersListResponse'
 *             examples:
 *               filteredUsers:
 *                 summary: Filtered users response
 *                 value:
 *                   success: true
 *                   message: "Users fetched successfully"
 *                   data:
 *                     users:
 *                       - id: 1
 *                         name: "Praveen Baghel"
 *                         email: "praveen.baghel@example.com"
 *                         phone: "+91 9876543210"
 *                         role: "ORGANIZER"
 *                         createdAt: "2024-01-15T10:30:00.000Z"
 *                       - id: 2
 *                         name: "John EventManager"
 *                         email: "john.events@example.com"
 *                         phone: "+91 9123456789"
 *                         role: "ORGANIZER"
 *                         createdAt: "2024-01-16T14:20:00.000Z"
 *                       - id: 3
 *                         name: "Alice User"
 *                         email: "alice.user@example.com"
 *                         phone: "+91 9988776655"
 *                         role: "USER"
 *                         createdAt: "2024-01-17T09:15:00.000Z"
 *                     pagination:
 *                       currentPage: 1
 *                       limit: 10
 *                       totalUsers: 3
 *                       totalPages: 1
 *                       hasNext: false
 *                       hasPrev: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
