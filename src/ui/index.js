import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';
import router from '../../routes/ui';
import App from './views/App'

const renderApp = async location => {
    const Page = await router.resolve(location);
    ReactDOM.render(
        <App>
            <Page />
        </App>,
        document.getElementById('root')
    )
}

renderApp(history.location);
history.listen(renderApp);