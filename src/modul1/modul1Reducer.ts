import {Action} from "redux";
import createReducer from "../createReducer";


export const MODUL1_INITIAL_STATE: boolean = false;

export enum Modul1Actions {
    ES_WURDE_GETAN = "ES_WURDE_GETAN",
}

export interface EsWurdeGetan extends Action {
    type: Modul1Actions.ES_WURDE_GETAN,
    payload: boolean
}

export function tuEs(wert: boolean): EsWurdeGetan {
    return {
        type: Modul1Actions.ES_WURDE_GETAN,
        payload: wert
    }
}

export default createReducer<boolean>(MODUL1_INITIAL_STATE, {
    [Modul1Actions.ES_WURDE_GETAN]: (_: boolean, action: EsWurdeGetan) => action.payload,
});
