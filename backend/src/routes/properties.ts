import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { protect, authorize, AuthRequest } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// Validation schemas
const createPropertySchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  purchasePrice: z.number().positive(),
  acquisitionDate: z.string().datetime(),
  currentMarketValue: z.number().positive(),
  size: z.number().positive(),
  numberOfRooms: z.number().int().positive(),
  amenities: z.array(z.string()),
  ownershipShare: z.number().min(0).max(100)
});

const updatePropertySchema = createPropertySchema.partial();

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties for the authenticated user
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Properties retrieved successfully
 */
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: { userId: req.user!.id },
      include: {
        tenants: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            status: true
          }
        },
        loans: true,
        _count: {
          select: {
            transactions: true,
            maintenanceEvents: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({
      success: true,
      data: properties
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get a specific property by ID
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property retrieved successfully
 *       404:
 *         description: Property not found
 */
router.get('/:id', protect, async (req: AuthRequest, res) => {
  try {
    const property = await prisma.property.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      },
      include: {
        tenants: {
          include: {
            rentPayments: {
              orderBy: { dueDate: 'desc' },
              take: 10
            }
          }
        },
        loans: true,
        transactions: {
          orderBy: { date: 'desc' },
          take: 20
        },
        maintenanceEvents: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        documents: {
          orderBy: { uploadDate: 'desc' },
          take: 10
        }
      }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    return res.json({
      success: true,
      data: property
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - purchasePrice
 *               - acquisitionDate
 *               - currentMarketValue
 *               - size
 *               - numberOfRooms
 *               - amenities
 *               - ownershipShare
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               purchasePrice:
 *                 type: number
 *               acquisitionDate:
 *                 type: string
 *                 format: date-time
 *               currentMarketValue:
 *                 type: number
 *               size:
 *                 type: number
 *               numberOfRooms:
 *                 type: integer
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               ownershipShare:
 *                 type: number
 *     responses:
 *       201:
 *         description: Property created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', protect, authorize(UserRole.OWNER, UserRole.MANAGER), async (req: AuthRequest, res) => {
  try {
    const propertyData = createPropertySchema.parse(req.body);

    const property = await prisma.property.create({
      data: {
        ...propertyData,
        userId: req.user!.id
      },
      include: {
        tenants: true,
        loans: true
      }
    });

    return res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               purchasePrice:
 *                 type: number
 *               acquisitionDate:
 *                 type: string
 *                 format: date-time
 *               currentMarketValue:
 *                 type: number
 *               size:
 *                 type: number
 *               numberOfRooms:
 *                 type: integer
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               ownershipShare:
 *                 type: number
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       404:
 *         description: Property not found
 */
router.put('/:id', protect, authorize(UserRole.OWNER, UserRole.MANAGER), async (req: AuthRequest, res) => {
  try {
    const propertyData = updatePropertySchema.parse(req.body);

    // Check if property exists and belongs to user
    const existingProperty = await prisma.property.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Managers cannot update ownership details
    if (req.user!.role === UserRole.MANAGER) {
      delete propertyData.purchasePrice;
      delete propertyData.ownershipShare;
      delete propertyData.currentMarketValue;
    }

    const property = await prisma.property.update({
      where: { id: req.params.id },
      data: propertyData,
      include: {
        tenants: true,
        loans: true
      }
    });

    return res.json({
      success: true,
      data: property
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       404:
 *         description: Property not found
 */
router.delete('/:id', protect, authorize(UserRole.OWNER), async (req: AuthRequest, res) => {
  try {
    const property = await prisma.property.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    await prisma.property.delete({
      where: { id: req.params.id }
    });

    return res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export { router as propertyRoutes }; 