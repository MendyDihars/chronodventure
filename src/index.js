import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducer from './reducers';
import history from './history';
import router from '../routes/ui';
import App from './views/App';


const storeMiddleware = [thunkMiddleware, loggerMiddleware]
const store = createStore(
    reducer,
    applyMiddleware(
        ...storeMiddleware
    )
)

const renderApp = async location => {
    const Page = await router.resolve(location);
    ReactDOM.render(
        <Provider store={store}>
            <App>
                <Page />
            </App>
        </Provider>,
        document.getElementById('root')
    )
}

renderApp(history.location);
history.listen(renderApp);