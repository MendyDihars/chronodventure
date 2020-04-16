import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import * as joint from 'jointjs';
import { withStyles } from '@material-ui/styles';

import IosRefresh from 'react-ionicons/lib/IosRefresh';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';


// ACTIONS
import { fetchCharacters } from '../actions/character';
import { fetchEvents } from '../actions/event';
import colors from '../colors';

const style = {
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

    componentDidUpdate = () => {
        const { characters, events, element, evLoading } = this.props;
        const eventView = this.handleHover();

        let baseY = parseInt(element.current.clientHeight * 0.07, 10),
        baseX = 32,
        heightCharacterBox = 70,
        widthCharacterBox = 150;
        if (characters.length > 0) {
            const graph = new joint.dia.Graph;
            const paper = new joint.dia.Paper({
                el: element.current,
                model: graph,
                width: (events.length * 150) + 100,
                height: element.current.clientHeight,
                gridSize: 1,
                interactive: false,
                elementView: eventView
            })
            
            this.createCharacters({
                baseX,
                baseY,
                graph,
                height: heightCharacterBox,
                width: widthCharacterBox
            })

            if (events.length > 0) {
                this.createLines({
                    graph,
                    baseX,
                    baseY,
                    heightCharacterBox,
                    widthCharacterBox
                })
            }
        }

    }

    componentDidMount = () => {
        const { characters, events, dispatch } = this.props
        if (characters.length === 0) {
            dispatch(fetchCharacters());
        }
        if (events.length === 0) {
            dispatch(fetchEvents());
        }
    }

    handleClick = (character, event) => {
        this.setState({
            character: character,
            event: event,
            isOpen: true
        })
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    handleHover = () => {
        const { characters, events } = this.props
        const handleClick = this.handleClick;
        return joint.dia.ElementView.extend({
            events: {
                'click': 'clic'
            },
    
            clic: function(evt, x, y) {
                let model = this.model;
                const { character, event } = model.attributes.attrs.custom;
                let c = characters.find(c => c._id === character);
                let ev = events.find(e => e._id === event)
                handleClick(c, ev)
            }
        });
    }

    createLink(graph, source, target) {
        let link = new joint.shapes.standard.Link();
        link.source(source);
        link.target(target);
        this.redifineLink(link);
        link.addTo(graph)
    }

    redifineLink = link => {
        link.attr({
            line: {
                stroke: colors.line,
                strokeWidth: 5,
                targetMarker: {
                    type: "none"
                }
            },
        });
    }

    redifineCircle = circle => {
        circle.attr({
            body: {
                strokeWidth: 0,
                fill: colors.line
            }
        })
    }

    calculatePositionY = (baseY, height, index) => 
        (((baseY + height) * index) + baseY)

    createLines = options => {
        const { characters, events } = this.props
        const {
            baseX,
            baseY,
            heightCharacterBox,
            widthCharacterBox,
            graph
        } = options;

        characters.forEach((character, index) => {
            // Calculate from the same way that each character box
            let y = this.calculatePositionY(baseY, heightCharacterBox, index);
            // Calculate First X circle position & separation with others
            let x = [(baseX * 2) + widthCharacterBox, widthCharacterBox],
            // Height & Width of little circles
            size = 30,
            // Init dynamic variable
            i = 0, aCircle, bCircle;
            // Align y on center of height
            y = y + parseInt(((heightCharacterBox - size) / 2));
            events.reduce((acc, next) => {
                if (i === 0) {
                    aCircle = new joint.shapes.standard.Circle();
                    aCircle.position(x[0], y);
                    aCircle.resize(30, 30);
                    aCircle.attr({
                        custom: {
                            character: character._id,
                            event: acc._id
                        }
                    })
                    aCircle.addTo(graph)
                    this.redifineCircle(aCircle)
    
                    bCircle = aCircle.clone();
                    bCircle.translate(x[1], 0);
                    bCircle.attr({
                        custom: {
                            character: character._id,
                            event: next._id
                        }
                    })
                    bCircle.addTo(graph)
                    i++;
    
                    this.createLink(graph, aCircle, bCircle)
                    return next;
                } else {
                    if (i % 2 === 0) {
                        aCircle = bCircle.clone();
                        aCircle.translate(x[1], 0);
                        aCircle.attr({
                            custom: {
                                character: character._id,
                                event: next._id
                            }
                        })
                        aCircle.addTo(graph)
    
                        this.createLink(graph, bCircle, aCircle)
                        i++;
                        return next;
                    } else {
                        bCircle = aCircle.clone();
                        bCircle.translate(x[1], 0);
                        bCircle.attr({
                            custom: {
                                character: character._id,
                                event: next._id
                            }
                        })
                        bCircle.addTo(graph)
    
                        this.createLink(graph, aCircle, bCircle)
                        i++;
                        return next;
                    }
                }
            })
        })
    }

    createCharacters = (options) => {
        const { characters } = this.props;
        const { baseX, baseY, height, width, graph } = options;
        
        characters.forEach((character, index) => {
                let rect = new joint.shapes.standard.Rectangle();
                rect.position(baseX, this.calculatePositionY(baseY, height, index))
                rect.resize(width, height);
                rect.attr({
                    body: {
                        fill: colors.line
                    },
                    label: {
                        text: character.firstName + ' ' + character.lastName
                    }
                })
                rect.addTo(graph);
        })
    }

    render() {
        const { evLoading, classes } = this.props;
        const { isOpen, character, event } = this.state;

        let story = {};
        if (Object.keys(character).length > 0 && Object.keys(event).length > 0) {
            story = character.stories.find(s => s.event === event._id)
            console.log('too loong')
        }

        if (evLoading) {
            return (
                <div className={classes.loading}>
                    <div>
                        <IosRefresh fontSize="60px" color={colors.line} rotate />
                    </div>
                </div>
            )
        }
        return (
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
        );
    }
}

const mapStateToProps = state => ({ ...state.Character, ...state.Event })

export default connect(mapStateToProps)(
    withStyles(style)(
        Graph
    )
);
