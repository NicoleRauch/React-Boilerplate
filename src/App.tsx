import React, {Component} from "react";
import {connect} from "react-redux";
import {StoreState} from "./types";
import {hot} from "react-hot-loader";


export class AppComponent extends Component<StoreState> {

  render() {

    const {modul1, modul2} = this.props;

    return (
      <div>Hello Boilerplate {modul1} {modul2}</div>
    );
  }
}

export default hot(module)(connect<StoreState, {}, {}, StoreState>((state: StoreState): StoreState => state)(AppComponent));
