export default class EventService {
    static getEvents() {
        return new Promise((resolve, reject) => {
            fetch('/api/events')
                .then(res => res.json())
                .then(resolve)
                .catch(reject)
        })
    }
}