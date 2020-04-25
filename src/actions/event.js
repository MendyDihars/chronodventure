import * as EventConstants from '../constants/event';
import EventService from '../services/event';

export const fetchEvents = () => {
    const request = () => ({ type: EventConstants.FECTH_EVENTS_REQUEST })
    const success = data => ({ type: EventConstants.FECTH_EVENTS_SUCCESS, data: data })
    const failure = err => ({ type: EventConstants.FECTH_EVENTS_FAILURE, err: err })

    return async dispatch => {
        dispatch(request());
        try {
            const events = await EventService.getEvents();
            dispatch(success(events));
        } catch (err) {
            dispatch(failure(err));
        }
    }
}

export const addEvent = event => {
    const request = () => ({ type: EventConstants.ADD_EVENTS_REQUEST })
    const success = data => ({ type: EventConstants.ADD_EVENTS_SUCCESS, data: data })
    const failure = err => ({ type: EventConstants.ADD_EVENTS_FAILURE, err: err })

    return async dispatch => {
        dispatch(request());
        try {
            const events = await EventService.createEvent(event);
            dispatch(success(events));
        } catch (err) {
            dispatch(failure(err))
        }
    }
}