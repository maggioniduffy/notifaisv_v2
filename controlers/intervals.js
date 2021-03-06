import { io } from '../index.js';
import { add } from './index.js';
import { fetch } from '../scrappers/faiweb/index.js';
import { sources } from '../constants/constants.js';

export async function intervals(){
    setInterval(async () => {
        try {
            sources.forEach(async (s) => {
                await handleUpdate(s.url, s.type, s.key);
            })
        } catch (error) {
            console.log(error);
        }
    }, 1000 * 60 * 60);
}

async function handleUpdate(url, type, key){
    try { 
        const data = await fetch(url);
        const last_data = get(key);
        for( i in data){
            //comparar para ver que actualizar y que emitir
        }
        await add(data, key);
        io.emit(type, data);
    } catch (error) {
        console.log(error)
    }
}