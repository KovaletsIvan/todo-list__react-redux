import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTasksList,
  updateTaskThunk,
  deleteTasksThunk,
  creteTasksThunk,
} from "../tasks.actions";
import Task from "./Task";
import CreateTaskInput from "./CreateTaskInput";
import { tasksSelector } from "../tasks.selectors";

class TasksList extends React.Component {
  componentDidMount() {
    this.props.getTasksList();
  }

  render() {
    const sortedList = this.props.todoList
      .slice()
      .sort((a, b) => a.done - b.done);
    return (
      <main className="todo-list">
        <CreateTaskInput onCreate={this.props.creteTasksThunk} />
        <ul className="list">
          {sortedList.map((task) => (
            <Task
              onChange={this.props.updateTaskThunk}
              onDelete={this.props.deleteTasksThunk}
              key={task.id}
              {...task}
            />
          ))}
        </ul>
      </main>
    );
  }
}

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()),
  getTasksList: PropTypes.func.isRequired,
  updateTaskThunk: PropTypes.func.isRequired,
  deleteTasksThunk: PropTypes.func.isRequired,
  creteTasksThunk: PropTypes.func.isRequired,
};

const mapDispatch = {
  getTasksList: getTasksList,
  updateTaskThunk: updateTaskThunk,
  deleteTasksThunk: deleteTasksThunk,
  creteTasksThunk: creteTasksThunk,
};
const mapState = (state) => {
  return {
    todoList: tasksSelector(state),
  };
};

export default connect(mapState, mapDispatch)(TasksList);
