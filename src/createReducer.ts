import {Reducer} from "redux";

export interface Handlers<S> {
    [actionType: string]: Reducer<S>;
}

export default function createReducer<S>(initialState: S, handlers: Handlers<S>): Reducer<S> {
    return (state = initialState, action = {type: ""}) =>
        handlers.hasOwnProperty(action.type) ?
            handlers[action.type](state, action) :
            state;
}
