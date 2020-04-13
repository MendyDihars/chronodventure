import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as joint from 'jointjs';
import colors from '../colors'

class Line extends Component {
    static propTypes = {
        element: PropTypes.any.isRequired
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

    componentDidMount = () => {
        const { element } = this.props
        
        
        let y = element.current.clientHeight / 4;
        let x = [100, 150]
        
        let eventView = this.handleHover();

        const graph = new joint.dia.Graph;
        const paper = new joint.dia.Paper({
            el: element.current,
            model: graph,
            width: element.current.clientWidth - 100,
            height: element.current.clientHeight,
            gridSize: 1,
            interactive: false,
            elementView: eventView
        })

        const circle = new joint.shapes.standard.Circle();
        circle.position(x[0], y);
        circle.resize(30, 30);
        circle.addTo(graph)
        this.redifineCircle(circle)

        const circle2 = circle.clone();
        circle2.translate(x[1], 0);
        circle2.addTo(graph);

        const link = new joint.shapes.standard.Link();
        link.source(circle);
        link.target(circle2);
        this.redifineLink(link);
        link.addTo(graph)
    }

    render() {
        return null;
    }
}

export default Line;