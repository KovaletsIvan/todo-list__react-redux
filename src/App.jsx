import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import TodoList from "./tasks/componets/TodoList";

const App = () => {
  // console.log(store.getState())
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default App;
