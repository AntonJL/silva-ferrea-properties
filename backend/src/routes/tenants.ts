import { Router } from 'express';

const router = Router();

// TODO: Implement tenant routes
router.get('/', (req, res) => {
  res.json({ message: 'Tenants routes - to be implemented' });
});

export { router as tenantRoutes }; 