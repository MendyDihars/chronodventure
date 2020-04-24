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
        display: 'flex',
        // justifyContent: 'space-between',
        height: '100vh',
        padding: '32px 0 0 16px',
        overflowX: 'scroll',
        flexWrap: 'no-wrap'
    },
    graph: {
        flex: '0 0 auto',
        height: "100%",
        minWidth: "100%",
    }
}

class Home extends Component {
    static propTypes = {
        classes: PropTypes.shape().isRequired
    }

    constructor(props) {
        super(props);
        this.graph = React.createRef();
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container classes={{container: classes.root}}>
                <div className={classes.graph} ref={this.graph}></div>
                <Graph element={this.graph} />
            </Grid>
        )
    }
}

export default withStyles(style)(Home)