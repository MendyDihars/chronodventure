import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import colors from '../colors';


const style = {
    root: {
        height: 8,
        flex: 1,
        background: colors.line,
    }
}

class Link extends Component {
    static propTypes = {
        classes: PropTypes.shape().isRequired,
    }

    render() {
        const { classes } = this.props;
        return  (
            <div className={classes.root}></div>
        )
    }
}

export default withStyles(style)(Link)
