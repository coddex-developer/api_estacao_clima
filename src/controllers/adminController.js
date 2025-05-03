import jwt from 'jsonwebtoken';
import 'dotenv/config';

const admin = {
    userAdmin: process.env.USERADMIN,
    password: process.env.USERADMINPASSWORD
};

const adminController = {
    authUser: (req, res) => {
        const { userAdmin, password } = req.body;
        if (!userAdmin || !password) {
            return res.status(400).json({ message: 'Informe os dados corretamente!' });
        }
        if (userAdmin !== admin.userAdmin || password !== admin.password) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
        }
        const token = jwt.sign({ userAdmin }, process.env.SECRETKEY, { expiresIn: '1h' });
        return res.status(200).json({ token });
    },

    adminDashboard: (req, res) => {
        res.status(200).json({ message: 'Welcome to the admin dashboard!' });
    }
};

export default adminController;
