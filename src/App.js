import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [newTodo, setNewTodo] = React.useState('');
  const [todoList, setTodoList] = React.useState([]);
  return (
    <>
      <h1>Todo list</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>{newTodo}</p>
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
