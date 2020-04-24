import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';
import ScrollBooster from 'scrollbooster';

import IosRefresh from 'react-ionicons/lib/IosRefresh';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Event from './Event';
import Link from './Link';


// ACTIONS
import { fetchCharacters } from '../actions/character';
import { fetchEvents } from '../actions/event';
import colors from '../colors';

const isEmptyObject = o => Object.keys(o).length <= 0

const build3DArray = (characters, events) => {
    let arr = [[undefined, ...events]]; // Init headers
    characters.forEach(character => {
        arr.push([character, ...events])
    })
    console.log('arr', arr)
    return arr;
}

const style = {
    blockWrapper: {
        display: 'flex'
    },
    block: {
        width: 160,
        height: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        background: colors.event
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
    paper: {
        padding: 16
    },
    marged: {
        marginBottom: 16
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
        isOpen: false
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
        new ScrollBooster({
            viewport: this.scrollable.current,
            content: this.scrollable.current,
            scrollMode: 'native',
            direction: 'horizontal',
            emulateScroll: true
        })
        console.log('this.scrollable.current', this.scrollable.current)
    }

    handleEvent = (character, event) => {
        this.setState({ character, event, isOpen: true })
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    render() {
        const { evLoading, classes, characters, events } = this.props;
        const { isOpen, character, event } = this.state;
        let array3D = build3DArray(characters, events);
        let story = {};
        if (!isEmptyObject(character) && !isEmptyObject(event)) {
            story = character.stories.find(s => s.event === event._id)
        }

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
                                        if (i === 0 && index === 0) {
                                            return (
                                                <div className={classes.block}></div>
                                            )
                                        } else if (i === 0 && index > 0) {
                                            return (
                                                <div className={classes.block}>
                                                    <div className={classes.blockCharacter}>
                                                        {element.firstName} {element.lastName}
                                                    </div>
                                                </div>
                                            )
                                        } else if (i > 0 && index === 0) {
                                            return (
                                                <div className={classes.block}>
                                                    <div className={classes.blockEventName}>
                                                        {element.name}
                                                    </div>
                                                </div>
                                            )
                                        } else if (i === 1) {
                                            return (
                                                <div className={classes.block}>
                                                    <div className={classes.flexOne}></div>
                                                    <Event handleClick={this.handleEvent} character={row[0]} event={element} />
                                                    <Link />
                                                </div>
                                            )
                                        } else if (i === row.length - 1) {
                                            return (
                                                <div className={classes.block}>
                                                    <Link />
                                                    <Event handleClick={this.handleEvent} character={row[0]} event={element} />
                                                    <div className={classes.flexOne}></div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className={classes.block}>
                                                    <Link />
                                                    <Event handleClick={this.handleEvent} character={row[0]} event={element} />
                                                    <Link />
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </Grid>
                        )
                    })
                }

                {/* POPUP */}
                <Dialog open={isOpen} onClose={this.handleClose}>
                    <Paper elevation={2} classes={{ root: classes.paper }}>
                        <div className={classes.marged}>
                            Character: {character.firstName} {character.lastName}
                        </div>
                        <div className={classes.marged}>
                            Event: {event.name}
                        </div>
                        <div>
                            Description :{story.description}
                        </div>
                    </Paper>
                </Dialog>
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
