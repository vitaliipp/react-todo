import React from 'react';

const todoList = [
  { id: 1, title: 'Complete assigment' },
  { id: 2, title: 'Play with kids' },
  { id: 3, title: 'Watch TV' },
];

const TodoList = () => {
  return (
    <ul>
      {todoList.map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
};

export default TodoList;
