import express from 'express';
import adminController from '../controllers/adminController.js';
import protectedUser from '../middlewares/protectedUser.js';

const rotasProtegidas = express.Router();

// GET Rotas protegidas
rotasProtegidas.get('/dashboard', protectedUser.defender, adminController.adminDashboard);

// POST Rota de criação de uma categoria
rotasProtegidas.post("/dashboard/new_category", protectedUser.defender, productController.createCategory);

// PUT Rota de edição de uma categoria
rotasProtegidas.put("/dashboard/edit_category/:id", protectedUser.defender, productController.editCategory);

// DELETE Rota de deletar uma categoria
rotasProtegidas.delete("/dashboard/delete_category/:id", protectedUser.defender, productController.deleteCategory);

// POST Rota de criação de um produto
rotasProtegidas.post("/dashboard/new_product", protectedUser.defender, productController.createProduct);

// PUT Rota de edição de um produto
rotasProtegidas.put("/dashboard/edit_product/:id", protectedUser.defender, productController.editProduct);

// DELETE Rota de deletar um produto
rotasProtegidas.delete("/dashboard/delete_product/:id", protectedUser.defender, productController.deleteProduct);

// GET Rota de listagem dos produtos
rotasProtegidas.get("/dashboard/products", protectedUser.defender, productController.getProducts);

export default rotasProtegidas;