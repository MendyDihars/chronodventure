export default class CharacterService {
    static getCharacters() {
        return new Promise((resolve, reject) => {
            fetch('/api/characters')
                .then(res => res.json())
                .then(characters => resolve(characters))
                .catch(err => reject(err));
        })
    }
}