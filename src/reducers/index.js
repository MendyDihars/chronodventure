import { combineReducers } from 'redux';
import characterReducer from './character';

const reducer = combineReducers({
    Character: characterReducer
})

export default reducer;