import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
// COMPONENTS
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Line from '../components/Line';

import colors from '../colors';

// ACTIONS
import { fetchCharacters } from '../actions/character';

const style = {
    root: {
        background: colors.background,
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh',
        padding: '32px 16px 0 16px'
    }
}

class Home extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        characters: PropTypes.shape().isRequired,
        classes: PropTypes.shape().isRequired
    }

    componentDidMount = () => {
        const { characters, dispatch } = this.props
        if (characters.length === 0) {
            dispatch(fetchCharacters());
        }
    }

    render() {
        const { characters, classes } = this.props;
        return (
            <Grid container classes={{container: classes.root}}>
                {
                    characters.map(character => (
                        <Grid item xs={12}>
                            <Line character={character} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
}

const mapStateToProps = state => ({ ...state.Character })

export default connect(mapStateToProps)(
    withStyles(style)(Home)
);
