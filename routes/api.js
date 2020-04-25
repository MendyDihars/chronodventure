import path from 'path';
import CharacterDriver from '../drivers/character';
import EventDriver from '../drivers/event';
import asyncHandler from 'express-async-handler';

export default class Router {
    constructor(app) {
        this.app = app;
        this._handleUniversalRouter()
        this._initRoutes();
    }

    _handleUniversalRouter() {
        this.app.use((req, res, next) => {
            if (req.url === '/' || req.url.includes('/api')) { next() }
            else { this._renderApp(res); }
        })
    }

    _renderApp(res) {
        res.sendFile(path.resolve('public', 'index.html'))
    }

    _initRoutes() {
        const { app } = this;

        // ROUTES
        app.get('/', (req, res) => {
            this._renderApp(res)
        })

        // CHARACTERS
        app.get('/api/characters', asyncHandler(async (req, res) => {
            const characters = await CharacterDriver.getCharacters();
            res.send(characters);
        }))

        // EVENTS
        app.get('/api/events', asyncHandler(async (req, res) => {
            const events = await EventDriver.getEvents();
            res.send(events);
        }))
    }
}