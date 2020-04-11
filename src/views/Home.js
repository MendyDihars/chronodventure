import React, { Component } from 'react'
import history from '../history';

class Home extends Component {
    state = {
        characters: []
    }

    componentDidMount = () => {
        fetch('/api/characters')
        .then(res => res.json())
        .then(body => {
            this.setState({ characters: body })
        })
    }

    render() {
        const { characters } = this.state;
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

export default Home;
