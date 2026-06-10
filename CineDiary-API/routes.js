import { Router } from 'express';
import { uuidv7 } from 'uuidv7';

import { getData, saveData } from './db.js';

const routes = Router();

routes.get('/',async (req,res)=>{
    try{
        const data = await getData();
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Something went wrong to get data'});
    }
})
routes.post('/',async (req,res)=>{
    try{
        const { title, type, start_date, end_date, rate, comment } = req.body;
        if(!title || !type || rate === undefined){
            return res.status(400).json({ error: 'Campos obrigatórios não foram fornecidos' });
        }
        if(Number.parseFloat(rate) < 0 || Number.parseFloat(rate) > 10){
            return res.status(400).json({ error: 'Avaliação deve ser entre 0 e 10' });
        }
        if(new Date(start_date) > new Date(end_date)){
            return res.status(400).json({ error: 'Data de início deve ser anterior à data de término' });
        }
        const uuid = uuidv7();
        const data = await getData();
        data.push({ id: uuid, title, type, start_date, end_date, rate, comment });
        await saveData(data);
        res.status(201).json({ message: 'Dados foram salvos com sucesso' });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Falha interna do servidor' });
    }
})
routes.put('/:id',async (req,res)=>{
    try{
        const { title, type, start_date, end_date, rate, comment } = req.body;
        if(!title || !type || rate === undefined){
            return res.status(400).json({ error: 'Campos obrigatórios não foram fornecidos' });
        }
        const { id } = req.params;
        if(Number.parseFloat(rate) < 0 || Number.parseFloat(rate)  > 10){
            return res.status(400).json({ error: 'Avaliação deve ser entre 0 e 10' });
        }
        if(new Date(start_date) > new Date(end_date)){
            return res.status(400).json({ error: 'Data de início deve ser anterior à data de término' });
        }
        const data = await getData();
        const index = data.findIndex(item => item.id === id);
        if(index !== -1){
            data[index] = { ...data[index], title, type, start_date, end_date, rate, comment };
            await saveData(data);
            res.status(200).json({ message: 'Dados atualizados com sucesso' });
        }else{
            res.status(404).json({ error: 'Registro não encontrado' });
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Falha interna do servidor' });
    }
})
routes.delete('/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const data = await getData();
        const filteredData = data.filter(item => item.id !== id);
        await saveData(filteredData);
        res.status(204).json({ message: 'Dados excluídos com sucesso' });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Falha interna do servidor' });
    }
})




export default routes;