import path from 'path';
import CharacterService from '../../services/character';

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

        app.get('/api/characters', async (req, res) => {
            try {
                const characters = await CharacterService.getCharacters();
                res.send(characters);
            } catch (err) {
                throw new Error(err);
            }
        })
    }
}