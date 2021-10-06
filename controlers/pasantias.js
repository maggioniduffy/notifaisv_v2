import { PasantiaSchema } from '../models/index.js';

export const getPasantias = async () => {
    try {
        const pasantias = await PasantiaSchema.find().sort({x:-1});;
        return pasantias.slice(0,6);
    } catch (error) {
        console.log(error);
    }
}

export const addPasantias = async (pasantias) => {
    pasantias.forEach( async (pasantia) => {
        const newPasantia = new PasantiaSchema({ ...pasantia, addedAt: new Date().toISOString()})
        try {
            await newPasantia.save();
            console.log("NEW Noticia ok")
        } catch (error) {
            console.log(error)
        }
    })
}