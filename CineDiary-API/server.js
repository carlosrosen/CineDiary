import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json())

app.use('/api',routes);

app.listen(PORT,()=>{
    console.log(`Esta rodando na porta ${PORT}`)
})
