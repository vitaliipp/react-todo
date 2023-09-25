import { useEffect, useRef } from 'react';
import style from './InputWithLabel.module.css';
import PropTypes from 'prop-types';

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

InputWithLabel.propTypes = {
  handleTitleChange: PropTypes.func,
  todoTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
