import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames'

import Grid from '@material-ui/core/Grid'

import colors from '../colors';

const style = {
    wrapperName: {
        width: '12%'
    },
    name: {
        display: 'inline-block',
        background: colors.line,
        borderRadius: 16,
        padding: 16,
        width: '100%',
        textAlign: 'center'
    },
    begin: {
        flex: 1,
        background: 'white'
    }
}

class CharacterLine extends Component {
    static propTypes = {
        classes: PropTypes.shape().isRequired,
        character: PropTypes.shape().isRequired
    }

    render() {
        const { character, classes } = this.props
        return (
            <Grid container>
                <div className={classes.wrapperName}>
                    <div className={classes.name}>
                        {character.firstName} {character.lastName}
                    </div>
                </div>
                <div className={classNames(character._id + '--line', classes.begin)}>
                </div>
            </Grid>
        )
    }
}

export default withStyles(style)(CharacterLine)
