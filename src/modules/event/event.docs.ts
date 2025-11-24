/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - venue
 *         - street
 *         - city
 *         - state
 *         - country
 *         - postalCode
 *         - startDate
 *         - endDate
 *         - price
 *         - capacity
 *         - availableTickets
 *         - status
 *         - isFeatured
 *         - isPublic
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the event
 *         title:
 *           type: string
 *           description: The title of the event
 *         description:
 *           type: string
 *           description: The full description of the event
 *         shortDescription:
 *           type: string
 *           description: A short description of the event
 *         venue:
 *           type: string
 *           description: The venue name
 *         street:
 *           type: string
 *           description: The street address
 *         city:
 *           type: string
 *           description: The city
 *         state:
 *           type: string
 *           description: The state/province
 *         country:
 *           type: string
 *           description: The country
 *         postalCode:
 *           type: string
 *           description: The postal code
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The event start date and time
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The event end date and time
 *         doorTime:
 *           type: string
 *           format: date-time
 *           description: The door opening time
 *         image:
 *           type: string
 *           description: Main event image URL
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Additional event image URLs
 *         price:
 *           type: number
 *           format: float
 *           description: The ticket price
 *         capacity:
 *           type: integer
 *           description: Maximum capacity of the event
 *         availableTickets:
 *           type: integer
 *           description: Number of available tickets
 *         status:
 *           type: string
 *           enum: [draft, published, cancelled, completed]
 *           description: Event status
 *         isFeatured:
 *           type: boolean
 *           description: Whether the event is featured
 *         isPublic:
 *           type: boolean
 *           description: Whether the event is public
 *         organizerId:
 *           type: integer
 *           description: ID of the event organizer
 *         categoryId:
 *           type: integer
 *           description: ID of the event category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 * 
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the category
 *         name:
 *           type: string
 *           description: The category name
 *         description:
 *           type: string
 *           description: The category description
 *         slug:
 *           type: string
 *           description: URL-friendly slug
 *         image:
 *           type: string
 *           description: Category image URL
 * 
 *     EventWithCategory:
 *       type: object
 *       required:
 *         - event
 *       properties:
 *         event:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             shortDescription:
 *               type: string
 *             venue:
 *               type: string
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             country:
 *               type: string
 *             postalCode:
 *               type: string
 *             startDate:
 *               type: string
 *               format: date-time
 *             endDate:
 *               type: string
 *               format: date-time
 *             doorTime:
 *               type: string
 *               format: date-time
 *             image:
 *               type: string
 *             images:
 *               type: array
 *               items:
 *                 type: string
 *             price:
 *               type: number
 *             capacity:
 *               type: integer
 *             availableTickets:
 *               type: integer
 *             status:
 *               type: string
 *             isFeatured:
 *               type: boolean
 *             isPublic:
 *               type: boolean
 *             categoryId:
 *               type: integer
 *         category:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             slug:
 *               type: string
 *             image:
 *               type: string
 * 
 *     EventResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Event'
 * 
 *     EventsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             events:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *             pagination:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalEvents:
 *                   type: integer
 *                 hasNextPage:
 *                   type: boolean
 *                 hasPrevPage:
 *                   type: boolean
 *                 limit:
 *                   type: integer
 *                 sortBy:
 *                   type: string
 *                 sortOrder:
 *                   type: string
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         error:
 *           type: object
 * 
 *   parameters:
 *     EventIdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: Event ID
 * 
 *     PageQuery:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 1
 *       description: Page number for pagination
 * 
 *     LimitQuery:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 50
 *         default: 10
 *       description: Number of items per page (max 50)
 * 
 *     SearchQuery:
 *       in: query
 *       name: searchQuery
 *       schema:
 *         type: string
 *       description: Search query for event title, description
 * 
 *     CategoryTypeQuery:
 *       in: query
 *       name: categoryType
 *       schema:
 *         type: string
 *       description: Filter by category name
 * 
 *     TimeRangeQuery:
 *       in: query
 *       name: timeRange
 *       schema:
 *         type: string
 *         enum: [today, this-week, this-month, next-3-months, upcoming]
 *       description: Filter events by time range
 * 
 *     SortByQuery:
 *       in: query
 *       name: sortBy
 *       schema:
 *         type: string
 *         enum: [startDate, createdAt, price, title]
 *         default: startDate
 *       description: Field to sort by
 * 
 *     SortOrderQuery:
 *       in: query
 *       name: sortOrder
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *         default: asc
 *       description: Sort order
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /api/events/create-event:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventWithCategory'
 *           examples:
 *             example1:
 *               summary: Create event with existing category
 *               value:
 *                 event:
 *                   title: "Summer Music Festival"
 *                   description: "A wonderful summer music festival"
 *                   shortDescription: "Summer music fest"
 *                   venue: "Central Park"
 *                   street: "123 Main St"
 *                   city: "New York"
 *                   state: "NY"
 *                   country: "USA"
 *                   postalCode: "10001"
 *                   startDate: "2024-07-15T18:00:00Z"
 *                   endDate: "2024-07-15T23:00:00Z"
 *                   doorTime: "2024-07-15T17:00:00Z"
 *                   image: "https://example.com/image.jpg"
 *                   images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                   price: 50.00
 *                   capacity: 1000
 *                   availableTickets: 1000
 *                   status: "published"
 *                   isFeatured: true
 *                   isPublic: true
 *                   categoryId: 1
 *             example2:
 *               summary: Create event with new category
 *               value:
 *                 event:
 *                   title: "Tech Conference 2024"
 *                   description: "Annual technology conference"
 *                   shortDescription: "Tech conference"
 *                   venue: "Convention Center"
 *                   street: "456 Tech Ave"
 *                   city: "San Francisco"
 *                   state: "CA"
 *                   country: "USA"
 *                   postalCode: "94102"
 *                   startDate: "2024-09-10T09:00:00Z"
 *                   endDate: "2024-09-12T18:00:00Z"
 *                   price: 299.99
 *                   capacity: 500
 *                   availableTickets: 500
 *                   status: "published"
 *                   isFeatured: false
 *                   isPublic: true
 *                 category:
 *                   name: "Technology"
 *                   description: "Technology related events"
 *                   slug: "technology"
 *                   image: "https://example.com/tech.jpg"
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       400:
 *         description: Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: User not authenticated
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
 * /api/events/filter-event:
 *   get:
 *     summary: Filter and search events with pagination
 *     tags: [Events]
 *     parameters:
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - $ref: '#/components/parameters/CategoryTypeQuery'
 *       - $ref: '#/components/parameters/TimeRangeQuery'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - $ref: '#/components/parameters/SortByQuery'
 *       - $ref: '#/components/parameters/SortOrderQuery'
 *     responses:
 *       200:
 *         description: Events fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventsListResponse'
 *             examples:
 *               success:
 *                 summary: Filtered events response
 *                 value:
 *                   success: true
 *                   message: "Events fetched successfully"
 *                   data:
 *                     events:
 *                       - id: 1
 *                         title: "Summer Music Festival"
 *                         description: "A wonderful summer music festival"
 *                         startDate: "2024-07-15T18:00:00Z"
 *                         endDate: "2024-07-15T23:00:00Z"
 *                         price: 50.00
 *                         capacity: 1000
 *                         availableTickets: 800
 *                         status: "published"
 *                         isFeatured: true
 *                         isPublic: true
 *                     pagination:
 *                       currentPage: 1
 *                       totalPages: 5
 *                       totalEvents: 50
 *                       hasNextPage: true
 *                       hasPrevPage: false
 *                       limit: 10
 *                       sortBy: "startDate"
 *                       sortOrder: "asc"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/events/get-event/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - $ref: '#/components/parameters/EventIdParam'
 *     responses:
 *       200:
 *         description: Event fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *             examples:
 *               success:
 *                 summary: Event details
 *                 value:
 *                   success: true
 *                   message: "Event fetched successfully"
 *                   data:
 *                     id: 1
 *                     title: "Summer Music Festival"
 *                     description: "A wonderful summer music festival"
 *                     venue: "Central Park"
 *                     startDate: "2024-07-15T18:00:00Z"
 *                     endDate: "2024-07-15T23:00:00Z"
 *                     price: 50.00
 *                     capacity: 1000
 *                     availableTickets: 800
 *                     status: "published"
 *                     category:
 *                       id: 1
 *                       name: "Music"
 *       404:
 *         description: Event not found
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
 * /api/events/update-event/{id}:
 *   put:
 *     summary: Update event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EventIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventWithCategory'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Event not found
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
 * /api/events/delete-event/{id}:
 *   delete:
 *     summary: Delete event by ID
 *     tags: [Events]
 *     parameters:
 *       - $ref: '#/components/parameters/EventIdParam'
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *             examples:
 *               success:
 *                 summary: Event deleted
 *                 value:
 *                   success: true
 *                   message: "Event deleted successfully"
 *                   data:
 *                     id: 1
 *                     title: "Summer Music Festival"
 *       404:
 *         description: Event not found
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