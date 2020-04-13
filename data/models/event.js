import { Schema } from 'mongoose';

const initEvent = mongoose => {
    const eventSchema = new mongoose.Schema({
        name: String,
        position: Number,
        characters: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Character'
            }
        ]
    })
    return mongoose.model('Event', eventSchema)
}

export default initEvent;