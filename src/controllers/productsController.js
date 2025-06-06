import { v4 as uuid } from 'uuid';
import categoryes from '../models/categoryes.js';

function categoryExists(categoria) {
    return categoryes.myProducts.find(product => product.nome === categoria);
}

const productsController = {
    getProducts: (req, res) => {
        const { id } = req.params;
        const categoryIndex = categoryes.findIndex(category => category.id === id);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const category = categoryes[categoryIndex];

        const productBox = categoryes[categoryIndex].myProducts
        return res.status(200).json(productBox);
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
        const { categoria } = req.body;

        if (!categoria) {
            return res.status(400).json({ message: 'Preencha o campo corretamente!' });
        }

        const categoryIndex = categoryes.findIndex(category => category.id === id);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        categoryes[categoryIndex].nome = categoria;
        categoryes[categoryIndex].myProducts = categoryes[categoryIndex].myProducts.map(product => ({
            ...product,
            categoria
        }));

        return res.status(200).json({
            message: 'Categoria atualizada com sucesso!',
            updatedCategory: categoryes[categoryIndex]
        });
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
        return res.status(201).json({ message: `Product ${newProduct.nome} created successfully` });
    },

    editProduct: (req, res) => {
        const { idProduct } = req.params;
        const { imagem, nome, informacao, preco } = req.body;

        if (!nome || !informacao || !preco) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let found = false;
        for (let category of categoryes) {
            const productIndex = category.myProducts.findIndex(product => product.id === idProduct);
            if (productIndex !== -1) {
                const updatedProduct = {
                    ...category.myProducts[productIndex],
                    imagem,
                    nome,
                    informacao,
                    preco
                };
                category.myProducts[productIndex] = updatedProduct;
                found = true;
                return res.status(200).json({ message: 'Produto atualizado com sucesso!', updatedProduct });
            }
        }

        if (!found) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }
    },

    getProductById: (req, res) => {
        const { id, idProduct } = req.params;

        const category = categoryes.find(category => category.id === id);
        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        const product = category.myProducts.find(product => product.id === idProduct);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        return res.status(200).json(product);
    },

    deleteProduct: (req, res) => {
        const { id, idDelete } = req.params;

        const categoryIndex = categoryes.findIndex(category => category.id === id);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Categoria não encontrada!' });
        }

        const productIndex = categoryes[categoryIndex].myProducts.findIndex(product => product.id === idDelete);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }
        categoryes[categoryIndex].myProducts.splice(productIndex, 1);
        res.status(200).json({ message: 'Produto excluído com sucesso!' });
    }
}

export default productsController;