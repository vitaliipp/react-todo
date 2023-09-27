import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types';

const TodoListItem = ({ todo, onRemoveTodo, onEditTodo }) => {
  return (
    <li className={style.ListItem}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onEditTodo(todo.id, todo.isCompleted)}
      />
      <p
        style={{
          textDecoration: todo.isCompleted && 'line-through',
          color: todo.isCompleted && 'green',
        }}
      >
        {todo.title}
      </p>
      <button
        className={style.RemoveButton}
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
