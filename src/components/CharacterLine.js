import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid'
import Line from './Line';

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
        // background: 'white'
    },
    graph: {
        height: '100%',
        width: '100%'
    }
}


class CharacterLine extends Component {
    constructor(props) {
        super(props);
        this.lineRef = React.createRef();
    } 

    static propTypes = {
        classes: PropTypes.shape().isRequired,
        character: PropTypes.shape().isRequired,
        events: PropTypes.arrayOf(PropTypes.shape()).isRequired
    }

    render() {
        const { character, classes } = this.props;
        return (
            <Grid container>
                <div className={classes.wrapperName}>
                    <div className={classes.name}>
                        {character.firstName} {character.lastName}
                    </div>
                </div>
                <div className={classes.begin}>
                    <div ref={this.lineRef} className={classes.graph}></div>
                    <Line element={this.lineRef} character={character} />
                </div>
            </Grid>
        )
    }
}

export default withStyles(style)(CharacterLine)
