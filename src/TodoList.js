import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((item) => {
        return <TodoListItem key={item.id} todo={item} />;
      })}
    </ul>
  );
};

export default TodoList;
