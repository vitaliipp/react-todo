import React from 'react';
import style from './TodoListItem.module.css';

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <li className={style.ListItem}>
      {todo.title}
      <button
        className={style.RemoveButton}
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
