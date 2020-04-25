import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
// COMPONENTS
import Grid from '@material-ui/core/Grid';
import Graph from '../components/Graph';

import colors from '../colors';

const style = {
    root: {
        background: colors.background,
        // display: 'flex',
        // justifyContent: 'space-between',
        height: '100vh',
        padding: '32px 0 0 16px',
        width: 'fit-content',
        minWidth: '100%'
    }
}

class Home extends Component {
    static propTypes = {
        classes: PropTypes.shape().isRequired
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container classes={classes}>
                <Graph />
            </Grid>
        )
    }
}

export default withStyles(style)(Home)