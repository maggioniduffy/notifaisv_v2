import mongoose from 'mongoose'

const pasantiaSchema = mongoose.Schema({
    title: String,
    link: String,
    id: String,
    addedAt: {
        type: Date,
        default: new Date()
    }
})

const Pasantia = mongoose.model('Pasantia', pasantiaSchema);

export default Pasantia;