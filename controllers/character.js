import { Character } from '../data/db';

export default class CharacterController {
    static getCharacters() {
        return new Promise((resolve, reject) => {
            Character.find({}, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}