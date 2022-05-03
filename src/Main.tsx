import React, {Component} from "react";
import {App} from "./App";
import {Canvas} from './components/Canvas';

export interface MainProps {
    app: App;
}

export class Main extends Component<MainProps, {}> {
    constructor(props: MainProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <>
                <div id="container">
                    <Canvas/>
                </div>
            </>
        );
    }
}
