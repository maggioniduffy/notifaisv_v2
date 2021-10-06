import mongoose from 'mongoose'

const trabajoSchema = mongoose.Schema({
    title: String,
    link: String,
    id: String,
    addedAt: {
        type: Date,
        default: new Date()
    }
})

const Trabajo = mongoose.model('Trabajo', trabajoSchema);

export default Trabajo;