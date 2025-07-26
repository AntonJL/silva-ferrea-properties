import { Router } from 'express';

const router = Router();

// TODO: Implement maintenance routes
router.get('/', (req, res) => {
  res.json({ message: 'Maintenance routes - to be implemented' });
});

export { router as maintenanceRoutes }; 