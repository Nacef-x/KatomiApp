import { createStore, applyMiddleware } from "redux";

import reducers from "../reducers";
const store = createStore((reducer) => reducer, {}, applyMiddleware());

export default store;
