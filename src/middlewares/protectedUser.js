import jwt from 'jsonwebtoken';
import "dotenv/config";

const protectedUser = {
    defender: (req, res, next) => {
        try {
            const authHeader = req.headers['authorization']
            if (!authHeader) {
                return res.status(401).json({ message: 'Token not provided.' });
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided.' });
            }
            const decoded = jwt.verify(token, process.env.SECRETKEY);
            req.user = decoded;
            if (!req.user) {
                return res.status(401).json({ message: 'Token inválido' });
            }           
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Tempo de acesso expirado!' });
        }
    }
};

export default protectedUser;
