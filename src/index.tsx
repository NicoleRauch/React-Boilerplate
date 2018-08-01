import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import App from "./App";
import {StoreState} from "./types";
import reducer from "./reducer";


const store = createStore<StoreState>(reducer,
    compose(
        applyMiddleware(
            thunkMiddleware,
            logger
            // more middlewares go here if required
        )
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
  , document.getElementById("start")
);

