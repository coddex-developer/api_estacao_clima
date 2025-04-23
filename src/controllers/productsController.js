import { v4 as uuid } from 'uuid';
import myProducts from '../models/myProducts.js';



const productsController = {
    getProducts: (req, res) => {
        if (myProducts.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        return res.status(200).json(myProducts);
    },

    createCategory: (req, res) => {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ message: 'Category name is required' });
        }
        const newCategory = { id: uuid(), nome };
        myProducts.push(newCategory);
        return res.status(201).json(newCategory);
    },

    editCategory: (req, res) => {
        const { id } = req.params;
        const { nome } = req.body;
        const categoryIndex = myProducts.findIndex(category => category.id === id);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const updatedCategory = { ...myProducts[categoryIndex], nome };
        myProducts[categoryIndex] = updatedCategory;
        return res.status(200).json(updatedCategory);
    },

    deleteCategory: (req, res) => {
        const { id } = req.params;
        const categoryIndex = myProducts.findIndex(category => category.id === id);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }
        myProducts.splice(categoryIndex, 1);
        return res.status(200).json({ message: 'Category deleted successfully' });
    },

    createProduct: (req, res) => {
        const { categoria, imagem, nome, informacao, preco } = req.body;
        if (!categoria || !nome || !informacao || !preco) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newProduct = { id: uuid(), categoria, imagem, nome, informacao, preco };
        myProducts.push(newProduct);
        return res.status(201).json(newProduct);
    },

    editProduct: (req, res) => {
        const { id } = req.params;
        const { categoria, imagem, nome, informacao, preco } = req.body;
        const productIndex = myProducts.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedProduct = { ...myProducts[productIndex], categoria, imagem, nome, informacao, preco };
        myProducts[productIndex] = updatedProduct;
        return res.status(200).json(updatedProduct);
    },

    deleteProduct: (req, res) => {
        const { id } = req.params;
        const productIndex = myProducts.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }
        myProducts.splice(productIndex, 1);
        return res.status(200).json({ message: 'Product deleted successfully' });
    }
}

export default productsController;