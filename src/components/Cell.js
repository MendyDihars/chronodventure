import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';

const style = {
    root: {
        width: 145,
        height: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

class Cell extends Component {
    static propTypes = {
        children: PropTypes.element,
        classes: PropTypes.shape().isRequired,
    }

    static defaultProps = {
        children: <span></span>
    }

    render() {
        const { classes, children } = this.props
        return (
            <div className={classes.root}>
                {children}
            </div>
        )
    }
}

export default withStyles(style)(Cell)
