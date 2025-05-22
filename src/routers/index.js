import express from 'express';
import clientesController from '../controllers/clientes-controller.js';
import usuarioController from '../controllers/usuario-controller.js';
import titleController from '../controllers/titulos-controller.js'

const router = express.Router();
router.use('/clientes', clientesController);
router.use('/titulos', titleController);
router.use('/usuarios', usuarioController);


export default router; 