import { TrabajoSchema } from '../models/index.js';

export const getTrabajos = async () => {
    try {
        const trabajos = await TrabajoSchema.find().sort({x:-1});;
        return trabajos.slice(0,6);
    } catch (error) {
        console.log(error);
    }
}

export const addTrabajos = async (trabajos) => {
    trabajos.forEach( async (trabajo) => {
        const newTrabajo = new TrabajoSchema({ ...trabajo, addedAt: new Date().toISOString()})
        try {
            await newTrabajo.save();
            console.log("NEW Noticia ok")
        } catch (error) {
            console.log(error)
        }
    })
}