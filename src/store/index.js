import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cards from "./cards.reducer";

const reducers = combineReducers({
  cards,
});

export default createStore(reducers, applyMiddleware(thunk));
