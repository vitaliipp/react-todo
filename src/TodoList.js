import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
  { id: 1, title: 'Complete assigment' },
  { id: 2, title: 'Play with kids' },
  { id: 3, title: 'Watch TV' },
];

const TodoList = () => {
  return (
    <ul>
      {todoList.map((item) => {
        return <TodoListItem key={item.id} todo={item} />;
      })}
    </ul>
  );
};

export default TodoList;
