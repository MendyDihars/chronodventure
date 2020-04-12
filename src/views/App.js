import React, { Component } from 'react'
import PropTypes from 'prop-types'

class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }

    render() {
        const { children } = this.props
        return (
            <>
                {children}
            </>
        )
    }
}

export default App
