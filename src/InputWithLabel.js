import { useEffect, useRef } from 'react';
import style from './InputWithLabel.module.css';

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        className={style.FormInput}
        id="todoTitle"
        ref={inputRef}
        type="text"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      ></input>
    </>
  );
};

export default InputWithLabel;
