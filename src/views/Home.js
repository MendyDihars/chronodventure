import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCharacters } from '../actions/character';

class Home extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        characters: PropTypes.shape().isRequired
    }

    componentDidMount = () => {
        const { characters, dispatch } = this.props
        if (characters.length === 0) {
            dispatch(fetchCharacters());
        }
    }

    render() {
        const { characters } = this.props;
        return (
            <div>
                <ul>
                    {
                        characters.map(character => (
                            <li>
                                {character.firstName} {character.lastName}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.Character })

export default connect(mapStateToProps)(Home);
