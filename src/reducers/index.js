import { combineReducers } from 'redux';
import characterReducer from './character';
import eventReducer from './event';

const reducer = combineReducers({
    Character: characterReducer,
    Event: eventReducer
})

export default reducer;