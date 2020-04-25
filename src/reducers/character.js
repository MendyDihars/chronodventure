import * as CharacterConstants from '../constants/character';

const initialState = {
    characters: []
}

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case CharacterConstants.UPDATE_CHARACTER_REQUEST:
        case CharacterConstants.FETCH_CHARACTERS_REQUEST:
            return { ...state, chLoading: true }
        case CharacterConstants.FETCH_CHARACTERS_SUCCESS:
            return { ...state, characters: action.data, chLoading: false }
        case CharacterConstants.UPDATE_CHARACTER_SUCCESS:
            return { ...state, characters: [ ...state.characters, action.data ], chLoading: false }
        case CharacterConstants.UPDATE_CHARACTER_FAILURE:
        case CharacterConstants.FETCH_CHARACTERS_FAILURE:
            return { ...state, error: action.err, chLoading: false }
        default: 
            return state;
    }
}

export default characterReducer;
