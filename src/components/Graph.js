import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';
import ScrollBooster from 'scrollbooster';

import IosRefresh from 'react-ionicons/lib/IosRefresh';
import Grid from '@material-ui/core/Grid';
import Event from './Event';
import Link from './Link';
import Cell from './Cell';
import Add from './Add';
import Story from './Story';
import EventForm from './forms/EventForm';


// ACTIONS
import { fetchCharacters } from '../actions/character';
import { fetchEvents, addEvent } from '../actions/event';
import colors from '../colors';

const build3DArray = (characters, events) => {
    let arr = [[undefined, ...events]]; // Init headers
    characters.forEach(character => {
        arr.push([character, ...events])
    })
    return arr;
}

const style = {
    blockWrapper: {
        display: 'flex'
    },
    blockCharacter: {
        background: colors.line,
        height: '100%',
        width: '100%',
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    blockEventName: {
        borderRadius: 3,
        padding: 16,
        background: colors.event,
    },
    loading: {
        position: 'absolute',
        zIndex: 10,
        height: '100vh',
        width: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white'
    },
    flexOne: {
        flex: 1
    }
}

class Graph extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        characters: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        evLoading: PropTypes.bool.isRequired,
        element: PropTypes.any.isRequired,
        classes: PropTypes.shape().isRequired,
    }

    state = {
        character: {},
        event: {},
        isStoryOpen: false,
        isEventOpen: false,
        currentPosition: NaN
    }

    constructor(props) {
        super(props);
        this.scrollable = React.createRef();
    }

    componentDidMount = () => {
        const { characters, events, dispatch } = this.props
        if (characters.length === 0) {
            dispatch(fetchCharacters());
        }
        if (events.length === 0) {
            dispatch(fetchEvents());
        }
        // new ScrollBooster({
        //     viewport: this.scrollable.current,
        //     content: this.scrollable.current,
        //     scrollMode: 'native',
        //     direction: 'horizontal',
        //     emulateScroll: true
        // })
    }

    handleStoryOpen = (character, event) => {
        this.setState({ character, event, isStoryOpen: true })
    }

    handleStoryClose = () => {
        this.setState({ isStoryOpen: false })
    }

    handleEventForm = position => {
        this.setState({ isEventOpen: true, currentPosition: position })
    }

    handleEventClose = () => {
        this.setState({ isEventOpen: false, currentPosition: null })
    }

    handleEventSubmit = (position, name) => {
        const { dispatch } = this.props;
        dispatch(addEvent({ position, name }))
        this.handleEventClose()
    }

    render() {
        const { evLoading, classes, characters, events } = this.props;
        const { isStoryOpen, isEventOpen, character, event, currentPosition } = this.state;
        let array3D = build3DArray(characters, events);

        if (evLoading) {
            return (
                <div className={classes.loading}>
                    <div>
                        <IosRefresh fontSize="60px" color={colors.charaLine} rotate />
                    </div>
                </div>
            )
        }
        return (
            <Grid container ref={this.scrollable}>
                {
                    array3D.map((row, index) => {
                        return (
                            <Grid item xs={12} className={classes.blockWrapper}>
                                {
                                    row.map((element, i) => {
                                        // If dead cell
                                        if (i === 0 && index === 0) {
                                            return (
                                                <Cell>
                                                    <Add position={0} handleClick={this.handleEventForm} />
                                                </Cell>
                                            )
                                        // If character cell
                                        } else if (i === 0 && index > 0) {
                                            return (
                                                <>
                                                    <Cell fixed>
                                                        <div className={classes.blockCharacter}>
                                                            {element.firstName} {element.lastName}
                                                        </div>
                                                    </Cell>
                                                    <Cell />
                                                </>
                                            )
                                        // If event cell
                                        } else if (i > 0 && index === 0) {
                                            return (
                                                <>
                                                    <Cell>
                                                        <div className={classes.blockEventName}>
                                                            {element.name}
                                                        </div>
                                                    </Cell>
                                                    <Cell>
                                                        <Add position={element.position + 1} handleClick={this.handleEventForm} />
                                                    </Cell>
                                                </>
                                            )
                                        // If first story and if just one cell
                                        } else if (i === 1 && (row.length - 1) === i) {
                                            return (
                                                <Cell>
                                                    <div className={classes.flexOne}></div>
                                                    <Event handleClick={this.handleStoryOpen} character={row[0]} event={element} />
                                                    <div className={classes.flexOne}></div>
                                                </Cell>
                                            )                                            
                                        // If first story cell
                                        } else if (i === 1) {
                                            return (
                                                <>
                                                    <Cell>
                                                        <div className={classes.flexOne}></div>
                                                        <Event handleClick={this.handleStoryOpen} character={row[0]} event={element} />
                                                        <Link />
                                                    </Cell>
                                                    <Cell>
                                                        <Link />
                                                    </Cell>
                                                    {/* <Cell>
                                                        <Link />
                                                        <Add position={element.position} handleClick={this.handleEventForm} color="line" />
                                                        <Link />
                                                    </Cell> */}
                                                </>
                                            )
                                        // If last story cell
                                        } else if (i === row.length - 1) {
                                            return (
                                                <>
                                                    <Cell>
                                                        <Link />
                                                        <Event handleClick={this.handleStoryOpen} character={row[0]} event={element} />
                                                        {/* <Link /> */}
                                                        <div className={classes.flexOne}></div>
                                                    </Cell>
                                                    {/* <Cell>
                                                        <Link />
                                                        <Add position={element.position} handleClick={this.handleEventForm} color="line" />
                                                        <div className={classes.flexOne}></div>
                                                    </Cell> */}
                                                </>
                                            )
                                        // If story cell
                                        } else {
                                            return (
                                                <>
                                                    <Cell>
                                                        <Link />
                                                        <Event handleClick={this.handleStoryOpen} character={row[0]} event={element} />
                                                        <Link />
                                                    </Cell>
                                                    <Cell>
                                                        <Link />
                                                    </Cell>
                                                    {/* <Cell>
                                                        <Link />
                                                        <Add position={element.position} handleClick={this.handleEventForm} color="line" />
                                                        <Link />
                                                    </Cell> */}
                                                </>
                                            )
                                        }
                                    })
                                }
                            </Grid>
                        )
                    })
                }

                <Story
                    character={character}
                    event={event}
                    handleClose={this.handleStoryClose}
                    isDialogOpen={isStoryOpen}
                />
                <EventForm isOpen={isEventOpen} position={currentPosition} handleClose={this.handleEventClose} handleSubmit={this.handleEventSubmit} />
            </Grid>
        );
    }
}

const mapStateToProps = state => ({ ...state.Character, ...state.Event })

export default connect(mapStateToProps)(
    withStyles(style)(
        Graph
    )
);
