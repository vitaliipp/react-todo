import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoList.module.css';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, onRemoveTodo, onEditTodo }) => {
  return (
    <ul className={style.ListItems}>
      {todoList.map((item) => {
        return (
          <TodoListItem
            key={item.id}
            todo={item}
            onRemoveTodo={onRemoveTodo}
            onEditTodo={onEditTodo}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
};

export default TodoList;
