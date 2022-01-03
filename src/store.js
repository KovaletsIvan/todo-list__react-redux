import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { tasksReducer } from "./tasks/tasks.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  tasks: tasksReducer,
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
