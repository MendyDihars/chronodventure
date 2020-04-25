import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'

import colors from '../colors';

const style = {
    root: {
        height: 30,
        width: 30,
        borderRadius: 100,
        background: colors.event,
        cursor: 'pointer',
        transition: 'all 0.5s ease',
        '&:hover': {
            height: 50,
            width: 50,
            // marginLeft: '-10px',
            // marginRight: '-20px'
        }
    }
}

class Event extends Component {
    static propTypes = {
        classes: PropTypes.shape().isRequired,
        character: PropTypes.shape().isRequired,
        event: PropTypes.shape().isRequired,
        handleClick: PropTypes.func.isRequired
    }

    onClick = () => {
        const { handleClick, character, event } = this.props;
        handleClick(character, event)
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root} onClick={this.onClick}></div>
        )
    }
}

export default withStyles(style)(Event)
