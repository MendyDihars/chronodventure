import { Event } from '../data/db';

export default class EventDriver {
    static getEvents() {
        return new Promise((resolve, reject) => {
            Event.find({}, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}