import express from 'express';
import routes from './routes.js';

const PORT = 3000;
const app = express();

app.use(express.json())


app.use('/api',routes);

app.listen(PORT,()=>{
    console.log(`Esta rodando na porta ${PORT}`)
})