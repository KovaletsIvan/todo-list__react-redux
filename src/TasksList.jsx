import React from "react";
import Task from "./Task";
import CreateTaskInput from "./CreateTaskInput";
import { createTask, fetchTasksList, updateTask, deleteTask } from "./tasksGateway"




class TasksList extends React.Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks = () => {
    fetchTasksList()
      .then(tasksList => {
        this.setState({
          tasks: tasksList
        })
      })
  }

  onCreate = (text) => {
    const newTask = {
      text,
      done: false,
    };
    createTask(newTask)
      .then(() => this.fetchTasks())
  }
  handleTaskStatusChange = (id) => {
    const { text, done } = this.state.tasks.find(task => task.id === id)
    const updatedTasks = {
      text,
      done: !done
    }
    updateTask(id, updatedTasks)
      .then(() => this.fetchTasks())

  }

  hendleTaskDelete = (id) => {
    deleteTask(id)
      .then(() => this.fetchTasks())
  }
  render() {

    const sortedList =
      this.state.tasks.slice().sort((a, b) => a.done - b.done)
    return (
      <main className="todo-list" >
        <CreateTaskInput onCreate={this.onCreate} />
        <ul className="list">
          {sortedList.map(task =>
            <Task
              onChange={this.handleTaskStatusChange}
              onDelete={this.hendleTaskDelete}
              key={task.id}
              {...task}
            />)}
        </ul>
      </main >
    )
  }

}


export default TasksList