import {Action} from "redux";
import createReducer from "../createReducer";


export const MODUL2_INITIAL_STATE: number[] = [1, 2, 3];

export enum Modul2Actions {
    NOCH_EINE_ZAHL = "NOCH_EINE_ZAHL",
}

export interface ZahlZugefuegt extends Action {
    type: Modul2Actions.NOCH_EINE_ZAHL,
    payload: number
}

export function fuegeHinzu(wert: number): ZahlZugefuegt {
    return {
        type: Modul2Actions.NOCH_EINE_ZAHL,
        payload: wert
    }
}

export default createReducer<number[]>(MODUL2_INITIAL_STATE, {
    [Modul2Actions.NOCH_EINE_ZAHL]: (currentState: number[], action: ZahlZugefuegt) => currentState.concat(action.payload),
});
