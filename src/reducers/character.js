import * as CharacterConstants from '../constants/character';

const initialState = {
    characters: []
}

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case CharacterConstants.FETCH_CHARACTERS_REQUEST:
            return { ...state, loading: true }
        case CharacterConstants.FETCH_CHARACTERS_SUCCESS:
            return { ...state, characters: action.data, loading: false }
        case CharacterConstants.FETCH_CHARACTERS_FAILURE:
            return { ...state, error: action.err, loading: false }
        default: 
            return state;
    }
}

export default characterReducer;
