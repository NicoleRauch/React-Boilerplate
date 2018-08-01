import React, {Component} from "react";
import {connect} from "react-redux";
import {hot} from "react-hot-loader";
import {HashRouter as Router, Route} from "react-router-dom";
import qs from "query-string";

import {StoreState} from "./types";
import Modul1 from "./modul1/Modul1";
import Modul2 from "./modul2/Modul2";

export class AppComponent extends Component<StoreState> {

    render() {

        const {modul1, modul2} = this.props;

        return (
            <Router>
                <div>
                    <span>Hello Boilerplate {modul1} {modul2}</span>

                    <Route exact={true} path="/"
                           render={({location: {search}}: { location: { search: string } }) => {
                               const aktuelleSeite = qs.parse(search).page;

                               return aktuelleSeite ? <Modul1 modul1={modul1}/> : <Modul2 modul2={modul2}/>;
                           }}
                    />
                    <Route path="/mypath"
                           render={() => <div>My Path</div>}
                    />
                </div>
            </Router>
        );
    }
}

export default hot(module)(connect<StoreState, {}, {}, StoreState>((state: StoreState): StoreState => state)(AppComponent));
