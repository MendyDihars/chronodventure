import { Character } from '../data/db';

export default class CharacterDriver {
    static getCharacters() {
        return new Promise((resolve, reject) => {
            Character.find({}, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    static updateCharacter(id, character) {
        return new Promise((resolve, reject) => {
            Character.findByIdAndUpdate(id, character, (err, characterColl) => {
                if (err) reject(err);
                resolve(characterColl);
            })
        })
    }
}