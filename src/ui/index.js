import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class App extends Component {
    // static propTypes = {

    // }

    render() {
        return (
            <h3>Hello React !</h3>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))