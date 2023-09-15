import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = React.useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle('');
  };

  return (
    <form className={style.FormControl} onSubmit={handleAddTodo}>
      <h2>todo list</h2>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        {/* <span>Title: </span> */}
      </InputWithLabel>
      <button className={style.AddBtn}>Add item</button>
    </form>
  );
};

export default AddTodoForm;
