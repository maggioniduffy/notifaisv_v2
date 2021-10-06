import mongoose from 'mongoose'

const noticiaSchema = mongoose.Schema({
    title: String,
    link: String,
    id: String,
    addedAt: {
        type: Date,
        default: new Date()
    }
})

const Noticia = mongoose.model('Noticia', noticiaSchema);

export default Noticia;