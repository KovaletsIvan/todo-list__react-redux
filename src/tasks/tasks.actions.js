import { fetchTasksList } from "./tasksGateway";

export const TASK_LIST_RECIVED = "TASK_LIST_RECIVED";

const taskListRecived = (tasksList) => {
  const action = {
    type: TASK_LIST_RECIVED,
    payloade: { tasksList },
  };
  return action;
};

export const getTasksList = () => {
  const thunkAction = function (dispatch) {
    fetchTasksList()
      .then((resp) => resp.sort((a, b) => b.id - a.id))
      .then((taskList) => dispatch(taskListRecived(taskList)));
  };
  return thunkAction;
};
