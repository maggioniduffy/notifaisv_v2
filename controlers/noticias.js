import { NoticiaSchema } from '../models/index.js';

export const getNoticias = async () => {
    try {
        const noticias = await NoticiaSchema.find().sort({x:-1});;
        return noticias.slice(0,6);
    } catch (error) {
        console.log(error);
    }
}

export const addNoticias = async (noticias) => {
    noticias.forEach( async (noticia) => {
        const newNoticia = new NoticiaSchema({ ...noticia, addedAt: new Date().toISOString()})
        try {
            await newNoticia.save();
            console.log("NEW Noticia ok")
        } catch (error) {
            console.log(error)
        }
    })
}

