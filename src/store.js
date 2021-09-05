import { createStore, combineReducers } from "redux";

import countrys from "./reducer/country";

const rootReducer = combineReducers({
  countrys,
});

const store = createStore(rootReducer);

export default store;
