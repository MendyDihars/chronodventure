import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as joint from 'jointjs';
import colors from '../colors'

import { fetchEvents } from '../actions/event';

class Line extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        element: PropTypes.any.isRequired,
        character: PropTypes.shape().isRequired,
        events: PropTypes.arrayOf(PropTypes.shape()).isRequired
    }

    handleHover = () => {
        return joint.dia.ElementView.extend({
            events: {
                'mouseover': 'mouseovercard'
            },
    
            mouseovercard: function(evt, x, y) {
                let model = this.model;
                console.log(model);
            }
        });
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

    createLink(graph, source, target) {
        let link = new joint.shapes.standard.Link();
        link.source(source);
        link.target(target);
        this.redifineLink(link);
        link.addTo(graph)
    }

    componentDidUpdate = () => {
        const { events, element } = this.props

        if (events.length > 0) {
            let y = element.current.clientHeight / 4;
            let x = [100, 150]
            
            let eventView = this.handleHover();
    
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
            
            let i = 0, aCircle, bCircle;
            events.reduce((acc, next) => {
                if (i === 0) {
                    aCircle = new joint.shapes.standard.Circle();
                    aCircle.position(x[0], y);
                    aCircle.resize(30, 30);
                    aCircle.addTo(graph)
                    this.redifineCircle(aCircle)

                    bCircle = aCircle.clone();
                    bCircle.translate(x[1], 0);
                    bCircle.addTo(graph)
                    i++;

                    this.createLink(graph, aCircle, bCircle)
                    return next;
                } else {
                    if (i % 2 === 0) {
                        aCircle = bCircle.clone();
                        aCircle.translate(x[1], 0);
                        aCircle.addTo(graph)

                        this.createLink(graph, bCircle, aCircle)
                        i++;
                        return next;
                    } else {
                        bCircle = aCircle.clone();
                        bCircle.translate(x[1], 0);
                        bCircle.addTo(graph)

                        this.createLink(graph, aCircle, bCircle)
                        i++;
                        return next;
                    }
                }
            })
        }
    }

    componentDidMount = () => {
        const { dispatch, events } = this.props
        
        if (events.length === 0) {
            dispatch(fetchEvents());
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({ ...state.Event })

export default connect(mapStateToProps)(Line);