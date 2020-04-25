import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { updateCharacter } from '../actions/character';

const isEmptyObject = o => Object.keys(o).length <= 0

const style = {
    headers: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttons: {
        display: 'flex'
    },
    marged: {
        marginBottom: 16
    }
}

class Story extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isDialogOpen: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        character: PropTypes.shape().isRequired,
        event: PropTypes.shape().isRequired,
        classes: PropTypes.shape().isRequired,
        handleSubmit: PropTypes.func.isRequired
    }

    state = {
        isOpen: false,
        description: ''
    }

    handleClose = () => {
        const { handleClose } = this.props;
        handleClose();
        this.handleFormClose();
    }
    
    handleFormOpen = desc => () => {
        this.setState({ isOpen: true, description: desc })
    }
    
    handleFormClose = () => {
        this.setState({ isOpen: false, description: '' })
    }

    handleDescription = e => {
        this.setState({ description: e.target.value })
    }

    handleSubmit = story => () => {
        const { character, dispatch } = this.props
        const { description } = this.state
        story.description = description;
        character.stories = [ ...character.stories, story ]
        dispatch(updateCharacter(character));
        this.handleFormClose();
    }

    render() {
        const { isDialogOpen, character, event, classes } = this.props;
        const { isOpen, description } = this.state
        let story = {};
        if (!isEmptyObject(character) && !isEmptyObject(event)) {
            story = character.stories.find(s => s.event === event._id)
        }
        return (
            <Dialog open={isDialogOpen} onClose={this.handleClose} fullWidth>
                {
                    (
                        !isOpen && (
                            <>
                                <DialogTitle>
                                    <div className={classes.headers}>
                                        {character.firstName} {character.lastName}
                                        <Button onClick={this.handleFormOpen(story.description)}>Editer</Button>
                                    </div>
                                </DialogTitle>
                                <DialogContent>
                                    <Typography variant='subtitle1'>
                                        {event.name}
                                    </Typography>
                                    <Typography variant='overline'>
                                        {story.description}
                                    </Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose}>Annuler</Button>
                                </DialogActions>
                            </>
                        )
                    ) || (
                        <>
                            <DialogTitle>
                                <div className={classes.headers}>
                                    {character.firstName} {character.lastName}
                                </div>
                            </DialogTitle>
                            <DialogContent>
                                <Typography variant='subtitle1'>
                                    {event.name}
                                </Typography>
                                <TextField
                                    placeholder='Anecdotes et autre détails...'
                                    label='Description'
                                    onChange={this.handleDescription}
                                    fullWidth
                                    value={description}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleFormClose}>Annuler</Button>
                                <Button variant='contained' color='primary' onClick={this.handleSubmit(story)}>Valider</Button>
                            </DialogActions>
                        </>
                    )
                }
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({ ...state.Character })

export default connect(mapStateToProps)(
    withStyles(style)(Story)
)
