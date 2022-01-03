import { TASK_LIST_RECIVED } from "./tasks.actions";

const initialState = { tasksList: [] };

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_LIST_RECIVED:
      return { ...state, tasksList: action.payloade.tasksList };
    default:
      return state;
  }
};
