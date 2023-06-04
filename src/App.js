import React from 'react';

const todoList = [
  { id: 1, title: 'Complete assigment' },
  { id: 2, title: 'Play with kids' },
  { id: 3, title: 'Watch TV' },
];

function App() {
  return (
    <>
      <h1>Todo list</h1>
      <ul>
        {todoList.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
