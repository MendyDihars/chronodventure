import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import history from '../../history';

class Home extends Component {
    goToTest = e => {
        history.push('/test');
    }

    render() {
        return (
            <div>
                <Button color="primary" variant="container" onClick={this.goToTest}>
                    Go To Test
                </Button>
            </div>
        )
    }
}

export default Home;
