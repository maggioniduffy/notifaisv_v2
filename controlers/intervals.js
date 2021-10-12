import { fetchNoticias, fetchPasantias, fetchTrabajos } from '../scrappers/faiweb/index.js';
import { addNoticias } from './noticias.js';
import { addPasantias } from './pasantias.js';
import { addTrabajos } from './trabajos.js';

export function intervals(io, client){
    setInterval(async () => {
        try { 
            handleUpdate(fetchNoticias,addNoticias,'noticias',io, client);
            //handleUpdate(fetchPasantias,addPasantias,'pasantias',io);
            //handleUpdate(fetchTrabajos,addTrabajos,'trabajos',io);
        } catch (error) {
            console.log(error);
        }
    }, 1000 * 3)
}

async function handleUpdate(fetch, add, type, io, client){
    try { 
        const data = await fetch();
        await add(data, client);
        io.emit(type, data);
    } catch (error) {
        console.log(error)
    }
}