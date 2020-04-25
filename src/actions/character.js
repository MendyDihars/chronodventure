import * as CharacterConstants from '../constants/character';
import CharacterService from '../services/character';

export const fetchCharacters = () => {
    const request = () => ({ type: CharacterConstants.FETCH_CHARACTERS_REQUEST })
    const failure = err => ({ type: CharacterConstants.FETCH_CHARACTERS_FAILURE, err: err })
    const success = data => ({ type: CharacterConstants.FETCH_CHARACTERS_SUCCESS, data: data })

    return async dispatch => {
        dispatch(request());

        try {
            const characters = await CharacterService.getCharacters();
            dispatch(success(characters))
        } catch (err) {
            dispatch(failure(err));
        }
    }
}

export const updateCharacter = character => {
    const request = () => ({ type: CharacterConstants.UPDATE_CHARACTER_REQUEST })
    const failure = err => ({ type: CharacterConstants.UPDATE_CHARACTER_FAILURE, err: err })
    const success = data => ({ type: CharacterConstants.UPDATE_CHARACTER_SUCCESS, data: data })

    return async dispatch => {
        dispatch(request());

        try {
            let data = await CharacterService.updateCharacter(character);
            dispatch(success(data))
        } catch (err) {
            dispatch(failure(err))
        }
    }
}