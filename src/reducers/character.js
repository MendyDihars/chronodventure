import * as CharacterConstants from '../constants/character';

const initialState = {
    characters: []
}

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case CharacterConstants.FETCH_CHARACTERS_REQUEST:
            return { ...state, chloading: true }
        case CharacterConstants.FETCH_CHARACTERS_SUCCESS:
            return { ...state, characters: action.data, chloading: false }
        case CharacterConstants.FETCH_CHARACTERS_FAILURE:
            return { ...state, error: action.err, chloading: false }
        default: 
            return state;
    }
}

export default characterReducer;
