import express from 'express';
import {
  getAllDados,
  getDadoById,
  createDado,
  updateDado,
  deleteDado,
  login,
} from '../controllers/controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/', getAllDados);
router.get('/:id', getDadoById);
router.post('/', createDado);
router.put('/:id', authenticateToken, updateDado);
router.delete('/:id', authenticateToken, deleteDado);

export { router };
