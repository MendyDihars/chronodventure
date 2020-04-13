import { Schema } from 'mongoose';

const initCharacter = mongoose => {
    const characterSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        klass: String,
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        ]
    })
    return mongoose.model('Character', characterSchema)
}

export default initCharacter;