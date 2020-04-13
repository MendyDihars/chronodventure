import { Schema } from 'mongoose';

const initEvent = mongoose => {
    const eventSchema = new mongoose.Schema({
        name: String,
        position: Number,
        stories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Story'
            }
        ]
    })
    return mongoose.model('Event', eventSchema)
}

export default initEvent;