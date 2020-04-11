import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button';

class App extends Component {
    // static propTypes = {

    // }

    render() {
        return (
            <Button>
                Valider
            </Button>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))