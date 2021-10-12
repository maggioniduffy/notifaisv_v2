import { promisify } from 'util';
const NOTICIAS_KEY = 'NOTICIAS';

export const getNoticias = async (client) => {
    const getAsync = promisify(client.smembers).bind(client);  
    try {
        console.log("get noticias")
        /*client.smembers(NOTICIAS_KEY,function(err, items) {
            if(err){
                throw err;
            }
            const res = items.map((item) => (
                JSON.parse(item)
            ))
            console.log(res)
            return res;
        });*/
        const data = await getAsync(NOTICIAS_KEY);
        const res = data.map(item => (
            JSON.parse(item)
        ));
        console.log('res: ', res)
    } catch (error) {
        console.log(error);
    }
}

export const addNoticias = async (noticias, client) => {
    client.del(NOTICIAS_KEY);
    noticias.forEach((noticia) => {
        client.sadd(NOTICIAS_KEY, JSON.stringify(noticia));
    })
}

