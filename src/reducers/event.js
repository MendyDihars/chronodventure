import * as EventConstants from '../constants/event';

const initialState = {
    events: []
}

const Event = (state = initialState, action) => {
    switch (action.type) {
        case EventConstants.FECTH_EVENTS_REQUEST:
            return { ...state, loading: true };
        case EventConstants.FECTH_EVENTS_SUCCESS:
            return { ...state, events: action.data, loading: false };
        case EventConstants.FECTH_EVENTS_FAILURE:
            return { ...state, err: action.err, loading: false };
        default:
            return state;
    }
}

export default Event;