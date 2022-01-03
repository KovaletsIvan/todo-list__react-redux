import React from "react";
import { connect } from "react-redux";
import { getTasksList } from "../tasks.actions";
import Task from "./Task";
import CreateTaskInput from "./CreateTaskInput";
import { createTask, updateTask, deleteTask } from "../tasksGateway";
import { tasksSelector } from "../tasks.selectors";

class TasksList extends React.Component {
  componentDidMount() {
    this.props.getTasksList();
  }

  onCreate = (text) => {
    const newTask = {
      text,
      done: false,
    };
    createTask(newTask).then(() => this.props.getTasksList());
  };
  handleTaskStatusChange = (id) => {
    const { text, done } = this.props.todoList.find((task) => task.id === id);
    const updatedTasks = {
      text,
      done: !done,
    };
    updateTask(id, updatedTasks).then(() => this.props.getTasksList());
  };

  hendleTaskDelete = (id) => {
    deleteTask(id).then(() => this.props.getTasksList());
  };
  render() {
    console.log(this.props);
    const sortedList = this.props.todoList
      .slice()
      .sort((a, b) => a.done - b.done);
    return (
      <main className="todo-list">
        <CreateTaskInput onCreate={this.onCreate} />
        <ul className="list">
          {sortedList.map((task) => (
            <Task
              onChange={this.handleTaskStatusChange}
              onDelete={this.hendleTaskDelete}
              key={task.id}
              {...task}
            />
          ))}
        </ul>
      </main>
    );
  }
}

const mapDispatch = {
  getTasksList: getTasksList,
};
const mapState = (state) => {
  return {
    todoList: tasksSelector(state),
  };
};

export default connect(mapState, mapDispatch)(TasksList);
