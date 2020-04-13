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