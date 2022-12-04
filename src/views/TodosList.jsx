import TodoItem from "./TodoItem";
import { useContext } from "react";
import { EthContext } from "../providers";

const TodosList = () => {
  const { todos } = useContext(EthContext);

  return (
    <div className="mt-4">
      <ul className="list-group">
        {todos.map((todo, index) => (
          <TodoItem key={index} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodosList;
