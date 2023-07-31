const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  return (
    <>
      <label htmlFor="todoTitle">{children}: </label>
      <input
        id="todoTitle"
        type="text"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      ></input>
    </>
  );
};

export default InputWithLabel;
