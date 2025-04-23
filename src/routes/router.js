import express from 'express';
import adminController from '../controllers/adminController.js';
import protectedUser from '../middlewares/protectedUser.js';
import productsController from '../controllers/productsController.js';

const route = express.Router();

// GET Rotas login
route.post('/login', adminController.authUser);

// GET Rota dashboard
route.get('/dashboard', protectedUser.defender, adminController.adminDashboard);

// POST Rota de criação de uma categoria
route.post("/dashboard/new_category", protectedUser.defender, productsController.createCategory);

// PUT Rota de edição de uma categoria
route.put("/dashboard/edit_category/:id", protectedUser.defender, productsController.editCategory);

// DELETE Rota de deletar uma categoria
route.delete("/dashboard/delete_category/:id", protectedUser.defender, productsController.deleteCategory);

// POST Rota de criação de um produto
route.post("/dashboard/new_product", protectedUser.defender, productsController.createProduct);

// PUT Rota de edição de um produto
route.put("/dashboard/edit_product/:id", protectedUser.defender, productsController.editProduct);

// DELETE Rota de deletar um produto
route.delete("/dashboard/delete_product/:id", protectedUser.defender, productsController.deleteProduct);

// GET Rota de listagem dos produtos
route.get("/dashboard/products", protectedUser.defender, productsController.getProducts);

export default route;