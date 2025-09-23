// Secure API Route: Competitor Data Management
// Implements Zod validation, Prisma parameterized queries, and role checks

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { securityMiddleware } from '@/middleware/security';

// Initialize Prisma client with connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Zod validation schemas
const CompetitorSchema = z.object({
  name: z.string().min(1).max(100),
  website: z.string().url().optional(),
  industry: z.string().min(1).max(50),
  location: z.string().min(1).max(100),
  trackingEnabled: z.boolean().default(true),
});

const CompetitorUpdateSchema = CompetitorSchema.partial();

const CompetitorQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  industry: z.string().optional(),
  location: z.string().optional(),
  search: z.string().optional(),
});

// Request handler with security middleware
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Apply security middleware
    const securityResponse = await securityMiddleware(req as any);
    if (securityResponse.status !== 200) {
      return res.status(securityResponse.status).json(
        await securityResponse.json()
      );
    }

    // Extract security context
    const tenantId = req.headers['x-tenant-id'] as string;
    const userId = req.headers['x-user-id'] as string;
    const userRole = req.headers['x-user-role'] as string;

    // Route handling
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res, tenantId, userId, userRole);
      case 'POST':
        return await handlePost(req, res, tenantId, userId, userRole);
      case 'PUT':
        return await handlePut(req, res, tenantId, userId, userRole);
      case 'DELETE':
        return await handleDelete(req, res, tenantId, userId, userRole);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET: Retrieve competitors with pagination and filtering
async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  tenantId: string,
  userId: string,
  userRole: string
) {
  // Validate query parameters
  const queryResult = CompetitorQuerySchema.safeParse(req.query);
  if (!queryResult.success) {
    return res.status(400).json({
      error: 'Invalid query parameters',
      details: queryResult.error.errors,
    });
  }

  const { page, limit, industry, location, search } = queryResult.data;
  const offset = (page - 1) * limit;

  try {
    // Build where clause with tenant isolation
    const whereClause: any = {
      tenantId, // CRITICAL: Always include tenant_id for isolation
      deletedAt: null, // Soft delete filter
    };

    if (industry) {
      whereClause.industry = industry;
    }

    if (location) {
      whereClause.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { website: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Execute parameterized query with tenant isolation
    const [competitors, total] = await Promise.all([
      prisma.competitor.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          website: true,
          industry: true,
          location: true,
          trackingEnabled: true,
          createdAt: true,
          updatedAt: true,
          // Only include sensitive data for managers and admins
          ...(userRole === 'admin' || userRole === 'manager' ? {
            apiKeys: true,
            lastSyncAt: true,
            syncStatus: true,
          } : {}),
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.competitor.count({
        where: whereClause,
      }),
    ]);

    return res.status(200).json({
      data: competitors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Database query error:', error);
    return res.status(500).json({ error: 'Failed to retrieve competitors' });
  }
}

// POST: Create new competitor
async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  tenantId: string,
  userId: string,
  userRole: string
) {
  // Check permissions (only managers and admins can create competitors)
  if (userRole !== 'admin' && userRole !== 'manager') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  // Validate request body
  const bodyResult = CompetitorSchema.safeParse(req.body);
  if (!bodyResult.success) {
    return res.status(400).json({
      error: 'Invalid request data',
      details: bodyResult.error.errors,
    });
  }

  const competitorData = bodyResult.data;

  try {
    // Check for duplicate competitor name within tenant
    const existingCompetitor = await prisma.competitor.findFirst({
      where: {
        tenantId, // Tenant isolation
        name: competitorData.name,
        deletedAt: null,
      },
    });

    if (existingCompetitor) {
      return res.status(409).json({
        error: 'Competitor with this name already exists',
      });
    }

    // Create competitor with tenant isolation
    const competitor = await prisma.competitor.create({
      data: {
        ...competitorData,
        tenantId, // CRITICAL: Always include tenant_id
        createdBy: userId,
        updatedBy: userId,
      },
      select: {
        id: true,
        name: true,
        website: true,
        industry: true,
        location: true,
        trackingEnabled: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      data: competitor,
      message: 'Competitor created successfully',
    });
  } catch (error) {
    console.error('Database create error:', error);
    return res.status(500).json({ error: 'Failed to create competitor' });
  }
}

// PUT: Update existing competitor
async function handlePut(
  req: NextApiRequest,
  res: NextApiResponse,
  tenantId: string,
  userId: string,
  userRole: string
) {
  // Check permissions
  if (userRole !== 'admin' && userRole !== 'manager') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Competitor ID is required' });
  }

  // Validate request body
  const bodyResult = CompetitorUpdateSchema.safeParse(req.body);
  if (!bodyResult.success) {
    return res.status(400).json({
      error: 'Invalid request data',
      details: bodyResult.error.errors,
    });
  }

  const updateData = bodyResult.data;

  try {
    // Find competitor with tenant isolation
    const existingCompetitor = await prisma.competitor.findFirst({
      where: {
        id,
        tenantId, // CRITICAL: Tenant isolation
        deletedAt: null,
      },
    });

    if (!existingCompetitor) {
      return res.status(404).json({ error: 'Competitor not found' });
    }

    // Update competitor
    const updatedCompetitor = await prisma.competitor.update({
      where: { id },
      data: {
        ...updateData,
        updatedBy: userId,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        website: true,
        industry: true,
        location: true,
        trackingEnabled: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      data: updatedCompetitor,
      message: 'Competitor updated successfully',
    });
  } catch (error) {
    console.error('Database update error:', error);
    return res.status(500).json({ error: 'Failed to update competitor' });
  }
}

// DELETE: Soft delete competitor
async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  tenantId: string,
  userId: string,
  userRole: string
) {
  // Check permissions (only admins can delete)
  if (userRole !== 'admin') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Competitor ID is required' });
  }

  try {
    // Find competitor with tenant isolation
    const existingCompetitor = await prisma.competitor.findFirst({
      where: {
        id,
        tenantId, // CRITICAL: Tenant isolation
        deletedAt: null,
      },
    });

    if (!existingCompetitor) {
      return res.status(404).json({ error: 'Competitor not found' });
    }

    // Soft delete competitor
    await prisma.competitor.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedBy: userId,
      },
    });

    return res.status(200).json({
      message: 'Competitor deleted successfully',
    });
  } catch (error) {
    console.error('Database delete error:', error);
    return res.status(500).json({ error: 'Failed to delete competitor' });
  }
}
