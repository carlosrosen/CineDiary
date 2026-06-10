import fs from 'fs/promises';


const JSONPATH = 'database.json';

export async function getData() {
    try{
        const data = await fs.readFile(JSONPATH,'utf-8');
        if(!data){
            throw new Error('arquivo vazio');
        }
        return JSON.parse(data);
    }catch(err){
        if(err.code === 'ENOENT' || err.message === 'arquivo vazio'){
            const fp = await fs.open(JSONPATH,'w');
            await fp.writeFile('[]');
            await fp.close();
            return JSON.parse('[]')
        }else{
            console.error(err);
            throw new Error('Something went wrong to get data');
        }
    }
}

export async function saveData(json_object) {
    try{
        await fs.writeFile(JSONPATH,JSON.stringify(json_object))
    }catch(err){
        if(err.code === 'ENOENT'){
            const fp = await fs.open(JSONPATH,'w');
            await fp.writeFile('[]');
            await fp.close();
            return JSON.parse('[]')
        }else{
            console.error(err);
            throw new Error('Something went wrong to save data');
        }
    }
}