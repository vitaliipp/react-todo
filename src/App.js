import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import style from './App.module.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      const todos = data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
        };
        return newTodo;
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  const removeTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <h1>Todo list</h1> */}
              <section className={style.Section}>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
              </section>
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
