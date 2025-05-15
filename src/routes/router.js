import express from 'express';
import adminController from '../controllers/adminController.js';
import protectedUser from '../middlewares/protectedUser.js';
import productsController from '../controllers/productsController.js';

const route = express.Router();

// GET Rotas login
route.post('/login', adminController.authUser);

// GET Rota dashboard
route.get('/dashboard', protectedUser.defender, adminController.adminDashboard);

// GET Rota de listagem de categorias
route.get('/dashboard/categories', protectedUser.defender, productsController.getCategory);

// POST Rota de criação de uma categoria
route.post("/dashboard/new_category", protectedUser.defender, productsController.createCategory);

// PUT Rota de edição de uma categoria
route.put("/dashboard/edit_category/:id", protectedUser.defender, productsController.editCategory);

// DELETE Rota de deletar uma categoria
route.delete("/dashboard/delete_category/:id", protectedUser.defender, productsController.deleteCategory);

// POST Rota de criação de um produto
route.post("/dashboard/new_product", protectedUser.defender, productsController.createProduct);

// GET Rota de listagem de um produto
route.get("/dashboard/view_categories/:id/:idProduct", protectedUser.defender, productsController.getProductById);

// PUT Rota de edição de um produto
route.put("/dashboard/view_categories/:id/:idProduct/update", protectedUser.defender, productsController.editProduct);

// DELETE Rota de deletar um produto
route.delete("/dashboard/view_categories/:id/:idDelete", protectedUser.defender, productsController.deleteProduct);

// GET Rota de listagem dos produtos
route.get("/dashboard/view_categories/:id", protectedUser.defender, productsController.getProducts);

export default route;
