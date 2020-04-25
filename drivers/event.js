import { Event, Character } from '../data/db';

export default class EventDriver {
    static async eventAlimentation(events) {
        try {
            let eventsFiltered = events.filter(ev => ev.position >= event.position);
            for (let el of eventsFiltered) {
                el.position++;
                await el.save();
            }
            let ev = await Event.create(event);
            let charas = await Character.find({});
            for (let ch of charas) {
                let story = {
                    description: '',
                    event: ev._id
                }
                ch.stories.push(story)
                await ch.save();
                let id = ch.stories[ch.stories.length - 1]._id
                ev.stories.push(id);
                await ev.save();
            }
            return await this.getEvents();
        } catch (err) { reject(err); }
    }

    static getEvents() {
        return new Promise((resolve, reject) => {
            Event.find({}).sort({ position: 1 }).exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    static createEvent(event) {
        return new Promise((resolve, reject) => {
            this.getEvents()
                .then(this.eventAlimentation)
                .then(resolve)
                .catch(reject)
        })
    }
}