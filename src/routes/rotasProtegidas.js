import express from 'express';
import adminController from '../controllers/adminController.js';
import protectedUser from '../middlewares/protectedUser.js';

const rotasProtegidas = express.Router();

rotasProtegidas.post('/login', adminController.authUser);
rotasProtegidas.get('/dashboard', protectedUser.defender, adminController.adminDashboard);

export default rotasProtegidas;