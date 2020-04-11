import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import initCharacter from './models/character';

mongoose.connect(process.env.MONGO_URI);

const Character = initCharacter(mongoose)


export {
    mongoose,
    Character
};