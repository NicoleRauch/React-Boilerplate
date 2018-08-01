import {combineReducers} from "redux";

import {StoreState} from "./types";

import modul1 from "./modul1/modul1Reducer";
import modul2 from "./modul2/modul2Reducer";

export default combineReducers<StoreState>({
    modul1,
    modul2
});
