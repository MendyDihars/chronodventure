import { Event } from '../data/db';

export default class EventDriver {
    static getEvents() {
        return new Promise((resolve, reject) => {
            Event.find({}).sort({ position: 1 }).exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}