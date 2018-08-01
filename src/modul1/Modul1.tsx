import React, {Component} from "react";

interface Modul1Props {
    modul1: boolean
}

export default class Modul1 extends Component<Modul1Props> {

    render () {
        const {modul1} = this.props;

        return <div>{modul1}</div>
    }
}
