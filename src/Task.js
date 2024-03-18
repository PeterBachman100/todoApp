import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, deleteTask, toggleCompleted, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
	if (isEditing) {
	  updateTask(task.id, editedText, editedDescription);
	}
	setIsEditing(!isEditing);
  };

  return (
	<div className={`task ${task.completed ? 'completed' : ''}`}>
	  <div className="task-main">
		<div className="task-content">
		  <input
			id={`task-${task.id}`}
			className="task-checkbox"
			type="checkbox"
			checked={task.completed}
			onChange={() => toggleCompleted(task.id)}
		  />
		  <label htmlFor={`task-${task.id}`} className="checkbox-custom-label">
			{task.completed && <i className="fas fa-check"></i>}
		  </label>

		  {isEditing ? (
			<input
			  type="text"
			  className="task-input-edit"
			  value={editedText}
			  onChange={(e) => setEditedText(e.target.value)}
			  maxLength="100"
			  autoFocus
			/>
		  ) : (
			<p className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</p>
		  )}
		</div>

		<div className="task-actions">
		  <button onClick={handleEdit} className={`action-btn edit ${isEditing ? 'save' : ''}`}>
			{isEditing ? <i className="fas fa-save"></i> : <i className="fas fa-pencil-alt"></i>}
		  </button>
		  <button onClick={() => deleteTask(task.id)} className="action-btn delete">
			<i className="fas fa-trash-alt"></i>
		  </button>
		</div>
	  </div>

	  {isEditing ? (
		<textarea
		  className="task-description-edit"
		  value={editedDescription}
		  onChange={(e) => setEditedDescription(e.target.value)}
		  maxLength="250"
		/>
	  ) : (
		<p className="task-description">{task.description}</p>
	  )}
	</div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;
