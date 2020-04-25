import * as EventConstants from '../constants/event';

const initialState = {
    events: [],
    evLoading: false
}

const Event = (state = initialState, action) => {
    switch (action.type) {
        case EventConstants.ADD_EVENTS_REQUEST:
        case EventConstants.FECTH_EVENTS_REQUEST:
            return { ...state, evLoading: true };
        case EventConstants.ADD_EVENTS_SUCCESS:
        case EventConstants.FECTH_EVENTS_SUCCESS:
            return { ...state, events: action.data, evLoading: false };
        case EventConstants.ADD_EVENTS_FAILURE:
        case EventConstants.FECTH_EVENTS_FAILURE:
            return { ...state, err: action.err, evLoading: false };
        default:
            return state;
    }
}

export default Event;