import React, { useState, useCallback } from 'react';
import Task from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  const addTask = useCallback((event) => {
	event.preventDefault();
	if (!text.trim()) {
		alert("Task title cannot be empty."); 
		return; 
	  }
	const newTask = { id: Date.now(), text, description, completed: false };
	setTasks([...tasks, newTask]);
	setText('');
	setDescription('');
  }, [tasks, text, description]);

  const deleteTask = useCallback((id) => {
	  setTasks(tasks.filter(task => task.id !== id));
	}, [tasks]);
  
	const toggleCompleted = useCallback((id) => {
	  setTasks(tasks.map(task => {
		if (task.id === id) {
		  return { ...task, completed: !task.completed };
		}
		return task;
	  }));
	}, [tasks]);
  
	const updateTask = useCallback((id, newText, newDescription) => {
	  setTasks(tasks.map(task => {
		if (task.id === id) {
		  return { ...task, text: newText, description: newDescription, completed: task.completed };
		}
		return task;
	  }));
	}, [tasks]);

  return (
	<div className="taskList">
		<h1>Todo</h1>
	  <form onSubmit={addTask} className="task-form">
		<input
		  className="task-input"
		  placeholder="Task"
		  value={text}
		  onChange={(e) => setText(e.target.value)}
		  maxLength="75"
		/>
		<textarea
		  className="task-textarea"
		  placeholder="Description"
		  value={description}
		  onChange={(e) => setDescription(e.target.value)}
		  maxLength="250"
		/>
		<button type="submit" className="add-task-btn">Add Task</button>
	  </form>
	  <div className="tasks-container">
		{tasks.map(task => (
		  <Task
			key={task.id}
			task={task}
			deleteTask={deleteTask}
			toggleCompleted={toggleCompleted}
			updateTask={updateTask}
		  />
		))}
	  </div>
	</div>
  );
};

export default TaskList;
