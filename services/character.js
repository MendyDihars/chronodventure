import { Character } from '../data/db';

export default class CharacterService {
    static getCharacters() {
        return new Promise((resolve, reject) => {
            Character.find((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}