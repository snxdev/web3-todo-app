import { EthContext } from "../providers";
import { useRef, useContext } from "react";

const TodoInput = () => {
  const todoInput = useRef();
  const { createTodo } = useContext(EthContext);

  const handleClick = () => {
    createTodo(todoInput.current.value);
  };

  return (
    <>
      <div className="mb-2">
        <label htmlFor="inputTask" className="form-label">
          Enter New Task
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTask"
          placeholder="New Todo..."
          ref={todoInput}
        />
      </div>
      <button className="btn btn-secondary" onClick={handleClick}>
        ADD Todo
      </button>
    </>
  );
};

export default TodoInput;
