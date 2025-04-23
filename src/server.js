import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import route from './routes/router.js';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(route);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));