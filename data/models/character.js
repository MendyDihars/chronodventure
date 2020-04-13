import { Schema } from 'mongoose';

const initCharacter = mongoose => {
    const characterSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        klass: String,
        stories: [
            {
                description: String,
                event: {
                    type: Schema.Types.ObjectId,
                    ref: 'Event'
                }
            }
        ]
    })
    return mongoose.model('Character', characterSchema)
}

export default initCharacter;