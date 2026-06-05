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
        const { title, type, start_date, end_date, grade, comment } = req.body;
        if(!title || !type || !start_date || !end_date || grade === undefined){
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if(Number.parseFloat(grade) < 0 || Number.parseFloat(grade) > 10){
            return res.status(400).json({ error: 'Grade must be between 0 and 10' });
        }
        const uuid = uuidv7();
        const data = await getData();
        data.push({ id: uuid, title, type, start_date, end_date, grade, comment });
        await saveData(data);
        res.status(201).json({ message: 'Data saved successfully' });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong to save data' });
    }
})
routes.put('/:id',async (req,res)=>{
    try{
        const { title, type, start_date, end_date, grade, comment } = req.body;
        const { id } = req.params;
        if(Number.parseFloat(grade) < 0 || Number.parseFloat(grade)  > 10){
            return res.status(400).json({ error: 'Grade must be between 0 and 10' });
        }
        const data = await getData();
        const index = data.findIndex(item => item.id === id);
        if(index !== -1){
            data[index] = { ...data[index], title, type, start_date, end_date, grade, comment };
            await saveData(data);
            res.status(200).json({ message: 'Data updated successfully' });
        }else{
            res.status(404).json({ error: 'Item not found' });
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong to update data' });
    }
})
routes.delete('/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const data = await getData();
        const filteredData = data.filter(item => item.id !== id);
        await saveData(filteredData);
        res.status(204).json({ message: 'Data deleted successfully' });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong to delete data' });
    }
})




export default routes;