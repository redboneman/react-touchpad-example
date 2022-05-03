import React from 'react';
import {Component} from 'react';

export class Canvas extends Component<any, any> {
    public render() {
        return (
            <div id={'canvas'}>
                <img src="images/map.jpeg" alt="map" id={'map'}/>
            </div>
        )
    }

    private zoom = 100;

    componentDidMount() {
        const app$ = document.getElementById('app')
        const container$ = document.getElementById('container')
        const canvas$ = document.getElementById('canvas')
        if (container$ && canvas$ && app$) {
            app$.addEventListener('wheel', ev => {
                ev.preventDefault()
                ev.stopPropagation()
                if (ev.ctrlKey) {
                    const newZoomValue = this.zoom + -ev.deltaY
                    if (newZoomValue >= 400) {
                        this.zoom = 400
                    } else if (newZoomValue <= 20) {
                        this.zoom = 20
                    } else {
                        this.zoom = newZoomValue
                    }
                    const xCenter = ev.pageX;
                    const yCenter = ev.pageY;
                    const canvasRectBefore = canvas$.getBoundingClientRect();
                    const xOffsetBefore = (-canvasRectBefore.left + xCenter) / canvasRectBefore.width;
                    const yOffsetBefore = (-canvasRectBefore.top + yCenter) / canvasRectBefore.height;
                    canvas$.style.transform = `scale(${(this.zoom / 100).toFixed(2)})`
                    const canvasRectAfter = canvas$.getBoundingClientRect();
                    container$.style.width = `${canvasRectAfter.width.toFixed(1)}px`;
                    container$.style.height = `${canvasRectAfter.height.toFixed(1)}px`;
                    app$.scrollTo(
                        Number((canvasRectAfter.width * xOffsetBefore - xCenter).toFixed(2)),
                        Number((canvasRectAfter.height * yOffsetBefore - yCenter).toFixed(2))
                    )
                } else {
                    app$.scrollTop += ev.deltaY;
                    app$.scrollLeft += ev.deltaX;
                }
            })
        }
    }
}
