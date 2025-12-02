import { Request, Response } from 'express';
import { prisma } from '../../shared/lib/prisma';
import { ApiResponse } from '../../shared/utils/errors/AppError.';
import { eventWithCategoryValidation } from './event.validation';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const parsedData = eventWithCategoryValidation.safeParse(req.body);
    // const userId = req.user?.id;
    const userId = (req as any).user?.id;

    if (!parsedData.success) {
      return ApiResponse.error(res, {
        message: 'Validation Failed',
        error: parsedData.error.flatten().fieldErrors,
      });
    }
    if (!userId) {
      return ApiResponse.error(res, { message: 'User not authenticated' });
    }
    const organizerId = userId;

    const { event, category } = parsedData.data;

    if (
      !event.title ||
      !event.description ||
      !event.venue ||
      !event.street ||
      !event.city ||
      !event.state ||
      !event.country ||
      !event.postalCode ||
      !event.startDate ||
      !event.endDate ||
      !event.price ||
      !event.capacity ||
      !event.availableTickets ||
      !event.status ||
      event.isFeatured === undefined ||
      event.isPublic === undefined
    ) {
      return ApiResponse.error(res, {
        message: 'All event fields are required',
      });
    }

    const eventDetails = await prisma.$transaction(async (tx: any) => {
      let categoryId = event.categoryId;

      if (category) {
        if (!category.name) {
          throw new Error('Name is required when creating new category');
        }

        const newCategory = await tx.category.create({
          data: {
            name: category.name,
            description: category.description,
            slug: category.slug || '',
            image: category.image || '',
          },
        });
        categoryId = newCategory.id;
      }

      if (!categoryId) {
        throw new Error('Either category data or categoryId is required');
      }

      const createdEvent = await tx.event.create({
        data: {
          title: event.title || '',
          description: event.description,
          shortDescription: event.shortDescription,
          venue: event.venue,
          street: event.street,
          city: event.city,
          state: event.state,
          country: event.country,
          postalCode: event.postalCode,
          startDate: event.startDate,
          endDate: event.endDate,
          doorTime: event.doorTime,
          image: event.image,
          images: event.images,
          price: event.price,
          capacity: event.capacity!,
          availableTickets: event.availableTickets!,
          status: event.status,
          isFeatured: event.isFeatured,
          isPublic: event.isPublic,
          organizerId: organizerId,
          categoryId: categoryId,
        },
        include: {
          category: true,
        },
      });

      return createdEvent;
    });

    return ApiResponse.success(res, {
      message: 'Event created successfully',
      data: eventDetails,
    });
  } catch (error: any) {
    console.error('Error creating event:', error);
    return ApiResponse.error(res, {
      message: error.message || 'Internal server error',
    });
  }
};

export const filterEvent = async (req: Request, res: Response) => {
  try {
    const { searchQuery, categoryType, timeRange } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sortBy = req.query.sortBy || 'startDate';
    const sortOrder = req.query.sortOrder || 'asc';

    const pageNumber = Math.max(1, parseInt(page as string));
    const limitNumber = Math.min(50, Math.max(1, parseInt(limit as string))); // Max 50 per page
    const skip = (pageNumber - 1) * limitNumber;

    // Sort options
    const orderBy: any = {};
    const validSortFields = ['startDate', 'createdAt', 'price', 'title'];
    const validSortOrders = ['asc', 'desc'];

    orderBy[
      validSortFields.includes(sortBy as string)
        ? (sortBy as string)
        : 'startDate'
    ] = validSortOrders.includes(sortOrder as string)
      ? (sortOrder as string)
      : 'asc';

    // Build filter (same as before)
    const filter: any = { AND: [] };

    if (searchQuery) {
      filter.AND.push({
        OR: [
          { title: { contains: searchQuery as string, mode: 'insensitive' } },
          {
            description: {
              contains: searchQuery as string,
              mode: 'insensitive',
            },
          },
          {
            shortDescription: {
              contains: searchQuery as string,
              mode: 'insensitive',
            },
          },
        ],
      });
    }

    if (categoryType) {
      filter.AND.push({
        category: {
          name: { contains: categoryType as string, mode: 'insensitive' },
        },
      });
    }

    if (timeRange) {
      let startDateFilter: any = {};
      const now = new Date();

      switch (timeRange) {
        case 'today':
          startDateFilter.gte = new Date(now.setHours(0, 0, 0, 0));
          startDateFilter.lte = new Date(now.setHours(23, 59, 59, 999));
          break;
        case 'this-week':
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);
          startDateFilter.gte = startOfWeek;
          startDateFilter.lte = endOfWeek;
          break;
        case 'this-month':
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          );
          startDateFilter.gte = startOfMonth;
          startDateFilter.lte = endOfMonth;
          break;
        case 'next-3-months':
          startDateFilter.gte = now;
          startDateFilter.lte = new Date(
            now.getFullYear(),
            now.getMonth() + 3,
            now.getDate()
          );
          break;
        case 'upcoming':
          startDateFilter.gte = now;
          break;
        default:
          startDateFilter.gte = new Date(timeRange as string);
      }

      filter.AND.push({ startDate: startDateFilter });
    }

    if (filter.AND.length === 0) delete filter.AND;

    // Get total count and events
    const [totalEvents, events] = await Promise.all([
      prisma.event.count({ where: filter }),
      prisma.event.findMany({
        where: filter,
        include: {
          category: true,
          organizer: { select: { id: true, name: true, email: true } },
          _count: { select: { tickets: true, bookings: true } },
        },
        orderBy,
        skip,
        take: limitNumber,
      }),
    ]);

    // Pagination info
    const totalPages = Math.ceil(totalEvents / limitNumber);

    return ApiResponse.success(res, {
      message: 'Events fetched successfully',
      data: {
        events,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalEvents,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
          limit: limitNumber,
          sortBy,
          sortOrder,
        },
      },
    });
  } catch (error: any) {
    console.error('Error filtering events:', error);
    return ApiResponse.error(res, {
      message: error.message || 'Internal server error',
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: true,
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return ApiResponse.success(res, {
      message: 'Event fetched successfully',
      data: event,
    });
  } catch (error) {
    return ApiResponse.error(res, {
      message: 'Internal server error',
    });
  }
};

export const updateEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = eventWithCategoryValidation.safeParse(req.body);
    const userId = (req as any).user?.id;

    if (!parsedData.success) {
      return ApiResponse.error(res, {
        message: 'Validation Failed',
        error: parsedData.error?.flatten().fieldErrors,
      });
    }
    const { event, category } = parsedData.data;
    const organizerId = userId!;

    let categoryId = event.categoryId;

    if (category) {
      const newCategory = await prisma.category.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: category.name,
          description: category.description,
          slug: category.slug || '',
          image: category.image || '',
        },
      });
      categoryId = newCategory.id;
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: event.title || '',
        description: event.description,
        shortDescription: event.shortDescription,
        venue: event.venue,
        street: event.street,
        city: event.city,
        state: event.state,
        country: event.country,
        postalCode: event.postalCode,
        startDate: event.startDate,
        endDate: event.endDate,
        doorTime: event.doorTime,
        image: event.image,
        images: event.images,
        price: event.price,
        capacity: event.capacity!,
        availableTickets: event.availableTickets!,
        status: event.status,
        isFeatured: event.isFeatured,
        isPublic: event.isPublic,
        organizerId: organizerId,
      },
      include: {
        category: true,
      },
    });

    return ApiResponse.success(res, {
      message: 'Event updated successfully',
      data: updatedEvent,
    });
  } catch (error: any) {
    console.error('Error updating event:', error);
    return ApiResponse.error(res, {
      message: error.message || 'Internal server error',
    });
  }
};

export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!event) {
      return ApiResponse.error(res, {
        message: 'Event not found',
      });
    }
    const category = await prisma.category.delete({
      where: {
        id: event.categoryId!,
      },
    });
    const deletedEvent = await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    });
    return ApiResponse.success(res, {
      message: 'Event deleted successfully',
      data: event,
    });
  } catch (error) {
    return ApiResponse.error(res, {
      message: 'Internal server error',
    });
  }
};
