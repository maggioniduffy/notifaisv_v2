import { fetchNoticias, fetchPasantias, fetchTrabajos } from '../scrappers/faiweb/index.js';
import { addNoticias } from './noticias.js';
import { addPasantias } from './pasantias.js';
import { addTrabajos } from './trabajos.js';

export function intervals(io){
    setInterval(async () => {
        try { 
            handleUpdate(fetchNoticias,addNoticias,'noticias',io);
            handleUpdate(fetchPasantias,addPasantias,'pasantias',io);
            handleUpdate(fetchTrabajos,addTrabajos,'trabajos',io);
        } catch (error) {
            console.log(error);
        }
    }, 1000 * 300)
}

function handleUpdate(fetch,add,type,io){
    const data = await fetch();
    await add(data);
    io.emit(type, data);
}