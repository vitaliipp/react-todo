import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoList.module.css';

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <ul className={style.ListItems}>
      {todoList.map((item) => {
        return (
          <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
};

export default TodoList;
