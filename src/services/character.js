export default class CharacterService {
    static getCharacters() {
        return new Promise((resolve, reject) => {
            fetch('/api/characters')
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        })
    }

    static updateCharacter(character) {
        return new Promise((resolve, reject) => {
            fetch('/api/characters/' + character._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(character)
            })
            .then(res => res.json())
            .then(resolve)
            .catch(reject)
        })
    }
}