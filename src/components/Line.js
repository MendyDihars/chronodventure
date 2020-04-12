import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';

import colors from '../colors';

const style = {
    card: {
        padding: 24,
        background: colors.line
    }
}

class Line extends Component {
    static propTypes = {
        classes: PropTypes.shape().isRequired,
        character: PropTypes.shape().isRequired
    }

    render() {
        const { character, classes } = this.props
        return (
            <Card classes={{root: classes.card}}>
                {character.firstName} {character.lastName}
            </Card>
        )
    }
}

export default withStyles(style)(Line)
