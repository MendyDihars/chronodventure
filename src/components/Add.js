import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import classNames from 'classnames';
import colors from '../colors';

const style = {
    root: {
        height: 30,
        width: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        fontSize: 30,
        cursor: 'pointer',
        transition: 'all 0.5s ease',
        '&:hover': {
            height: 50,
            width: 50
        }
    },
    black: {
        background: 'black',
        color: 'white'
    },
    line: {
        background: colors.line,
        color: 'white'
    }
}

class Add extends Component {
    static propTypes = {
        classes: PropTypes.shape().isRequired,
        handleClick: PropTypes.func.isRequired,
        position: PropTypes.number.isRequired,
        color: PropTypes.string
    }

    static defaultProps = {
        color: 'black'
    }

    handleClick = () => {
        const { handleClick, position } = this.props;
        handleClick(position);
    }

    render() {
        const { classes, color } = this.props
        console.log('color', color)
        return (
            <div className={classNames(classes.root, classes[color])} onClick={this.handleClick}>
                +
            </div>
        )
    }
}

export default withStyles(style)(Add)
