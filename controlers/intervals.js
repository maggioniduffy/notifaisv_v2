import { io } from '../index.js';
import { add } from './index.js';
import { fetch } from '../scrappers/faiweb/index.js';
import { 
    NOTICIAS_KEY, 
    PASANTIAS_KEY,
    TRABAJOS_KEY,
    NOTICIAS_URL,
    PASANTIAS_URL,
    TRABAJOS_URL
} from '../constants.js';

const sources = [
    {
        key: NOTICIAS_KEY,
        url: NOTICIAS_URL,
        type: 'noticias',
    },
    {
        key: PASANTIAS_KEY,
        url: PASANTIAS_URL,
        type: 'pasantias',
    },
    {
        key: TRABAJOS_KEY,
        url: TRABAJOS_URL,
        type: 'trabajos',
    }]

export function intervals(){
    setInterval(async () => {
        try {
            sources.forEach((s) => {
                handleUpdate(s.url, s.type, s.key);
            })
        } catch (error) {
            console.log(error);
        }
    }, 1000 * 3)
}

async function handleUpdate(url, type, key){
    try { 
        const data = await fetch(url);
        await add(data, key);
        io.emit(type, data);
    } catch (error) {
        console.log(error)
    }
}