import { useContext } from "react";
import { EthContext } from "../providers";

const TodoItem = ({ id, content, completed }) => {
  const { toggleComplete } = useContext(EthContext);

  const handleClick = () => {
    toggleComplete(id);
  };

  return (
    <li className="list-group-item list-group-item-action list-group-item-secondary">
      <input
        className="form-check-input me-2"
        type="checkbox"
        value=""
        aria-label="..."
        onChange={handleClick}
        checked={completed}
      />
      <span className={completed ? "text-decoration-line-through" : ""}>
        {content}
      </span>
    </li>
  );
};

export default TodoItem;
