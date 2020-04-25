export default class EventService {
    static getEvents() {
        return new Promise((resolve, reject) => {
            fetch('/api/events')
                .then(res => res.json())
                .then(resolve)
                .catch(reject)
        })
    }

    static createEvent(event) {
        return new Promise((resolve, reject) => {
            fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            })
            .then(res => res.json())
            .then(resolve)
            .catch(reject)
        })
    }
}