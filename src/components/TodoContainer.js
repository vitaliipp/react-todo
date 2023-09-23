import { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { sortTitlesAZ, sortTitlesZA } from '../utils/sortTitles';
import style from './TodoContainer.module.css';

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const defaultUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
  const [url, setUrl] = useState(defaultUrl);

  const fetchData = async (airtableUrl) => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    try {
      const response = await fetch(airtableUrl, options);
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

  const handleSort = (event) => {
    if (event.target.value === 'name-a') {
      setTodoList([...todoList.sort(sortTitlesAZ)]);
      return;
    }

    if (event.target.value === 'name-z') {
      setTodoList([...todoList.sort(sortTitlesZA)]);
      return;
    }

    if (event.target.value === 'airtable-order') {
      setUrl(defaultUrl + '?view=Grid%20view');
      return;
    }

    if (event.target.value === 'airtable-az') {
      setUrl(defaultUrl + '?sort[0][field]=title&sort[0][direction]=asc');
      return;
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

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
    <>
      <section className={style.Section}>
        <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={style.SortForm}>
              <label htmlFor="sort">sort by :</label>
              <select
                name="sort"
                id="sort"
                className={style.SortInput}
                onChange={handleSort}
              >
                <option value="select">--choose an option--</option>
                <option value="name-a">title (a - z)</option>
                <option value="name-z">title (z - a)</option>
                <option value="airtable-order">airtable order</option>
                <option value="airtable-az">airtable (a-z)</option>
              </select>
            </div>
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
          </>
        )}
      </section>
    </>
  );
};

export default TodoContainer;
