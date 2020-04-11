import path from 'path';

export default class Router {
    constructor(app) {
        this.app = app;
        this._initRoutes();
    }

    _initRoutes() {
        const { app } = this;
        app.get('/', (req, res) => {
            res.sendFile(path.resolve('public', 'index.html'))
        })
    }
}