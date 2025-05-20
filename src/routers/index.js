import express from 'express';
import clientesController from '../controllers/clientes-controller.js';

const router = express.Router();
router.use('/clientes', clientesController);

export default router; 