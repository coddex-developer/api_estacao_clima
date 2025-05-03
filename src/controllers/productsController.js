import { v4 as uuid } from 'uuid';
import categoryes from '../models/categoryes.js';

function categoryExists(categoria) {
    return categoryes.myProducts.find(product => product.nome === categoria);
}

const productsController = {
    getProducts: (req, res) => {
        const { categoria } = req.query;
        if (categoria) {
            const filteredProducts = categoryes.myProducts.filter(product => product.categoria === categoria);
            return res.status(200).json(filteredProducts);
        }
        return res.status(200).json(categoryes.myProducts);
    },

    getCategory: (req, res) => {

        return res.status(200).json(categoryes);
    },

    createCategory: (req, res) => {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ message: 'Category name is required' });
        }
        const existingCategory = categoryes.find(category => category.nome === nome);
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        const newCategory = { id: uuid(), nome, myProducts: [] };
        categoryes.push(newCategory);
        return res.status(201).json({ message: "Categoria criada com sucesso!", newCategory });
    },

    editCategory: (req, res) => {
        const { id } = req.params;
        const { nome } = req.body;
        const categoryIndex = categoryes.findIndex(category => category.id === id);
        if (!nome) {
            return res.status(400).json({ message: 'Category name is required' });
        }
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const updatedCategory = { ...categoryes[categoryIndex], nome };
        categoryes[categoryIndex] = updatedCategory;
        return res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    },

    deleteCategory: (req, res) => {
        const { id } = req.params;
        const categoryIndex = categoryes.findIndex(category => category.id === id);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }
        categoryes.splice(categoryIndex, 1);
        return res.status(200).json({ message: 'Category deleted successfully' });
    },

    createProduct: (req, res) => {
        const { categoria, imagem, nome, informacao, preco } = req.body;

        if (!categoria || !nome || !informacao || !preco) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const categoryIndex = categoryes.findIndex(category => category.nome == categoria);

        if (categoryIndex === -1) {
            return res.status(404).json({ message: `Category ${categoria} not found!` });
        }

        const category = categoryes[categoryIndex];
        const newProduct = { id: uuid(), categoria, imagem, nome, informacao, preco };

        category.myProducts.push(newProduct);
        return res.status(201).json({ message: `Product ${newProduct.nome} created successfully`});
    },

    editProduct: (req, res) => {
        const { id } = req.params;
        const { categoria, imagem, nome, informacao, preco } = req.body;

        if (!categoria || !nome || !informacao || !preco) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const productIndex = myProducts.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = { ...myProducts[productIndex], categoria, imagem, nome, informacao, preco };
        myProducts[productIndex] = updatedProduct;

        const categoryIndex = categoryes.findIndex(category => category.nome === categoria);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const category = categoryes[categoryIndex];
        const productInCategoryIndex = category.myProducts.findIndex(product => product.id === id);

        if (productInCategoryIndex !== -1) {
            category.myProducts[productInCategoryIndex] = updatedProduct;
        } else {
            return res.status(404).json({ message: 'Product not found in category' });
        }

        return res.status(200).json({ message: 'Product updated successfully', updatedProduct });

    },

    deleteProduct: (req, res) => {
        const { id } = req.params;
        const productIndex = myProducts.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const deletedProduct = myProducts[productIndex];
        myProducts.splice(productIndex, 1);
        const categoryIndex = categoryes.findIndex(category => category.nome === deletedProduct.categoria);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const category = categoryes[categoryIndex];
        const productInCategoryIndex = category.myProducts.findIndex(product => product.id === id);
        if (productInCategoryIndex !== -1) {
            category.myProducts.splice(productInCategoryIndex, 1);
        } else {
            return res.status(404).json({ message: 'Product not found in category' });
        }
        return res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    }
}

export default productsController;