import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { sortTitlesAZ, sortTitlesZA } from '../utils/sortTitles';
import style from './TodoContainer.module.css';
import Loading from './Loading';

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
          isCompleted: todo.fields.isCompleted || false,
        };
        return newTodo;
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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

  const addTodo = async (newTodo) => {
    //prerendering todolist before fetching to increase usability
    setTodoList([...todoList, newTodo]);
    toast.success('Item added to the list');
    try {
      const responce = await fetch(defaultUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          'Content-type': 'application/json',
        },
        body: `{"records": [{"fields": {"title":"${newTodo.title}"}}]}`,
      });

      const data = await responce.json();
      const newRecord = data.records[0];
      //The todo list should match the pre-rendered version, so no additional rendering should be applied
      setTodoList([
        ...todoList,
        { id: newRecord.id, title: newRecord.fields.title },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
    toast.success('Item deleted');
    try {
      const responce = await fetch(`${defaultUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          'Content-type': 'application/json',
        },
      });
      // The todo list should match the pre-rendered version, so no additional rendering should be applied
      await responce.json();
      //   const newTodoList = todoList.filter((item) => item.id !== data.id);
      //   setTodoList(newTodoList);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id, isCompleted) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, isCompleted: !item.isCompleted };
        return newItem;
      }
      return item;
    });

    setTodoList(newTodoList);
    try {
      const responce = await fetch(`${defaultUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          fields: { isCompleted: !isCompleted },
        }),
      });

      await responce.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className={style.Section}>
        <ToastContainer position="top-center" />
        <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? (
          <Loading />
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
            <TodoList
              todoList={todoList}
              onRemoveTodo={removeTodo}
              onEditTodo={editTodo}
            />
          </>
        )}
      </section>
    </>
  );
};

export default TodoContainer;
