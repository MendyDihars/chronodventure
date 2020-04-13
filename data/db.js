import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import initCharacter from './models/character';
import initEvent from './models/event';

mongoose.connect(process.env.MONGO_URI);


const Character = initCharacter(mongoose)
const Event     = initEvent(mongoose);

export {
    mongoose,
    Character,
    Event
};