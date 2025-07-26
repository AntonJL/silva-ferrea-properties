import { Router } from 'express';

const router = Router();

// TODO: Implement dashboard routes
router.get('/', (req, res) => {
  res.json({ message: 'Dashboard routes - to be implemented' });
});

export { router as dashboardRoutes }; 