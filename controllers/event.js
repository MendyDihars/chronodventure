import { Event } from '../data/db';

export default class EventController {
    static getEvents() {
        return new Promise((resolve, reject) => {
            Event.find({}, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}