import UniversalRouter from 'universal-router';

// Components
import Home from '../../src/ui/views/Home'
import Test from '../../src/ui/views/Test'

const routes = [
    {
        path: '/',
        action: () => Home
    },
    {
        path: '/test',
        action: () => Test
    }
]

const router = new UniversalRouter(routes);

export default router; 
