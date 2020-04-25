import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

const style = {
    root: {
        width: 145,
        height: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fixed: {
        position: 'fixed',
    }
}

class Cell extends Component {
    static propTypes = {
        children: PropTypes.element,
        classes: PropTypes.shape().isRequired,
        fixed: PropTypes.bool,
    }

    static defaultProps = {
        children: <span></span>,
        fixed: false
    }

    render() {
        const { classes, children, fixed } = this.props
        return (
            <div className={classNames(classes.root, { [classes.fixed]: fixed })}>
                {children}
            </div>
        )
    }
}

export default withStyles(style)(Cell)
