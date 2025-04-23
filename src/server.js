import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import rotasProtegidas from './routes/rotasProtegidas.js';
import rotasLivres from './routes/rotasLivres.js';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(rotasProtegidas);
app.use(rotasLivres);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));