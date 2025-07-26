import { Router } from 'express';

const router = Router();

// TODO: Implement transaction routes
router.get('/', (req, res) => {
  res.json({ message: 'Transactions routes - to be implemented' });
});

export { router as transactionRoutes }; 