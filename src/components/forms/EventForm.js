import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class EventForm extends Component {
    static propTypes = {
        position: PropTypes.number.isRequired,
        isOpen: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    }

    state = {
        value: ''
    }

    handleChange = e => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = () => {
        const { handleSubmit, position } = this.props;
        console.log('position', position)
        const { value } = this.state;
        handleSubmit(position, value);
    }

    render() {
        const { isOpen, handleClose } = this.props;
        const { value } = this.state
        return (
            <Dialog open={isOpen} handleClose={handleClose}>
                <DialogTitle>
                    Nouvel Evènement
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label='Nom'
                        placeholder='Ex: Arrivé du démon'
                        fullWidth
                        value={value}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button variant='contained' color='primary' onClick={this.handleSubmit}>Valider</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EventForm
