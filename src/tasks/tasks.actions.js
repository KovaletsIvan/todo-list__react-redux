import {
  fetchTasksList,
  updateTask,
  deleteTask,
  createTask,
} from "./tasksGateway";
import { tasksSelector } from "./tasks.selectors";

export const TASK_LIST_RECIVED = "TASK_LIST_RECIVED";


const taskListRecived = (tasksList) => {
  return {
    type: TASK_LIST_RECIVED,
    payloade: { tasksList },
  };
};

export const changeStatus = (id) => {
  return {
    type: CHANGE_TASK_STATUS,
    payload: { id },
  };
};

export const getTasksList = () => {
  const thunkAction = function (dispatch) {
    fetchTasksList()
      .then((resp) => resp.sort((a, b) => b.id - a.id))
      .then((taskList) => dispatch(taskListRecived(taskList)));
  };
  return thunkAction;
};

export const updateTaskThunk = (taskId) => {
  const thunkAction = function (dispatch, getState) {
    const state = getState();
    const tasksListSelector = tasksSelector(state);
    const task = tasksListSelector.find((task) => task.id === taskId);
    const updatedTasks = {
      ...task,
      done: !task.done,
    };
    updateTask(taskId, updatedTasks).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const deleteTasksThunk = (taskId) => {
  const thunkAction = function (dispatch) {
    deleteTask(taskId).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const creteTasksThunk = (text) => {
  const thunkAction = function (dispatch) {
    const newTask = {
      text,
      done: false,
    };
    createTask(newTask).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};
