import UniversalRouter from 'universal-router';

// Components
import Home from '../../src/views/Home'

const routes = [
    {
        path: '/',
        action: () => Home
    }
]

const router = new UniversalRouter(routes);

export default router; 
