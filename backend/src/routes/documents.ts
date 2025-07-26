import { Router } from 'express';

const router = Router();

// TODO: Implement document routes
router.get('/', (req, res) => {
  res.json({ message: 'Documents routes - to be implemented' });
});

export { router as documentRoutes }; 